import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addManga } from "../../Redux/MangaSlice"; // Import the action creator from your slice

import "./index.css";

import { Link, useLocation, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Card } from "primereact/card";
import { BreadCrumb } from "primereact/breadcrumb";
import Skeleton from "@mui/material/Skeleton";

const CategoryManga = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [data, setData] = useState([]);
  const [domain, setDomain] = useState(
    "https://otruyenapi.com/uploads/comics/"
  );
  const [type, setType] = useState("");
  const [isLoading, setIsloading] = useState(true);
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
  let { slug } = useParams();

  useEffect(() => {
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
        setIsloading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log("có bị render lại ko");
  }, [page]);
  const items = [
    { label: "Danh sách", url: "/danh-sach/the-loai" },
    { label: `${type[0]?.name}`, url: `${type[0]?.slug}` },
    { label: `${type[1]?.name}` },
  ];
  const home = { label: "Trang chủ", url: "/" };
  const handleMangaClick = (manga) => {
    dispatch(addManga(manga));
  };

  return (
    <div
      ref={scrollRef}
      className="w-full   bg-white px-2 z-0 lg:px-10"
    >
      <div className=" w-full bg-[whitesmoke]  py-2">
        <BreadCrumb
          model={items}
          home={home}
          className="p-2 shadow-md  min-w-fit max-w-fit border  rounded-md mb-5"
        />
        <h1 className="text-lg lg:text-3xl text-orange-500 uppercase text-center mb-2">
          {page === 1
            ? `TRUYỆN THỂ LOẠI ${slug} `
            : `TRUYỆN THỂ LOẠI ${slug}-TRANG ${page}`}
        </h1>

        <div className="w-full my-10 grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 lg:gap-10 gap-4">
          {data &&
            data.map((item) => (
              <Card
                key={item.name}
                className="rounded-2xl shadow-md hover:scale-105"
                onClick={handleMangaClick}
              >
                <Link api={type[0].name} to={`/truyen-tranh/${item.slug}`}>
                  {isLoading ? (
                    <Skeleton variant="rectangular" className="rounded-t-2xl" width={199} height={200}  />

                  ) : (
                    <img
                      src={`${domain}/${item.thumb_url}`}
                      alt={item.slug}
                      className="h-[200px] lg:h-[250px] w-full rounded-t-2xl"
                    />
                  )}
                  <div className="p-2">
                    <h5 className="overflow-hidden text-left font-bold overflow-ellipsis whitespace-nowrap">
                      {item.name}
                    </h5>
                    <i
                      className="pi pi-tag p-mr-2"
                      style={{ color: "var(--green-500)" }}
                    />
                    <span className="p-text-bold p-text-uppercase">
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
          className="flex items-end justify-end"
          color="primary"
          shape="rounded"
          onChange={handlePageChange}
          page={currentPage}
          count={totalPages}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
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
