import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { Disclosure } from "@headlessui/react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ArrowRight } from "@mui/icons-material";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import Sliders from "../../Components/Slider";
const Home = () => {
  const navigate = useNavigate();
  //fecth for histroy read
  const [data2, setData2] = useState(
    JSON.parse(localStorage.getItem("readMangas")) || []
  );
  const domain = "https://otruyenapi.com/uploads/comics/";

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://otruyenapi.com/v1/api/the-loai"
        );
        setCategories(response.data.data.items.slice(0, 12));
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
  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-white dark:bg-[#18191A] py-4 z-0 ">
      <div className=" w-full min-h-screen py-2 bg-[whitesmoke] dark:bg-[#242526] px-4 pr-7">
        <h1 className="ttext-lg lg:text-3xl font-bold text-orange-500 dark:text-blue-400 text-center my-5 mb-10">
          TRANG CHỦ
        </h1>
        {data2 && data2.length > 0 && (
          <div className="mt-5 mb-10 w-full">
            <h2 className="font-[helvetica] text-lg lg:text-2xl font-semibold text-orange-500 dark:dark:text-blue-400 text-left my-5">
              Nội dung bạn đã đọc
            </h2>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-300 px-4 py-2 text-left text-sm font-medium text-black hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <span>Danh sách tiếp tục xem ({data2.length})</span>
                    <KeyboardArrowDownIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-black`}
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
          </div>
        )}
        {categories.map((item) => (
          <div key={item._id} className="my-10">
            <Link to={`/the-loai/${item.slug}`}>
              <h2 className="font-[helvetica] text-lg lg:text-2xl font-semibold text-orange-500 dark:text-blue-400 text-left my-5 hover:underline">
                {item.name}
                <ArrowRight className="text-lg lg:text-2xl font-semibold text-orange-500 dark:dark:text-blue-400 text-left ml-0" />
              </h2>
            </Link>
            <Sliders data={item.slug} />
          </div>
        ))}
        <div className=" my-10 min-h-fit w-fit flex flex-col border-black dark:border-white border p-2 rounded-md ">
          <h2 className="font-[helvetica] text-lg lg:text-2xl font-semibold text-orange-500 dark:dark:text-blue-400 text-left my-5">
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
