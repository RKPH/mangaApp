import axios from "axios";
import LazyLoad from "react-lazyload"; // Import LazyLoad component
import { useUser } from "../../Service/User";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

const Truyen = () => {
  const { slug } = useParams(); // Lấy ra tham số đằng sau 'danh-sach'
  const [Data, setData] = useState([]); // for manga information
  const [Image, setImage] = useState("");
  const [chapters, setChaptersa] = useState([]); // for manga information
  const [isLoading, setIsLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);

  const user = useUser();

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
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // Kiểm tra xem truyện đã được lưu chưa
    const isMangaSaved = user?.userMangas.some(
      (manga) => manga?.slug === Data.item?.slug
    );

    setIsSaved(isMangaSaved);
  }, [user?.userMangas, Data.item?.slug]);
  const handleClick = async (slug, mangaName, mangaImage) => {
    const userId = user.userID; // replace with the actual user ID if it varies
    console.log("id:", userId);
    const requestBody = {
      slug: slug,
      mangaName: mangaName,
      mangaImage: mangaImage,
    };

    console.log(requestBody);

    try {
      const response = await fetch(
        `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/UserManga/savemanga?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        if (response.status === 409) {
          const message = "This manga is already saved by the user.";
          alert(message);
        } else {
          const message = `An error has occurred: ${response.status}`;
          alert(message);
        }
        return;
      }

      setIsSaved(true);
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to save manga: ${error.message}`);
    }
  };

  return (
    <div className="w-full bg-white py-4 dark:bg-[#18191A] font-mono">
      <div className="bg-[whitesmoke] dark:bg-[#242526] lg:px-4 px-2 py-2 pb-10">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl shadow-md">
          <div className="col-span-12  md:col-span-4 lg:col-span-4 xl:col-span-3 3xl:col-span-2 flex justify-center">
            <img
              src={Image}
              alt={slug}
              className="rounded-xl lg:w-fit w-3/4"
            />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 3xl:col-span-10 flex flex-col gap-y-2">
            <h1 className=" text-justify text-lg lg:text-left lg:text-xl 3xl:text-2xl text-orange-600 uppercase font-bold">
              {Data?.item?.name ?? "Undefined"}
            </h1>
            <h3 className="text-justify text-base lg:text-left lg:text-lg text-gray-400 dark:text-white uppercase font-semibold">
              {Data?.item?.origin_name ?? "Undefined"}
            </h3>
            <div className="w-full h-px my-2 bg-gradient-to-l from-slate-200 via-ophim-border to-yellow-200"></div>
            <div>
              <span className="font-bold font-mono text-black lg:text-base text-sm dark:text-white ">
                Trạng thái:
              </span>
              <span className="px-2 dark:text-white text-black font-normal  lg:text-base text-sm ">
                {Data?.item?.status ?? "Undefined"}
              </span>
            </div>
            <div>
              <span className="font-bold text-black lg:text-base text-sm dark:text-white mr-1">
                Tác giả:{" "}
              </span>
              <span className="text-black lg:text-base text-sm font-mono dark:text-white mr-1">
                {Data?.item?.author ?? "Undefined"}
              </span>
            </div>
            <div className="lg:flex lg:flex-row">
              <span className="font-bold text-black lg:text-base text-sm dark:text-white mr-1">
                Thể loại:{" "}
              </span>
              <span className="gap-1 flex flex-wrap">
                {Data?.item?.category?.map((item) => (
                  <Link
                    to={`/the-loai/${item.slug}`}
                    key={item.slug}
                    className="px-2 lg:ml-1 dark:text-white text-black font-normal font-mono lg:text-base text-sm  border border-orange-500 hover:grayscale cursor-pointer whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                )) ?? "Undefined"}
              </span>
            </div>
            <div className="flex flex-row gap-2 flex-wrap bottom-0 text-center w-full  py-2 rounded-t-none rounded-xl">
              <div className="cursor-pointer hover:bg-orange-600 bg-orange-400 inline-block px-3 rounded">
                <button
                  onClick={() => {
                    handleClick(Data.item.slug, Data.item.name, Image);
                  }}
                  className="flex justify-items-center lg:text-base text-sm items-center text-center gap-1 p-1 uppercase"
                >
                  {isSaved ? "Đã lưu" : "Lưu truyện"}
                </button>
              </div>
              <div className="cursor-pointer bg-gradient-to-br from-sky-400 to-blue-700 hover:from-sky-500 hover:to-blue-700 inline-block px-3 rounded">
                <button className="flex justify-items-center items-center text-center lg:text-base text-sm gap-1 p-1">
                  <span className="lg:text-base text-sm  uppercase">
                    Đọc truyện
                  </span>
                </button>
              </div>
              <div className="cursor-pointer bg-gradient-to-br from-pink-600 to-red-700 hover:from-punk-500 hover:to-red-400 inline-block px-3 rounded">
                <button className="flex justify-items-center items-center text-center gap-1 p-1 lg:text-base text-sm">
                  <span className="lg:text-base text-sm uppercase">
                    {" "}
                    <FavoriteBorderRoundedIcon className="lg:text-base text-sm " />{" "}
                    Yêu thích
                  </span>
                </button>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="lg:text-base text-sm font-mono font-bold dark:text-white m-1">
                {" "}
                Giới thiệu
              </h3>
              <div className="max-h-28 overflow-auto bg-white dark:bg-[#242520] p-2 border rounded-lg">
                <article>
                  <p
                    className="dark:text-white font-normal text-black lg:text-base text-sm  "
                    dangerouslySetInnerHTML={{ __html: Data?.item?.content }}
                  ></p>
                </article>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl shadow-md">
          <h3 className="text-center text-base lg:text-xl text-black dark:text-white uppercase font-bold">
            Danh sách chương
          </h3>
          <div className="p-4 min-h-[400px] max-h-[500px] overflow-y-auto w-full mt-2 border rounded-xl">
            <div>
              {chapters.map((chapter) =>
                chapter.server_data.map((item, index) => (
                  <Link
                    to={`/truyen-tranh/${slug}/chapter-${item.chapter_name}`}
                    state={{
                      chapter_api: item.chapter_api_data,
                      data: chapters,
                    }}
                    className="border-b w-full inline-block border-solid py-[5px] hover:grayscale cursor-pointer "
                    key={index}
                  >
                    <span className="text-sm xl:text-base text-black font-semibold dark:text-white">
                      Chương {item.chapter_name}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Truyen;
