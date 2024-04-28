import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";
import { Disclosure } from "@headlessui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "primereact/card";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ArrowRight } from "@mui/icons-material";
const Home = () => {
  const scrollRef = useRef(null);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState(
    JSON.parse(localStorage.getItem("readMangas")) || []
  );
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const [domain, setDomain] = useState(
    "https://otruyenapi.com/uploads/comics/"
  );

  //fecth for histroy read
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=1`
        );
        setData(response.data.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatUpdatedAt = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "40px",
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "35px",

          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        },
      },
    ],
  };

  return (
    <div ref={scrollRef} className="w-full flex flex-col items-center overflow-x-hidden bg-white px-2  z-0 lg:px-10">
      <div  className=" w-full py-2 bg-[whitesmoke] px-6">
        <h1  className="text-lg lg:text-3xl font-bold text-orange-500 text-center mb-5">
          TRANG CHỦ
        </h1>
        {data2 && data2.length > 0 && (
          <>
            <h2 className="font-[helvetica] text-lg lg:text-2xl font-semibold text-orange-500 text-left mb-5">
              Nội dung bạn đã đọc
            </h2>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[whitesmoke] px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <span>Danh sách tiếp tục xem ({data2.length})</span>
                    <KeyboardArrowDownIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-2 pb-2 pt-4 text-sm text-gray-500 max-h-[500px] overflow-y-auto">
                    {data2.map((item) => (
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
                              <span className="rounded-lg text-white bg-gradient-to-br from-sky-400 to-blue-700 text-sm px-1">
                                {" "}
                                Chapter:{" "}
                                {item.chaptersLatest && item.chaptersLatest[0]
                                  ? item.chaptersLatest[0].chapter_name
                                  : "Loading..."}{" "}
                              </span>
                            </h6>
                          </span>
                        </div>
                        <span className="col-span-2  rounded-2xl text-right lg:block hidden">
                          <span className="text-white bg-blue-200 p-2 rounded-lg w-40 bg-gradient-to-tr from-sky-500 to-indigo-500">
                            Chapter:{" "}
                            {item.chaptersLatest && item.chaptersLatest[0]
                              ? item.chaptersLatest[0].chapter_name
                              : "Loading..."}
                          </span>
                        </span>
                        <span className="col-span-2 lg:block hidden text-base font-mono text-center  false">
                          {formatUpdatedAt(item.updatedAt)}
                        </span>
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </>
        )}
        <div className="w-full  my-10">
          <h2 className="font-[helvetica] text-lg lg:text-2xl font-semibold text-orange-500 text-left mb-5">
            Comic
            <ArrowRight className="text-lg lg:text-2xl font-semibold text-orange-500 text-left ml-0" />
          </h2>
          <Slider {...settings}>
            {data.map((item) => (
              <Card
                key={item.name}
                className="w-[100px]  h-[400px] m-1 rounded-2xl shadow-md"
              >
                <img
                  src={`${domain}/${item.thumb_url}`}
                  alt={item.slug}
                  className="h-[300px] w-full rounded-t-2xl"
                />
                <div className="px-2">
                  <h5 className="overflow-hidden text-left font-bold overflow-ellipsis whitespace-nowrap ">
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
              </Card>
            ))}
          </Slider>
        </div>
        <div className="w-full my-10">
          <h2 className="text-lg lg:text-2xl font-[helvetica] font-semibold text-orange-500 text-left mb-5 ">
            Action
          </h2>
          <Slider {...settings}>
            {data.map((item) => (
              <Card
                key={item.name}
                className="w-[100px]  h-[400px] m-1 rounded-2xl shadow-md"
              >
                <img
                  src={`${domain}/${item.thumb_url}`}
                  alt={item.slug}
                  className="h-[300px] w-full rounded-2xl"
                />
                <div className="px-2">
                  <h5 className="overflow-hidden text-left font-bold overflow-ellipsis whitespace-nowrap ">
                    {item.name}
                  </h5>
                  <i
                    className="pi pi-tag p-mr-2"
                    style={{ color: "var(--green-500)" }}
                  />
                  <span className="font-bold uppercase rounded-lg text-white bg-gradient-to-br from-sky-400 to-blue-700 text-sm px-1">
                    Chương:{" "}
                    {item.chaptersLatest && item.chaptersLatest[0]
                      ? item.chaptersLatest[0].chapter_name
                      : "Loading..."}
                  </span>
                </div>
              </Card>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
