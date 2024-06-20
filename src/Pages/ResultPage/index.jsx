import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addManga } from "../../Redux/MangaSlice";
import "./index.css";
import { useLocation } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import RowOfCard from "../../Components/RowOfCard";
import Filter from "../../Components/fiter";
// import NotFound from "../../Components/NotFound"; // Import the 404 error component

const ResultPage = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";
  const initialSortingOrder = queryParams.get("sorting") || "moi-nhat";
  const initialStatusFilter = queryParams.get("status") || "";

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortingOrder, setSortingOrder] = useState(initialSortingOrder);
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleMangaClick = (manga) => {
    dispatch(addManga(manga));
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, sortingOrder, statusFilter]); // Fetch data whenever searchQuery, sortingOrder, or statusFilter changes

  useEffect(() => {
    // Update URL query string when sortingOrder or statusFilter changes
    const newParams = new URLSearchParams();
    if (sortingOrder !== "moi-nhat") {
      newParams.set("sorting", sortingOrder);
    }
    if (statusFilter) {
      newParams.set("status", statusFilter);
    }
    newParams.set("q", searchQuery);

    // Replace the current location with the updated search params
    // This effectively updates the URL without causing a full page reload
    window.history.replaceState(null, "", `?${newParams.toString()}`);

    // Scroll to the top when filters change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [sortingOrder, statusFilter, searchQuery]);

  const fetchData = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      let currentPage = 1;
      let totalPages = 1;
      let allData = [];

      // Clear data state before fetching new data
      setData([]);

      // Fetch all pages of data
      while (currentPage <= totalPages) {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/tim-kiem?keyword=${searchQuery}&page=${currentPage}`
        );

        const newData = response.data.data.items;
        totalPages = Math.ceil(
          response.data.data.params.pagination.totalItems /
            response.data.data.params.pagination.totalItemsPerPage
        );
        allData = [...allData, ...newData];
        currentPage++;
      }

      setData(allData);
      filterData(allData);
      setIsLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set loading state to false if there's an error
    }
  };

  const filterData = (dataToFilter) => {
    // Apply status filter
    if (statusFilter === "") {
      setFilteredData(dataToFilter);
    } else {
      const filtered = dataToFilter.filter((manga) =>
        statusFilter === "hoan-thanh"
          ? manga.status === "completed"
          : manga.status === "ongoing"
      );
      setFilteredData(filtered);
    }
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;

    if (value === "moi-nhat" || value === "cu-nhat") {
      setSortingOrder(value);
    } else {
      setSortingOrder("moi-nhat"); // Reset sorting order when switching status filter
      setStatusFilter(value);
    }

    // Clear filteredData immediately when filter changes
    setFilteredData([]);
  };

  const sortedData = filteredData.slice().sort((a, b) => {
    // Compare updatedAt timestamps for sorting
    if (sortingOrder === "moi-nhat") {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    } else {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    }
  });

  const items = [{ label: "Danh sách", url: "/danh-sach/the-loai" }];
  const home = { label: "Trang chủ", url: "/" };

  return (
    <div
      ref={scrollRef}
      className="w-full flex flex-col items-center bg-white dark:bg-[#18191A] py-4 z-0"
    >
      <div className="bg-[whitesmoke] dark:bg-[#242526] lg:px-10 px-4 py-2 w-full min-h-screen">
        <BreadCrumb
          model={items}
          home={home}
          className="px-1 shadow-md min-w-fit max-w-fit lg:text-base text-sm dark:text-white rounded-md mb-5"
        />
        <h2 className="text-lg lg:text-xl 3xl:text-2xl font-semibold uppercase text-orange-500 dark:text-blue-400 text-center my-5 mb-10">
          {`Tìm kiếm truyện với từ khóa: ${searchQuery}`}
        </h2>
        <span className="p-4 font-normal text-black dark:text-[whitesmoke] opacity-35 uppercase text-left my-5 ">
          {`${filteredData.length} kết quả tìm thấy `}
        </span>
        <Filter
          className="my-5"
          sortingOrder={sortingOrder}
          handleFilterChange={handleFilterChange}
          statusFilter={statusFilter}
        />
        {isLoading ? (
          <p className="text-center mt-5">Loading...</p>
        ) : filteredData.length === 0 ? (
          <div className="flex items-center justify-center w-full md:h-[600px] h-96">
            <span className="md:text-4xl text-2xl font-bold font-sansII dark:text-white text-black">
              Not found
            </span>
          </div>
        ) : (
          <RowOfCard data={sortedData} onClick={handleMangaClick} />
        )}
      </div>
    </div>
  );
};

export default ResultPage;
