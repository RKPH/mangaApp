import axios from "axios";
import { useEffect, useState, useRef } from "react";

import "./index.css";
import { Link, useLocation } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { BreadCrumb } from "primereact/breadcrumb";

import RơwOfCard from "../../Components/RowOfCard";

const DangPhatHanh = () => {
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
    setData([]);
    setCurrentPage(page);

    if (scrollRef.current) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
          `https://otruyenapi.com/v1/api/danh-sach/dang-phat-hanh?page=${page}`
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
    window.scrollTo(0, 0);
  }, [page]);
  const items = [
    {
      label: "Đang phát hành",
      template: () => (
        <a className="text-primary lg:text-base text-sm font-semibold text-orange-500 cursor-pointer dark:text-blue-400">
          Đang phát hành
        </a>
      ),
    },
  ];
  const home = { label: "Trang chủ", url: "/" };

  return (
    <div className="w-full  flex flex-col items-center  bg-white dark:bg-[#18191A] py-4 z-0">
      <div className=" bg-[whitesmoke] dark:bg-[#242526] lg:px-10 px-4 py-2">
        <BreadCrumb
          model={items}
          home={home}
          className="px-1  shadow-md  min-w-fit max-w-fit  lg:text-base text-sm dark:text-white rounded-md mb-5"
        />
        <h1 className="text-lg lg:text-xl 3xl:text-2xl font-semibold uppercase text-orange-500 dark:text-blue-400 text-center my-5 mb-10">
          {page === 1
            ? "TRUYỆN ĐANG PHÁT HÀNH"
            : `TRUYỆN ĐANG PHÁT HÀNH-TRANG ${page}`}
        </h1>
        <select
          className=" p-2 border right-0 border-black"
          value={sortingOrder}
          onChange={handleFilterChange}
        >
          <option value="moi-nhat">Mới nhất</option>
          <option value="cu-nhat">Cũ nhất</option>
        </select>
        <RơwOfCard data={sortedData} />
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
              to={`/danh-sach/dang-phat-hanh?page=${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
};

export default DangPhatHanh;
