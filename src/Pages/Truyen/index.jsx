import axios from "axios";
import LazyLoad from "react-lazyload"; // Import LazyLoad component
import { useUser } from "../../Service/User";
import { Card } from "primereact/card";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BreadCrumb } from "primereact/breadcrumb";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Truyen = () => {
  const domain = "https://otruyenapi.com/uploads/comics/";
  const { slug } = useParams(); // Lấy ra tham số đằng sau 'danh-sach'
  const [Data, setData] = useState([]); // for manga information
  const [Image, setImage] = useState("");
  const [chapters, setChaptersa] = useState([]); // for manga information
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [isSaved, setIsSaved] = useState(false);
  const [suggesttion, setSuggestion] = useState([]); // for manga information
  const user = useUser();
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
  console.log("Tab name: ", slug);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`
        );
        const fetchedData = response.data.data;
        setData(response.data.data); // Set data when fetched
        setImage(response.data.data.seoOnPage.seoSchema.image);
        setChaptersa(response.data.data.item.chapters);
        setIsLoading(false);
        fetchedData?.item?.category.forEach((category) => {
          fetchSuggestions(category.slug);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData();

    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    // Kiểm tra xem truyện đã được lưu chưa
    const isMangaSaved = user?.userMangas.some(
      (manga) => manga?.slug === Data.item?.slug
    );

    setIsSaved(isMangaSaved);
  }, [user?.userMangas, Data.item?.slug]);
  const handleClick = async (slug, mangaName, mangaImage) => {
    if (!user) {
      toast.error("Please login to use this feature");
      return;
    }
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.status === 401 || !userId) {
        toast.error("Please login to save manga");
      }
      if (!response.ok) {
        if (response.status === 409) {
          toast.error("already saved");
        } else {
          const message = `An error has occurred: ${response.status}`;
          toast.error(response.status);

          alert(message);
        }
        return;
      }
      toast.success(`Saved manga: ${mangaName} successfully`); // `Saved manga: ${mangaName} successfully
      setIsSaved(true);
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to save manga: ${error.message}`);
    }
  };
  const flattenedSuggestions = Object.values(suggesttion).flat();
  return (
    <div className="w-full bg-white py-4 dark:bg-[#18191A] font-['Oswald']]">
      <div className="bg-[whitesmoke] dark:bg-[#242526] lg:px-4 px-2 py-2 pb-10">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl shadow-md">
          <div className="col-span-12  md:col-span-4 lg:col-span-4 xl:col-span-3 3xl:col-span-3 flex justify-center">
            <img
              src={Image}
              alt={slug}
              className="rounded-xl lg:w-[340px] w-full border bg-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 3xl:col-span-9 flex flex-col gap-y-2">
            <h1 className=" text-justify  lg:text-left text-2xl dark:text-blue-600 text-orange-600 uppercase font-bold">
              {Data?.item?.name ?? "Undefined"}
            </h1>
            <h3 className="text-justify  lg:text-left lg:text-xl text-lg text-gray-400 dark:text-white uppercase font-semibold">
              {Data?.item?.origin_name ?? "Undefined"}
            </h3>
            <div className="w-full h-px my-2 bg-gradient-to-l from-slate-200 via-ophim-border to-yellow-200"></div>
            <div>
              <span className="font-semibold font-['Oswald']] text-xl dark:text-blue-600 text-orange-600  ">
                Trạng thái:
              </span>
              <span className="px-2 dark:text-white text-black font-normal font-['Oswald']]  text-lg">
                {Data?.item?.status ?? "Undefined"}
              </span>
            </div>
            <div>
              <span className="font-semibold  text-xl  dark:text-blue-600 text-orange-600  mr-1">
                Tác giả:{" "}
              </span>
              <span className="text-black  text-lg font-normal font-['Oswald']] dark:text-white mr-1">
                {Data?.item?.author ?? "Undefined"}
              </span>
            </div>
            <div className="lg:flex lg:flex-row">
              <h5 className="font-semibold   text-xl dark:text-blue-600 text-orange-600  mr-2">
                Thể loại:{" "}
              </h5>

              <div className="gap-1 flex flex-wrap mt-1">
                {Data?.item?.category?.map((item) => (
                  <Link
                    to={`/the-loai/${item.slug}`}
                    key={item.slug}
                    className="px-2  dark:text-white text-black font-normal font-['Oswald']]  text-lg   bg-blue-500 hover:grayscale cursor-pointer whitespace-nowrap rounded-md"
                  >
                    {item.name}
                  </Link>
                )) ?? "Undefined"}
              </div>
            </div>
            <div className="flex flex-row gap-2 flex-wrap bottom-0 text-center w-full  py-2 rounded-t-none rounded-xl">
              <div className="cursor-pointer hover:bg-orange-600 bg-orange-400 inline-block px-3 rounded">
                <button
                  onClick={() => {
                    ``;
                    handleClick(Data.item.slug, Data.item.name, Image);
                  }}
                  className="flex justify-items-center text-base items-center text-center gap-1 p-1 uppercase"
                >
                  {isSaved ? "Đã lưu" : "Lưu truyện"}
                </button>
              </div>
              <div className="cursor-pointer bg-gradient-to-br from-sky-400 to-blue-700 hover:from-sky-500 hover:to-blue-700 inline-block px-3 rounded">
                <button className="flex justify-items-center items-center text-center lg:text-base text-sm gap-1 p-1">
                  <span className="text-base  uppercase">Đọc truyện</span>
                </button>
              </div>
              <div className="cursor-pointer bg-gradient-to-br from-pink-600 to-red-700 hover:from-punk-500 hover:to-red-400 inline-block px-3 rounded">
                <button className="flex justify-items-center items-center text-center gap-1 p-1 text-base">
                  <span className="text-base uppercase"> Yêu thích</span>
                </button>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-xl font-['Oswald'] font-semibold dark:text-white m-1">
                {" "}
                Giới thiệu
              </h3>
              <div className="max-h-28 overflow-auto bg-white dark:bg-[#242520] p-2 border rounded-lg">
                <article>
                  <p
                    className="dark:text-white font-normal text-black text-lg  "
                    dangerouslySetInnerHTML={{ __html: Data?.item?.content }}
                  ></p>
                </article>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl  shadow-md">
          <h3 className="text-left  text-xl text-black dark:text-white uppercase font-bold">
            Danh sách chương
          </h3>
          <div className=" overflow-y-auto w-full mt-2 ">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-10 gap-2 ">
              {chapters.map((chapter) =>
                chapter.server_data.map((item, index) => (
                  <Link
                    to={`/truyen-tranh/${slug}/chapter-${item.chapter_name}`}
                    state={{
                      chapter_api: item.chapter_api_data,
                      data: chapters,
                    }}
                    className="flex items-center justify-center p-1 border rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                    key={`${item.chapter_name}-${index}`}
                  >
                    <span className="text-base font-normal">
                      Chương {item.chapter_name}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl  shadow-md">
          <h3 className="text-left  text-xl text-black dark:text-white uppercase font-bold">
            Truyện tương tự
          </h3>
          <div className="w-full my-10 grid grid-cols-2 s:grid-cols-3 xs:grid-cols-2 sm:grid-cols-4  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-5">
            {fetchSuggestions.length === 0
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
              : flattenedSuggestions.map((item, index) => (
                  <Card key={index} className=" lg:hover:scale-110   ">
                    <Link to={`/truyen-tranh/${item.slug}`}>
                      <img
                        onClick={() => {
                          setData([]);
                          setImage("");
                        }}
                        src={`${domain}/${item.thumb_url}`}
                        alt={item.slug}
                        className="h-[200px] xs:h-[200px] sm:h-[200px] lg:h-[220px] 2xl:h-[220px] 3xl:h-[220px] w-full rounded-md"
                      />
                      <div className="py-2">
                        <h5 className="overflow-hidden text-left  text-lg  font-bold overflow-ellipsis whitespace-nowrap dark:text-white">
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
      </div>
    </div>
  );
};

export default Truyen;
