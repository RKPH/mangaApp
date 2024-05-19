import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addManga } from "../../Redux/MangaSlice"; // Import the action creator from your slice
import "./index.css";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Card } from "primereact/card";
const HoanThanh = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [data, setData] = useState([]);
  const domain = "https://otruyenapi.com/uploads/comics/";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const query = useQuery();
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
  useEffect(() => {
    setCurrentPage(page);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/danh-sach/hoan-thanh?page=${page}`
        );
        setData(response.data.data.items);
        setTotalPages(
          Math.ceil(
            response.data.data.params.pagination.totalItems /
              response.data.data.params.pagination.totalItemsPerPage
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  const handleMangaClick = (manga) => {
    dispatch(addManga(manga));
  };

  return (
    <div className="w-full  flex flex-col items-center  bg-white dark:bg-[#18191A] py-4 z-0">
      <div className=" bg-[whitesmoke] dark:bg-[#242526] lg:px-10 px-4 py-2">
        <h1 className="text-lg lg:text-3xl  text-orange-500 dark:text-blue-400 text-center my-5 mb-10">
          {page === 1
            ? "TRUYỆN ĐÃ HOÀN THÀNH"
            : `TRUYỆN ĐÃ HOÀN THÀNH-TRANG ${page}`}
        </h1>
        <select
          className=" p-2 border right-0 border-black"
          value={sortingOrder}
          onChange={handleFilterChange}
        >
          <option value="moi-nhat">Mới nhất</option>
          <option value="cu-nhat">Cũ nhất</option>
        </select>
        <div className="w-full my-10 grid s:grid-cols-3 xs:grid-cols-2 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-7">
          {sortedData &&
            sortedData.map((item) => (
              <Card
                key={item.name}
                className="rounded-2xl shadow-md hover:scale-105 border"
                onClick={handleMangaClick}
              >
                <Link to={`/truyen-tranh/${item.slug}`}>
                  <img
                    src={`${domain}/${item.thumb_url}`}
                    alt={item.slug}
                    className="h-[200px] xs:h-[150px] sm:h-[200px] lg:h-[250px] 3xl:h-[250px] w-full rounded-t-2xl"
                  />
                  <div className="p-2">
                    <h5 className="overflow-hidden text-left font-semibold overflow-ellipsis whitespace-nowrap dark:text-white">
                      {item.name}
                    </h5>
                    <i
                      className="pi pi-tag p-mr-2"
                      style={{ color: "var(--green-500)" }}
                    />
                    <span className="font-normal uppercase rounded-lg text-white bg-gradient-to-br from-sky-400 to-blue-700 text-sm px-1 dark:text-white">
                      Chương:{" "}
                      {item.chaptersLatest && item.chaptersLatest[0]
                        ? item.chaptersLatest[0].chapter_name
                        : "Loading..."}
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
        </div>
        <Pagination
          className="flex w-full items-end lg:justify-end justify-center text-white pagination-small "
          color="primary"
          shape="rounded"
          onChange={handlePageChange}
          page={currentPage}
          count={totalPages}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              className="text-white dark:text-white text-xs  "
              to={`/danh-sach/hoan-thanh?page=${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
};

export default HoanThanh;
