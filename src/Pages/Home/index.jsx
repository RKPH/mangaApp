import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { Disclosure } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { deleteManga, saveMangas } from "../../Redux/MangaSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";

import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import { Skeleton } from "@mui/material";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //fecth for histroy read
  const [data2, setData2] = useState(
    JSON.parse(localStorage.getItem("readMangas")) || []
  );
  const [Image, setImage] = useState("");
  useEffect(() => {
    setData2(JSON.parse(localStorage.getItem("readMangas")) || []);
  }, []);
  const domain = "https://otruyenapi.com/uploads/comics/";

  const [data, setData] = useState([]);
  const [dataPhatHanh, setDataPhatHanh] = useState([]);
  const FetchDangPhatHanb = async () => {
    try {
      const response = await axios.get(
        `https://otruyenapi.com/v1/api/danh-sach/sap-ra-mat`
      );
      setDataPhatHanh(response.data.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://otruyenapi.com/v1/api/home");
        setData(response.data.data.items);
        setImage(
          `https://img.otruyenapi.com//uploads/comics/${response?.data?.data?.items[0]?.thumb_url}`
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    FetchDangPhatHanb();
  }, []);
  //GET RANDOM SLUG
  const handleRandomSlug = async () => {
    try {
      const response = await axios.get(
        "https://otruyenapi.com/v1/api/the-loai"
      );
      const items = response.data.data.items;
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomSlug = items[randomIndex].slug;
      return randomSlug;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataRandom = async (slugRandom) => {
    try {
      // Fetch data from the first page
      const firstPageResponse = await axios.get(
        `https://otruyenapi.com/v1/api/the-loai/${slugRandom}?page=1`
      );

      // Get the total number of pages
      const totalPages =
        firstPageResponse.data.data.params.pagination.totalItems /
        firstPageResponse.data.data.params.pagination.totalItemsPerPage;

      // Choose a random page
      const randomPage = Math.floor(Math.random() * totalPages) + 1;

      // Fetch data from the random page
      const randomPageResponse = await axios.get(
        `https://otruyenapi.com/v1/api/the-loai/${slugRandom}?page=${randomPage}`
      );

      // Get the items from the random page
      const items = randomPageResponse.data.data.items;

      // Choose a random item
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomManga = items[randomIndex];

      return randomManga.slug;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const carouselItemTemplate = (item) => {
    return (
      <div className=" flex items-center justify-center  dark:bg-[#18191A]  rounded-3xl lg:h-[550px] h-[350px] z-0 relative">
        <img
          className="h-full w-full rounded-3xl shadow-md "
          src={`https://img.otruyenapi.com//uploads/comics/${item?.thumb_url}`}
        />
        <div className="absolute  w-5/6 h-full p-2 bg-[#18191a5e]">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl shadow-lg   relative lg:top-28">
            <div className="col-span-12  md:col-span-4 lg:col-span-4 xl:col-span-3 3xl:col-span-3 md:flex hidden justify-center items-center">
              <img
                src={`https://img.otruyenapi.com//uploads/comics/${item?.thumb_url}`}
                className="rounded-xl w-full border bg-cover"
              />
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 3xl:col-span-9 flex flex-col gap-y-2">
              <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                <h1 className=" md:text-left text-2xl text-center  dark:text-blue-600 text-orange-600 uppercase font-bold">
                  {item?.name ?? "Undefined"}
                </h1>
              </span>
              <span className="font-normal  text-base w-fit rounded-lg text-black bg-gradient-to-br from-sky-400 to-blue-700 px-2 dark:text-white">
                Chapter:{" "}
                {item.chaptersLatest && item.chaptersLatest[0]
                  ? item.chaptersLatest[0].chapter_name
                  : "Loading..."}{" "}
              </span>
              <div className="w-full h-px my-2 bg-gradient-to-l from-slate-200 via-ophim-border to-yellow-200"></div>
              <div>
                <span className="font-semibold text-lg dark:text-blue-600 text-orange-600  ">
                  Trạng thái:
                </span>
                <span className="px-2 dark:text-white text-black font-medium  text-base">
                  {item?.status ?? "Undefined"}
                </span>
              </div>
              <div>
                <span className="font-semibold  text-lg  dark:text-blue-600 text-orange-600  mr-1">
                  Tác giả:{" "}
                </span>
                <span className="text-black  text-base font-medium  dark:text-white mr-1">
                  {item?.author ?? "Undefined"}
                </span>
              </div>
              <div className="lg:flex lg:flex-row">
                <h5 className="font-semibold   text-lg dark:text-blue-600 text-orange-600  mr-2">
                  Thể loại:{" "}
                </h5>

                <div className="gap-1 flex flex-wrap mt-1">
                  {item?.category?.map((item) => (
                    <Link
                      to={`/the-loai/${item.slug}`}
                      key={item.slug}
                      className="px-2  dark:text-white text-black font-medium  text-base   bg-blue-500 hover:grayscale cursor-pointer whitespace-nowrap rounded-md"
                    >
                      {item.name}
                    </Link>
                  )) ?? "Undefined"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-white dark:bg-[#18191A] py-4 z-0 font-[helvetica]">
      <div className=" w-full min-h-screen py-2 bg-[whitesmoke] dark:bg-[#242526] px-4 ">
        <div className="w-full flex flex-row items-center justify-between mb-10">
          <Carousel
            className="dark:text-white lg:w-3/4 w-full  flex  items-center z-0 relative"
            itemTemplate={carouselItemTemplate}
            numVisible={1}
            numScroll={1}
            value={data && data.slice(0, 5)}
            showIndicators={true}
            indicatorsContentClassName="dark:text-white bottom-0 absolute gap-1 rounded-3xl z-10 w-52 flex justify-center items-center bg-black bg-opacity-50 p-2"
            circular={true}
            autoplayInterval={3000}
          />

          <div className="w-1/2 lg:flex flex-col hidden gap-y-4 mx-5 justify-center">
            <div className="h-fit w-full flex-col shadow-xl  p-4 rounded-3xl lg:flex hidden dark:bg-[#2a2a2b] bg-[#f0ecec]">
              <h2 className="font-[helvetica] text-xl font-semibold text-orange-500 dark:dark:text-blue-400 text-left ">
                Hôm nay nên đọc gì
              </h2>
              <div className="flex flex-wrap overflow-ellipsis whitespace-normal  w-fit font-[helvetica] dark:text-white ">
                Bạn vẫn chưa biết nên xem gì ? Hãy để chúng tôi chọn giúp bạn
              </div>
              <button
                onClick={async () => {
                  const randomSlug = await handleRandomSlug();
                  const randomManga = await fetchDataRandom(randomSlug);
                  navigate(`/truyen-tranh/${randomManga}`);
                }}
                className="p-2 w-fit my-1 bg-red-500 rounded-md dark:text-white hover:opacity-70 flex items-center"
              >
                <ArrowRightTwoToneIcon /> Xem manga ngẫu nhiên
              </button>
            </div>
            <div className="  shadow-xl  rounded-3xl h-[400px] overflow-auto dark:bg-[#2a2a2b] bg-[#f0ecec]">
              <h2 className="text-xl font-[helvetica] font-semibold sticky top-0 text-orange-500 dark:text-blue-400 text-center z-10 dark:bg-[#2a2a2b] bg-[#f0ecec] p-2">
                Lịch sử đọc của bạn
              </h2>
              <div className="w-full p-4">
                {data2 &&
                  data2.map((item, index) => (
                    <Link
                      to={`/truyen-tranh/${item.slug}`}
                      key={item._id}
                      className="w-full h-[100px] p-1 dark:bg-[#242526] bg-[whitesmoke] shadow-lg  rounded-md cursor-pointer grid grid-cols-12  items-center hover:scale-105 transition duration-300 my-3 z-10"
                    >
                      <div className="col-span-10 lg:col-span-8 gap-4 ml-1 flex">
                        <img
                          className="w-[70px] h-[80px] rounded-md shadow-md"
                          src={`${domain}/${item.thumb_url}`}
                          loading="lazy"
                          alt={item.slug}
                        />
                        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                          <h4 className="text-xl text-black dark:text-white font-normal">
                            {item.name}
                          </h4>
                          <h5 className="text-lg text-gray-500 font-normal">
                            {item.origin_name}
                          </h5>
                          <h6 className="block lg:hidden">
                            <span className="font-normal uppercase lg:text-sm text-xs rounded-lg text-black bg-gradient-to-br from-sky-400 to-blue-700 px-1 dark:text-white">
                              Chapter:{" "}
                              {item.chaptersLatest && item.chaptersLatest[0]
                                ? item.chaptersLatest[0].chapter_name
                                : "Loading..."}{" "}
                            </span>
                          </h6>
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent navigation

                          dispatch(deleteManga(item));
                          dispatch(saveMangas());
                          const updatedMangas = data2.filter(
                            (manga) => manga._id !== item._id
                          );
                          setData2(updatedMangas);
                        }}
                        className="col-span-2 lg:col-span-4 items-start justify-end  flex h-full w-full px-3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 text-black dark:text-white dark:hover:text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {data2 && data2.length > 0 && (
          <div className="mt-5 mb-10 w-full lg:hidden block">
            <h2 className=" lg:text-xl text-lg uppercase font-bold  text-orange-500 dark:dark:text-blue-400 text-left my-5">
              Nội dung bạn đã đọc
            </h2>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg  bg-[whitesmoke] px-4 py-2 text-left text-sm font-medium text-black hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <span>Danh sách tiếp tục xem ({data2.length})</span>
                    <KeyboardArrowDownIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-black`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-2 pb-2 pt-4 text-sm text-gray-500 max-h-[500px] overflow-y-auto">
                    {data2.map((item, index) => (
                      <Link
                        to={`/truyen-tranh/${item.slug}`}
                        key={item._id}
                        className="w-full h-[100px] p-1 bg-[whitesmoke] border-2  rounded-md cursor-pointer grid grid-cols-12  mb-4 items-center hover:shadow-xl hover:bg-slate-300 transition duration-300"
                      >
                        <div className="col-span-10 lg:col-span-8  gap-4 ml-1 flex ">
                          <img
                            className="w-[70px] h-[80px] rounded-md shadow-md"
                            src={`${domain}/${item.thumb_url} `}
                            loading="lazy"
                            alt={item.slug}
                          />
                          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                            <h4 className="text-lg lg:text-xl text-black font-semibold">
                              {item.name}
                            </h4>
                            <h5 className="text-sm lg:text-lg text-gray-500 font-normal">
                              {item.origin_name}
                            </h5>
                            <h6 className="block lg:hidden">
                              <span className="font-normal uppercase lg:text-sm text-xs rounded-lg text-white bg-gradient-to-br from-sky-400 to-blue-700  px-1 dark:text-white">
                                {" "}
                                Chapter:{" "}
                                {item.chaptersLatest && item.chaptersLatest[0]
                                  ? item.chaptersLatest[0].chapter_name
                                  : "Loading..."}{" "}
                              </span>
                            </h6>
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.preventDefault(); // Prevent navigation

                            dispatch(deleteManga(item));
                            dispatch(saveMangas());
                            const updatedMangas = data2.filter(
                              (manga) => manga._id !== item._id
                            );
                            setData2(updatedMangas);
                          }}
                          className="col-span-2 lg:col-span-4 items-start justify-end flex  h-full w-full px-3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6 text-black hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        )}

        <div className="p-1 my-2 dark:text-white text-black">
          <div className="flex flex-row justify-between items-center">
            <h2 className="lg:text-xl text-lg font-[helvetica]  uppercase font-bold ">
              Truyện mới cập nhật
            </h2>
            <Link
              to="/danh-sach/truyen-moi"
              className="rounded-md border p-2 dark:text-white text-black dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Xem thêm
            </Link>
          </div>
          <div className="w-full my-10 grid grid-cols-2 s:grid-cols-3 xs:grid-cols-2 sm:grid-cols-4  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-5">
            {data.length === 0
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
              : data.map((item) => (
                  <Card
                    key={item.name}
                    className=" lg:hover:scale-110 transition duration-300  "
                  >
                    <Link to={`/truyen-tranh/${item.slug}`}>
                      <img
                        src={`${domain}/${item.thumb_url}`}
                        alt={item.slug}
                        className="h-[200px] xs:h-[200px] sm:h-[200px] lg:h-[220px] 2xl:h-[220px] 3xl:h-[220px] w-full rounded-md"
                      />
                      <div className="py-2">
                        <h5 className="overflow-hidden text-left  text-lg  font-normal overflow-ellipsis whitespace-nowrap dark:text-white">
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
        </div>
        <div className="p-1 my-2 dark:text-white text-black">
          <div className="flex flex-row justify-between items-center">
            <h2 className="lg:text-xl text-lg font-[helvetica]  uppercase font-bold ">
              Truyện sắp ra mắt
            </h2>
            <Link
              to="/danh-sach/truyen-moi"
              className="rounded-md border p-2 dark:text-white text-black dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Xem thêm
            </Link>
          </div>
          <div className="w-full my-10 grid grid-cols-2 s:grid-cols-3 xs:grid-cols-2 sm:grid-cols-4  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-5">
            {dataPhatHanh.length === 0
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
              : dataPhatHanh.map((item) => (
                  <Card
                    key={item.name}
                    className=" lg:hover:scale-110 transition duration-300  "
                  >
                    <Link to={`/truyen-tranh/${item.slug}`}>
                      <img
                        src={`${domain}/${item.thumb_url}`}
                        alt={item.slug}
                        className="h-[200px] xs:h-[200px] sm:h-[200px] lg:h-[220px] 2xl:h-[220px] 3xl:h-[220px] w-full rounded-md"
                      />
                      <div className="py-2">
                        <h5 className="overflow-hidden text-left  text-lg  font-normal overflow-ellipsis whitespace-nowrap dark:text-white">
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
        </div>
        <div className=" m-5 min-h-fit w-fit flex flex-col border-black dark:border-white border p-2 rounded-md lg:hidden  ">
          <h2 className="font-[helvetica] text-base lg:text-2xl font-semibold text-orange-500 dark:dark:text-blue-400 text-left my-5">
            Hôm nay nên đọc gì
          </h2>
          <div className="flex flex-wrap overflow-ellipsis whitespace-normal p-1 w-fit font-[helvetica] dark:text-white hover:opacity-70">
            Bạn vẫn chưa biết nên xem gì ? Hãy để chúng tôi chọn giúp bạn
          </div>
          <button
            onClick={async () => {
              const randomSlug = await handleRandomSlug();
              const randomManga = await fetchDataRandom(randomSlug);
              navigate(`/truyen-tranh/${randomManga}`);
            }}
            className="px-2 py-4 w-fit my-1 bg-red-500 rounded-md dark:text-white hover:opacity-70 flex items-center"
          >
            <ArrowRightTwoToneIcon /> Xem manga ngẫu nhiên
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
