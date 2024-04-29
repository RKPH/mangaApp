import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addManga } from "../../Redux/MangaSlice"; // Import the action creator from your slice
import "./index.css";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Card } from "primereact/card";
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
    setCurrentPage(page);

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [sortingOrder, setSortingOrder] = useState("moi-nhat");
  const [alphabeticalOrder, setAlphabeticalOrder] = useState("A-Z");
  const handleFilterChange = (event) => {
    const value = event.target.value;
    if (value === "moi-nhat" || value === "cu-nhat") {
      setSortingOrder(value);
    } else if (value === "A-Z") {
      setAlphabeticalOrder("A-Z");
    } else if (value === "Z-A") {
      setAlphabeticalOrder("Z-A");
    }
  };

  const sortedData = data.slice().sort((a, b) => {
    if (sortingOrder === "moi-nhat") {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    } else if (sortingOrder === "cu-nhat") {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    } else if (alphabeticalOrder === "A-Z") {
      return a.name.localeCompare(b.name);
    } else if (alphabeticalOrder === "Z-A") {
      return b.name.localeCompare(a.name);
    }
    // Default sorting
    return a.name.localeCompare(b.name);
  });

  useEffect(() => {
    setCurrentPage(page);

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
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  const handleMangaClick = (manga) => {
    dispatch(addManga(manga));
  };

  return (
    <div className="w-full  flex flex-col items-center  bg-white dark:bg-[#18191A] py-4 z-0">
      <div className=" bg-[whitesmoke] dark:bg-[#242526] lg:px-4 px-2 py-2">
        <h1 className="text-lg lg:text-3xl font-bold text-orange-500 text-center my-5 mb-10">
          {page === 1
            ? "TRUYỆN TRANH MỚI CẬP NHẬT MỖI NGÀY"
            : `TRUYỆN TRANH MỚI-TRANG ${page}`}
        </h1>
        <div className="w-full bg-white flex items-center rounded-md p-4 gap-2 ">
          <select
            className="mb-4 p-2 border right-0 border-black"
            value={sortingOrder}
            onChange={handleFilterChange}
          >
            <option value="moi-nhat">Mới nhất</option>
            <option value="cu-nhat">Cũ nhất</option>
          </select>
          <select
            className="mb-4 p-2 border right-0 border-black"
            value={alphabeticalOrder}
            onChange={handleFilterChange}
          >
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>

        {/* row of cards */}
        <div className="w-full my-10 grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 lg:gap-12 gap-4">
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
                    <span className="text-black dark:text-white">
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
          className="flex items-end lg:justify-end justify-center"
          color="primary"
          shape="rounded"
          onChange={handlePageChange}
          page={currentPage}
          count={totalPages}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
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
