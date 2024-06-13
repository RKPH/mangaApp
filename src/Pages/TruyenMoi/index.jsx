import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addManga } from "../../Redux/MangaSlice"; // Import the action creator from your slice
import "./index.css";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Card } from "primereact/card";
import { Skeleton } from "@mui/material";
import { BreadCrumb } from "primereact/breadcrumb";
const TruyenMoi = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [data, setData] = useState([]);
  const [domain, setDomain] = useState(
    "https://otruyenapi.com/uploads/comics/"
  );
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=${page}`
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
      label: "Truyện mới",
      template: () => (
        <a className="lg:text-base text-sm  font-semibold font-mono cursor-pointer text-orange-500 dark:text-blue-400">
          Truyện mới
        </a>
      ),
    },
  ];
  const home = { label: "Trang chủ", url: "/" };
  const handleMangaClick = (manga) => {
    dispatch(addManga(manga));
  };

  return (
    <div className="w-full  flex flex-col items-center  bg-white dark:bg-[#18191A] py-4 z-0">
      <div className=" bg-[whitesmoke] dark:bg-[#242526] lg:px-10 px-4 py-2">
        <BreadCrumb
          model={items}
          home={home}
          className="px-1  shadow-md  min-w-fit max-w-fit  lg:text-base text-sm dark:text-white rounded-md mb-5"
        />
        <div className="w-full flex justify-between">
          <h1 className="lg:text-2xl text-xl  uppercase font-bold   text-black dark:text-white text-left my-5 mb-10">
            TRUYỆN TRANH MỚI 
            
          </h1>
          <span className=" text-xl  font-bold  text-black dark:text-white text-left my-5 mb-10">
            {" "}
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

        {/* row of cards */}
        <div className="w-full my-10 grid grid-cols-2 s:grid-cols-3 xs:grid-cols-2 sm:grid-cols-4  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-5">
          {sortedData.length === 0
            ? Array(24)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="shadow-md rounded hover:scale-105"
                  >
                    <div className="h-[200px] xs:h-[200px] sm:h-[200px] lg:h-[220px] 2xl:h-[220px] 3xl:h-[220px] w-[200px]">
                      <Skeleton
                        variant="rectangular"
                        height="100%"
                        width="100%"
                        animation="wave"
                      />
                    </div>
                    <div className="p-2">
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      <Skeleton variant="text" sx={{ width: "60%" }} />
                    </div>
                  </div>
                ))
            : sortedData.map((item) => (
                <Card
                  key={item.name}
                  className=" lg:hover:scale-105 "
                  onClick={() => handleMangaClick(item)}
                >
                  <Link to={`/truyen-tranh/${item.slug}`}>
                    <img
                      src={`${domain}/${item.thumb_url}`}
                      alt={item.slug}
                      className="h-[200px] xs:h-[200px] sm:h-[200px] lg:h-[220px] 2xl:h-[220px] 3xl:h-[220px] w-full rounded-md"
                    />
                    <div className="py-2">
                      <h5 className="overflow-hidden text-left lg:text-base text-sm font-bold overflow-ellipsis whitespace-nowrap dark:text-white">
                        {item.name}
                      </h5>
                      <i
                        className="pi pi-tag p-mr-2"
                        style={{ color: "var(--green-500)" }}
                      />
                      <span className="font-normal uppercase lg:text-sm text-xs rounded-lg text-white bg-gradient-to-br from-sky-400 to-blue-700 px-1 dark:text-white">
                        Chương:{" "}
                        {item.chaptersLatest && item.chaptersLatest[0]
                          ? item.chaptersLatest[0].chapter_name
                          : "???"}
                      </span>
                    </div>
                  </Link>
                </Card>
              ))}
        </div>
        <Pagination
          className="flex items-center justify-center text-white"
          color="primary"
          shape="rounded"
          onChange={handlePageChange}
          page={currentPage}
          count={totalPages}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              className="text-white dark:text-white "
              to={`/danh-sach/truyen-moi?page=${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
};

export default TruyenMoi;
