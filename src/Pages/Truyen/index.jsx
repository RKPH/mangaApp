import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProgressSpinner } from "primereact/progressspinner";
import HomeIcon from "@mui/icons-material/Home";
import { BreadCrumb } from "primereact/breadcrumb";
import RowOfCard from "../../Components/RowOfCard";
import DetailMangaSection from "../../Components/DetailMangaSection";
import ChapterList from "../../Components/ChapterList";
import Disscussion from "../../Components/CommentSection";
const Truyen = () => {
  const { slug } = useParams(); // Lấy ra tham số đằng sau 'danh-sach'
  const [Data, setData] = useState({}); // for manga information
  const [Image, setImage] = useState("");
  const [chapters, setChaptersa] = useState([]); // for manga information

  const [suggesttion, setSuggestion] = useState([]); // for manga information
  const fetchSuggestions = async (type) => {
    try {
      const response = await axios.get(
        `https://otruyenapi.com/v1/api/the-loai/${type}`
      );
      setSuggestion((prevSuggestions) => ({
        ...prevSuggestions,
        [type]: response.data.data.items.slice(0, 3), // Take only the first 3 items
      }));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    setData({}); // Reset data when component mounts
    setImage("");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`
        );
        const fetchedData = response.data.data;
        setData(response.data?.data?.item); // Set data when fetched
        setImage(response.data.data.seoOnPage.seoSchema.image);
        setChaptersa(response.data.data.item.chapters);

        fetchedData?.item?.category.forEach((category) => {
          fetchSuggestions(category.slug);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const items = [
    {
      label: Data?.name,
      template: () => (
        <a className="md:text-lg  text-sm font-sansII cursor-pointer text-orange-500 dark:text-blue-400 ">
          {Data?.name}
        </a>
      ),
    },
  ];

  const home = {
    label: "Trang chủ",
    url: "/",
    className:
      "md:text-lg  text-sm font-sansII cursor-pointer text-black dark:text-white whitespace-nowrap",
  };
  const flattenedSuggestions = Object.values(suggesttion).flat();
  return (
    <div className="w-full bg-white py-4 dark:bg-[#18191A] font-sansII">
      <div className="bg-[whitesmoke] dark:bg-[#242526] lg:px-4 px-2 py-2 ">
        {Data && chapters && Image ? (
          <div>
            <BreadCrumb
              model={items}
              home={home}
              separator=">"
              className="px-1 shadow-md  flex flex-wrap items-center text-base dark:text-white rounded-md mb-5 font-sansII"
            />
            <DetailMangaSection Data={Data} Image={Image} slug={slug} />
            <ChapterList chapters={chapters} slug={slug} />
            <div className="mt-2 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl shadow-md">
              <h3 className="text-left text-xl text-black dark:text-white uppercase font-bold font-sansII">
                Truyện tương tự
              </h3>
              <RowOfCard data={flattenedSuggestions} />
            </div>
            <Disscussion />
          </div>
        ) : (
          <ProgressSpinner
            className="md:w-44 md:h-44 w-28 h-28 flex justify-center items-center dark:bg-[#242526]"
            strokeWidth="4"
            animationDuration=".5s"
          />
        )}
      </div>
    </div>
  );
};

export default Truyen;
