import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <a className="lg:text-base text-sm  font-[helvetica] cursor-pointer text-orange-500 dark:text-blue-400">
          {Data?.name}
        </a>
      ),
    },
  ];

  const home = {
    label: "Trang chủ",
    url: "/",
    className:
      "lg:text-base text-sm font-[helvetica] cursor-pointer text-black dark:text-white",
  };
  const flattenedSuggestions = Object.values(suggesttion).flat();
  return (
    <div className="w-full bg-white py-4 dark:bg-[#18191A] font-['Oswald']">
      <div className="bg-[whitesmoke] dark:bg-[#242526] lg:px-4 px-2 py-2 pb-10">
        <BreadCrumb
          model={items}
          home={home}
          separator=">"
          className="px-1 shadow-md min-w-fit max-w-fit lg:text-base text-sm dark:text-white rounded-md mb-5 font-[helvetica]"
        />
        <DetailMangaSection Data={Data} Image={Image} slug={slug} />

        <ChapterList chapters={chapters} slug={slug} />
        <div className="mt-2 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl  shadow-md">
          <h3 className="text-left  text-xl text-black dark:text-white uppercase font-bold">
            Truyện tương tự
          </h3>
          <RowOfCard data={flattenedSuggestions} />
        </div>
        <Disscussion />
      </div>
    </div>
  );
};

export default Truyen;
