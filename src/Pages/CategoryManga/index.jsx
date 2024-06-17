import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addManga } from "../../Redux/MangaSlice"; // Import the action creator from your slice

import "./index.css";

import { Link, useLocation, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { BreadCrumb } from "primereact/breadcrumb";

import RowOfCard from "../../Components/RowOfCard";
const CategoryManga = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [data, setData] = useState([]);

  const [type, setType] = useState("");

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
  let { slug } = useParams();

  useEffect(() => {
    setData([]);
    setCurrentPage(page);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/the-loai/${slug}?page=${page}`
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
  }, [page, slug]);
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
  const items = [
    { label: "Danh sách", url: "/danh-sach/the-loai" },
    { label: `${type[0]?.name}`, url: `${type[0]?.slug}` },
    {
      label: `${type[1]?.name}`,
      template: () => (
        <a className="text-primary font-semibold text-orange-500 dark:text-blue-400 cursor-pointer">
          {type[1]?.name}
        </a>
      ),
    },
  ];
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
          className="px-1  shadow-md  min-w-fit max-w-fit  lg:text-base text-sm dark:text-white rounded-md mb-5"
        />
        <div className="w-full flex justify-between items-center">
          <h1 className="lg:text-2xl text-xl uppercase font-bold text-black dark:text-white text-left my-5 mb-10">
            truyện thể loại {type[0]?.name}
          </h1>
          <span className="text-xl font-medium text-black dark:text-white text-left my-5 mb-10">
            Trang {page}
          </span>
        </div>
        <select
          className=" p-2 border right-0 border-black"
          value={sortingOrder}
          onChange={handleFilterChange}
        >
          <option value="moi-nhat">Mới nhất</option>
          <option value="cu-nhat">Cũ nhất</option>
        </select>
        <RowOfCard data={sortedData} handleMangaClick={handleMangaClick} />
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
              to={`/the-loai/${slug}?page=${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
};

export default CategoryManga;
