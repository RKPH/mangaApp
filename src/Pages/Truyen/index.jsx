import axios from "axios";
import LazyLoad from "react-lazyload"; // Import LazyLoad component

import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import Modal from "./Modal";

const Truyen = () => {
  const { slug } = useParams(); // Lấy ra tham số đằng sau 'danh-sach'
  const [Data, setData] = useState([]); //for managa information
  const [Image, setImage] = useState("");
  const [chapters, setChaptersa] = useState([]); //for managa information
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("Tab name: ", slug);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`
        );
        setData(response.data.data); // Set data when fetched
        setImage(response.data.data.seoOnPage.seoSchema.image);
        setChaptersa(response.data.data.item.chapters);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full  bg-white py-4  dark:bg-[#18191A] ">
      <div className="bg-[whitesmoke] dark:bg-[#242526] lg:px-4 px-2 py-2 pb-10">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl shadow-md  lg:flex-row flex-col">
          <div className="col-span-12 lg:col-span-2 relative">
            <LazyLoad height={200} once>
              {isLoading ? (
                <Skeleton
                  width="252px"
                  height="345px"
                  color="red"
                  className="w-[252rem] h-[345rem]"
                ></Skeleton>
              ) : (
                <img
                  src={Image}
                  alt={slug}
                  width={252}
                  height={345}
                  className="w-full h-auto rounded-xl relative"
                />
              )}
            </LazyLoad>
            <div className="absolute flex flex-wrap items-center justify-center gap-2 bottom-0 text-center w-full bg-black/40 bg-opacity-80 py-2 m-0 rounded-t-none rounded-lg">
              <div className="cursor-pointer hover:bg-orange-600 bg-orange-400 inline-block px-3 rounded">
                <a
                  target="_blank"
                  href="https://otruyenapi.com/v1/api/truyen-tranh/than-ho-jangsan"
                  title="API truyện Thần Hổ Jangsan"
                  rel="noopener noreferrer"
                >
                  Lưu truyện
                </a>
              </div>
              <div className="cursor-pointer bg-gradient-to-br from-sky-400 to-blue-700 hover:from-sky-500 hover:to-blue-700 inline-block px-3 rounded">
                <button className="flex justify-items-center items-center text-center gap-1">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="w-5 h-5"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M319.61 20.654c13.145 33.114 13.144 33.115-5.46 63.5 33.114-13.145 33.116-13.146 63.5 5.457-13.145-33.114-13.146-33.113 5.457-63.498-33.114 13.146-33.113 13.145-63.498-5.459zM113.024 38.021c-11.808 21.04-11.808 21.04-35.724 24.217 21.04 11.809 21.04 11.808 24.217 35.725 11.808-21.04 11.808-21.04 35.724-24.217-21.04-11.808-21.04-11.808-24.217-35.725zm76.55 56.184c-.952 50.588-.95 50.588-41.991 80.18 50.587.95 50.588.95 80.18 41.99.95-50.588.95-50.588 41.99-80.18-50.588-.95-50.588-.95-80.18-41.99zm191.177 55.885c-.046 24.127-.048 24.125-19.377 38.564 24.127.047 24.127.046 38.566 19.375.047-24.126.046-24.125 19.375-38.564-24.126-.047-24.125-.046-38.564-19.375zm-184.086 83.88c-1.191.024-2.36.07-3.492.134-18.591 1.064-41.868 8.416-77.445 22.556L76.012 433.582c78.487-20.734 132.97-21.909 170.99-4.615V247.71c-18.076-8.813-31.79-13.399-46.707-13.737a91.166 91.166 0 0 0-3.629-.002zm122.686 11.42c-2.916-.026-5.81.011-8.514.098-12.81.417-27.638 2.215-45.84 4.522V427.145c43.565-7.825 106.85-4.2 171.244 7.566l-39.78-177.197c-35.904-8.37-56.589-11.91-77.11-12.123zm2.289 16.95c18.889.204 36.852 2.768 53.707 5.02l4.437 16.523c-23.78-3.75-65.966-4.906-92.467-.98l-.636-17.805c11.959-2.154 23.625-2.88 34.959-2.758zm-250.483 4.658l-10.617 46.004h24.094l10.326-46.004H71.158zm345.881 0l39.742 177.031 2.239 9.973 22.591-.152-40.855-186.852h-23.717zm-78.857 57.82c16.993.026 33.67.791 49.146 2.223l3.524 17.174c-32.645-3.08-72.58-2.889-102.995 0l-.709-17.174c16.733-1.533 34.04-2.248 51.034-2.223zm-281.793 6.18l-6.924 30.004h24.394l6.735-30.004H56.389zm274.418 27.244c4.656.021 9.487.085 14.716.203l2.555 17.498c-19.97-.471-47.115.56-59.728 1.05l-.7-17.985c16.803-.493 29.189-.828 43.157-.766zm41.476.447c8.268.042 16.697.334 24.121.069l2.58 17.74c-8.653-.312-24.87-.83-32.064-.502l-2.807-17.234a257.25 257.25 0 0 1 8.17-.073zm-326.97 20.309l-17.985 77.928 25.035-.17 17.455-77.758H45.313zm303.164 11.848c19.608-.01 38.66.774 56.449 2.572l2.996 20.787c-34.305-4.244-85.755-7.697-119.1-3.244l-.14-17.922c20.02-1.379 40.186-2.183 59.795-2.193zm-166.606 44.05c-30.112.09-67.916 6.25-115.408 19.76l-7.22 2.053 187.759-1.27v-6.347c-16.236-9.206-37.42-14.278-65.13-14.196zm134.41 6.174c-19.63.067-37.112 1.439-51.283 4.182v10.064l177.594-1.203c-44.322-8.634-89.137-13.17-126.31-13.043zM26 475v18h460v-18H26z"></path>
                  </svg>
                  <span className="text-base uppercase">Đọc truyện</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-10 flex flex-col gap-y-2">
            <h1 className="text-center text-lg lg:text-3xl text-orange-600 uppercase font-bold">
              {" "}
              {Data && Data.item && Data.item.name
                ? Data.item.name
                : "Undefined"}
            </h1>
            <h2 className="text-center text-sm lg:text-xl text-gray-400 dark:text-white uppercase font-semibold">
              {Data && Data.item && Data.item.origin_name
                ? Data.item.origin_name
                : "Undefined"}
            </h2>
            <div className="w-full h-px my-2 bg-gradient-to-l from-slate-200 via-ophim-border to-yellow-200"></div>
            <div>
              <span className="font-bold text-black dark:text-white mr-1">
                Trạng thái:{" "}
              </span>
              <span className="px-2 text-white font-semibold rounded-full bg-gradient-to-l from-orange-300 via-ophim-border to-orange-500">
                {Data && Data.item && Data.item.status
                  ? Data.item.status
                  : "Undefined"}
              </span>
            </div>
            <div>
              <span className="font-bold text-black dark:text-white mr-1">
                Tác giả:{" "}
              </span>
              <span className="text-black dark:text-white mr-1">
                {Data && Data.item && Data.item.author
                  ? Data.item.author
                  : "Undefined"}
              </span>
            </div>
            <div className="lg:flex lg:flex-row">
              <span className="font-bold  text-black dark:text-white mr-1  ">
                Thể loại:{" "}
              </span>
              <span className="gap-1 flex flex-wrap ">
                {Data && Data.item && Data.item.category
                  ? Data.item.category.map((item) => (
                      <Link
                        to={`/the-loai/${item.slug}`}
                        key={item._id}
                        className="px-2 lg:ml-1 text-white font-semibold text-sm rounded-full bg-gradient-to-l from-sky-300 via-ophim-border to-sky-500 hover:grayscale cursor-pointer whitespace-nowrap"
                      >
                        {item.name}
                      </Link>
                    ))
                  : "Undefined"}
              </span>
            </div>
            <div className="mt-2">
              <div className="max-h-28 overflow-auto  bg-white dark:bg-[#242520] p-2 border rounded-lg">
                <article>
                  <p
                    className="dark:text-white"
                    dangerouslySetInnerHTML={{ __html: Data?.item?.content }}
                  ></p>
                </article>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl shadow-md  ">
          <h3 className="text-center text-lg lg:text-3xl text-black dark:text-white uppercase font-bold">
            Danh sách chương
          </h3>
          <div className="p-4 min-h-[400px] max-h-[500px] overflow-y-auto w-full mt-2 border rounded-xl">
            <div>
              {Data.item?.chapters?.map((chapter) =>
                chapter.server_data.map((item) => (
                  <div
                    className="border-b border-solid py-[5px] hover:grayscale cursor-pointer  "
                    key={item.chapter_name}
                    onClick={() => {
                      handleClickOpen();
                      setSelectedChapter(item.chapter_api_data);
                    }}
                  >
                    <span className="text-base lg:text-base  text-black font-semibold dark:text-white">
                      Chương {item.chapter_name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={open}
        Data={Data}
        api={selectedChapter}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Truyen;
