import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addManga } from "../../Redux/MangaSlice"; // Import the action creator from your slice

import "./index.css";

import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Card } from "primereact/card";
import { BreadCrumb } from "primereact/breadcrumb";

const ResultPage = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [data, setData] = useState([]);
  const domain = "https://otruyenapi.com/uploads/comics/";

  const [type, setType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const query = useQuery();
  let searchQuery = query.get("q"); // 'q' is the query parameter
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const page = Number(query.get("page")) || 1;
  const handlePageChange = (event, page) => {
    setCurrentPage(page);

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setCurrentPage(page);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/tim-kiem?keyword=${searchQuery}&page=${page}`
        );
        setData(response.data.data.items);
        setTotalPages(
          Math.ceil(
            response.data.data.params.pagination.totalItems /
              response.data.data.params.pagination.totalItemsPerPage
          )
        );
        setType(response.data.data.breadCrumb);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [page, searchQuery]);
  const [sortingOrder, setSortingOrder] = useState("moi-nhat");
  const handleFilterChange = (event) => {
    setSortingOrder(event.target.value);
  };

  const sortedData = data.slice().sort((a, b) => {
    // Compare updatedAt timestamps for sorting
    if (sortingOrder === "moi-nhat") {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    } else {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    }
  });
  const items = [{ label: "Danh sách", url: "/danh-sach/the-loai" }];
  const home = { label: "Trang chủ", url: "/" };
  const handleMangaClick = (manga) => {
    dispatch(addManga(manga));
  };

  return (
    <div
      ref={scrollRef}
      className="w-full  flex flex-col items-center  bg-white dark:bg-[#18191A] py-4 z-0"
    >
      <div className="bg-[whitesmoke] dark:bg-[#242526] lg:px-10 px-4 py-2">
        <BreadCrumb
          model={items}
          home={home}
          className="p-2 shadow-md  min-w-fit max-w-fit border lg:text-base text-sm dark:text-white rounded-md mb-5"
        />
        <h2 className="text-lg lg:text-xl font-bold text-orange-500 dark:text-blue-400 uppercase text-left mb-1">
          {`Tìm kiếm truyện với từ khóa: ${searchQuery}`}
        </h2>
        <h5 className=" font-normal text-black dark:text-[whitesmoke] opacity-35 uppercase text-left mb-2">
          {`${data.length} kết quả tìm thấy `}
        </h5>
        <select
          className=" p-2 border right-0 border-black"
          value={sortingOrder}
          onChange={handleFilterChange}
        >
          <option value="moi-nhat">Mới nhất</option>
          <option value="cu-nhat">Cũ nhất</option>
        </select>
        <div className="w-full my-10 grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 lg:gap-5 gap-4">
          {sortedData &&
            sortedData.map((item) => (
              <Card
                key={item.name}
                className="rounded-2xl shadow-md hover:scale-105 border"
                onClick={() => handleMangaClick(item)}
              >
                <Link to={`/truyen-tranh/${item.slug}`}>
                  <img
                    src={`${domain}/${item.thumb_url}`}
                    alt={item.slug}
                    className="h-[200px] lg:h-[250px] w-full rounded-t-2xl"
                  />
                  <div className="p-2">
                    <h5 className="overflow-hidden text-left font-bold overflow-ellipsis whitespace-nowrap dark:text-white">
                      {item.name}
                    </h5>
                    <i
                      className="pi pi-tag p-mr-2"
                      style={{ color: "var(--green-500)" }}
                    />
                    <span
                      className={`font-semibold rounded-lg text-sm px-1 dark:text-white ${
                        !item.score || item.score === 0
                          ? "bg-red-500 text-white"
                          : item.score < 1
                          ? "bg-yellow-500 text-black"
                          : "bg-gradient-to-br from-lime-500 to-green-600 text-white"
                      }`}
                    >
                      score:{" "}
                      {item.score ? parseFloat(item.score).toFixed(2) : "0.0"}
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
        </div>
        <Pagination
          className="flex items-end lg:justify-end justify-center text-white"
          color="primary"
          shape="rounded"
          onChange={handlePageChange}
          page={currentPage}
          count={totalPages}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              className="text-white dark:text-white"
              to={`/result?q=${searchQuery}&page=${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ResultPage;