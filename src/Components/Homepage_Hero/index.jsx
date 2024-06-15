import { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteManga, saveMangas } from "../../Redux/MangaSlice";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import PropTypes from "prop-types";
const carouselItemTemplate = (item) => {
  return (
    <div className=" flex items-center justify-center  dark:bg-[#18191A]  rounded-3xl lg:h-[550px] h-[350px] z-0 relative font-[helvetica]">
      <img
        className="h-full w-full rounded-3xl shadow-md "
        src={`https://img.otruyenapi.com//uploads/comics/${item?.thumb_url}`}
      />
      <div className="absolute  md:w-11/12 w-full h-full ">
        <div className="grid grid-cols-12  p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl shadow-lg lg:top-28  relative ">
          <div className="col-span-12  md:col-span-4 lg:col-span-4 xl:col-span-3 3xl:col-span-3 md:flex hidden justify-center items-center ">
            <img
              src={`https://img.otruyenapi.com//uploads/comics/${item?.thumb_url}`}
              className="rounded-xl w-[200px] h-[300px]  border-4 bg-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 3xl:col-span-9 flex flex-col gap-y-2 h-full dark:bg-[#18191abb] rounded-lg border p-2">
            <span className="flex-wrap flex">
              <h1 className=" md:text-left lg:text-2xl md:text-lg text-lg text-left   dark:text-blue-600 text-orange-600 uppercase font-bold">
                {item?.name ?? "Undefined"}
              </h1>
            </span>
            <span className="font-normal  md:text-base text-sm w-fit rounded-lg text-black bg-gradient-to-br from-sky-400 to-blue-700 px-2 dark:text-white">
              Chapter:{" "}
              {item.chaptersLatest && item.chaptersLatest[0]
                ? item.chaptersLatest[0].chapter_name
                : "Loading..."}{" "}
            </span>
            <div className="w-full h-px my-2 bg-gradient-to-l from-slate-200 via-ophim-border to-yellow-200"></div>
            <div>
              <span className="font-semibold md:text-lg text-base dark:text-blue-600 text-orange-600  ">
                Trạng thái:
              </span>
              <span className="px-2 text-white  font-medium  md:text-base text-sm">
                {item?.status ?? "Undefined"}
              </span>
            </div>
            <div>
              <span className="font-semibold  md:text-lg text-base  dark:text-blue-600 text-orange-600  mr-1">
                Tác giả:{" "}
              </span>
              <span className=" md:text-base text-sm font-medium  text-white mr-1">
                {item?.author ?? "Undefined"}
              </span>
            </div>
            <div className="lg:flex lg:flex-row">
              <h5 className="font-semibold   md:text-lg text-base dark:text-blue-600 text-orange-600  mr-2">
                Thể loại:{" "}
              </h5>

              <div className="gap-1 flex flex-wrap mt-1">
                {item?.category?.map((item) => (
                  <Link
                    to={`/the-loai/${item.slug}`}
                    key={item.slug}
                    className="px-2  dark:text-white text-black font-medium md:text-base text-sm   bg-blue-500 hover:grayscale cursor-pointer whitespace-nowrap rounded-md"
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

const Hero = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data2, setData2] = useState(
    JSON.parse(localStorage.getItem("readMangas")) || []
  );

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
  useEffect(() => {
    setData2(JSON.parse(localStorage.getItem("readMangas")) || []);
  }, []);
  const domain = "https://otruyenapi.com/uploads/comics/";
  return (
    <div className="w-full flex flex-row items-center justify-between mb-10">
      <Carousel
        className="dark:text-white lg:w-2/3 w-full  flex  items-center z-0 relative"
        itemTemplate={carouselItemTemplate}
        numVisible={1}
        numScroll={1}
        draggable={false}
        value={data && data.slice(0, 5)}
        showIndicators={true}
        indicatorsContentClassName="dark:text-white bottom-0 absolute gap-1 rounded-3xl z-10 w-52 flex justify-center items-center p-2"
        circular={true}
        autoplayInterval={3000}
      />

      <div className="w-1/3 lg:flex flex-col hidden gap-y-4 mx-5 justify-center">
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
              data2
                .slice()
                .reverse()
                .map((item, index) => (
                  <Link
                    to={`/truyen-tranh/${item.slug}`}
                    key={index}
                    className="w-full h-[100px] p-1 dark:bg-[#242526] bg-[whitesmoke] shadow-lg  rounded-md cursor-pointer grid grid-cols-12  items-center hover:scale-105 transition duration-300 my-3 z-10"
                  >
                    <div className="col-span-10 lg:col-span-8 gap-4 ml-1 flex">
                      <img
                        className="min-w-[70px] h-[80px] rounded-md shadow-md"
                        src={`${domain}/${item.thumb_url}`}
                        loading="lazy"
                        alt={item.slug}
                      />
                      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                        <h4 className="text-lg text-black dark:text-white font-normal">
                          {item.name}
                        </h4>
                        <h5 className="text-base text-gray-500 font-normal">
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
  );
};
Hero.propTypes = {
  data: PropTypes.array,
};
export default Hero;