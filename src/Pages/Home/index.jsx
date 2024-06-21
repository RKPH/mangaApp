import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useDispatch } from "react-redux";
import { deleteManga, saveMangas } from "../../Redux/MangaSlice";

import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";

import Hero from "../../Components/Homepage_Hero";
import RowOfCard from "../../Components/RowOfCard";
import HistoryRead from "./HistoryRead";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  //fecth for histroy read
  const [data2, setData2] = useState(
    JSON.parse(localStorage.getItem("readMangas")) || []
  );

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    window.scrollTo(0, 0);
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
  const handleClicked = (e, item) => {
    e.preventDefault(); // Prevent navigation

    dispatch(deleteManga(item));
    dispatch(saveMangas());
    const updatedMangas = data2.filter((manga) => manga._id !== item._id);
    setData2(updatedMangas);
  };
  return (
    <div
      ref={ref}
      className="w-full h-full flex flex-col items-center overflow-x-hidden bg-white dark:bg-[#18191A] py-4 z-0  font-sansII"
    >
      <div className=" w-full min-h-screen py-2 bg-[whitesmoke] dark:bg-[#242526] px-4 ">
        <Hero data={data} />

        {data2 && data2.length > 0 && (
          <HistoryRead
            data2={data2}
            domain={domain}
            handleClicked={handleClicked}
          />
        )}

        <div className="p-1 my-2 dark:text-white text-black">
          <div className="flex flex-row justify-between items-center">
            <h2 className="md:text-xl text-lg  font-sansII  uppercase font-bold ">
              Truyện mới cập nhật
            </h2>
            <Link
              to="/danh-sach/truyen-moi"
              className="rounded-2xl  font-sansII md:text-lg text-base p-2 px-4 bg-white border-4 dark:border-blue-600 border-orange-600 text-orange-600   dark:text-blue-600 dark:hover:bg-blue-500 hover:bg-orange-500 transition duration-300"
            >
              Xem thêm
            </Link>
          </div>
          <RowOfCard data={data} />
        </div>
        <div className="p-1 my-2 dark:text-white text-black">
          <div className="flex flex-row justify-between items-center">
            <h2 className="md:text-xl text-lg  font-sansII  uppercase font-bold  ">
              Truyện sắp ra mắt
            </h2>
            <Link
              to="/danh-sach/truyen-moi"
              className="rounded-2xl  font-sansII md:text-lg text-base p-2 px-4 bg-white border-4 dark:border-blue-600 border-orange-600 text-orange-600   dark:text-blue-600 dark:hover:bg-blue-500 hover:bg-orange-500 transition duration-300"
            >
              Xem thêm
            </Link>
          </div>
          <RowOfCard data={dataPhatHanh} />
        </div>
        <div className=" m-5 min-h-fit w-fit flex flex-col border-black dark:border-white border p-2 rounded-md lg:hidden  ">
          <h2 className=" font-sansII text-base lg:text-2xl font-semibold text-orange-500 dark:dark:text-blue-400 text-left my-5">
            Hôm nay nên đọc gì
          </h2>
          <div className="flex flex-wrap overflow-ellipsis whitespace-normal p-1 w-fit  font-sansII dark:text-white hover:opacity-70">
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
