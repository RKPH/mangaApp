import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DetailMangaSection = ({ Data, Image, slug }) => {
  const user = useSelector((state) => state.user.user);

  const token = useSelector((state) => state.auth.token);
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    // Kiểm tra xem truyện đã được lưu chưa
    const isMangaSaved = user?.userMangas.some(
      (manga) => manga?.slug === Data.item?.slug
    );

    setIsSaved(isMangaSaved);
  }, [user?.userMangas, Data.item?.slug]);
  const userId = user?.userID; // replace with the actual user ID if it varies
  const handleClick = async (slug, mangaName, mangaImage) => {
    if (!user) {
      toast.error("Please login to use this feature");
      return;
    }

    const requestBody = {
      slug: slug,
      mangaName: mangaName,
      mangaImage: mangaImage,
      saveType: 0,
    };

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
  return (
    <div className="grid grid-cols-12 gap-4 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl shadow-md">
      <div className="col-span-12   lg:col-span-4 xl:col-span-3 2xl:col-span-4 3xl:col-span-3 flex justify-center">
        <img
          src={Image}
          alt={slug}
          className="rounded-xl lg:w-[340px] h-[450px] md:w-3/4 w-full border-4 bg-cover"
        />
      </div>
      <div className="col-span-12  lg:col-span-8 xl:col-span-9 2xl:col-span-8 3xl:col-span-9 flex flex-col gap-y-2">
        <h2 className=" md:text-left text-center text-2xl  dark:text-blue-600 text-orange-600 uppercase font-bold">
          {Data?.name ?? "Undefined"}
        </h2>
        <h5 className="md:text-left text-center text-xl  text-gray-400 dark:text-white font-semibold">
          {Data?.origin_name ?? "Undefined"}
        </h5>
        <div className="w-full h-px my-2 bg-gradient-to-l from-slate-200 via-ophim-border to-yellow-200"></div>
        <div>
          <span className="font-semibold font-sansII text-xl dark:text-blue-600 text-orange-600  ">
            Trạng thái:
          </span>
          <span className="px-2 dark:text-white text-black font-normalfont-sansII  text-lg">
            {Data?.status ?? "Undefined"}
          </span>
        </div>
        <div>
          <span className="font-semibold  text-xl font-sansII dark:text-blue-600 text-orange-600  mr-1">
            Tác giả:{" "}
          </span>
          <span className="px-2 dark:text-white text-black font-normalfont-sansII  text-lg">
            {Data?.author ?? "Undefined"}
          </span>
        </div>
        <div className="flex ">
          <h5 className="font-semibold text-xl dark:text-blue-600 text-orange-600 mr-2 whitespace-nowrapfont-sansII">
            Thể loại:
          </h5>
          <div className="flex gap-1 flex-wrap">
            {Data?.category?.map((category) => (
              <Link
                to={`/the-loai/${category.slug}`}
                key={category.slug}
                className="px-2 dark:text-white text-black font-medium text-lg bg-blue-500 hover:grayscale cursor-pointer whitespace-nowrap rounded-md font-sansII"
              >
                {category.name}
              </Link>
            )) ?? "Undefined"}
          </div>
        </div>
        <div className="flex flex-row gap-2 flex-wrap bottom-0 text-center w-full  py-2 rounded-t-none rounded-xl">
          <div className="cursor-pointer hover:bg-orange-600 bg-orange-400 inline-block px-3 rounded">
            <button
              onClick={() => {
                ``;
                handleClick(Data?.slug, Data?.name, Image);
              }}
              className="flex justify-items-center text-base items-center text-center gap-1 p-1 uppercasefont-sansII"
            >
              {isSaved ? "Đã lưu" : "Lưu truyện"}
            </button>
          </div>
          <div className="cursor-pointer bg-gradient-to-br from-sky-400 to-blue-700 hover:from-sky-500 hover:to-blue-700 inline-block px-3 rounded">
            <button className="flex justify-items-center items-center text-center lg:text-base text-sm gap-1 p-1">
              <span className="text-base  uppercasefont-sansII">
                Đọc truyện
              </span>
            </button>
          </div>
          <div className="cursor-pointer bg-gradient-to-br from-pink-600 to-red-700 hover:from-punk-500 hover:to-red-400 inline-block px-3 rounded">
            <button className="flex justify-items-center items-center text-center gap-1 p-1 text-base">
              <span className="text-base uppercasefont-sansII">
                {" "}
                Yêu thích
              </span>
            </button>
          </div>
        </div>
        <div className="mt-2">
          <h3 className="text-xlfont-sansII font-semibold dark:text-white m-1">
            {" "}
            Giới thiệu
          </h3>
          <div className="max-h-28 overflow-auto bg-white dark:bg-[#242520] p-2 border rounded-lgfont-sansII">
            <article>
              <p
                className="dark:text-white font-normal text-black text-lgfont-sansII "
                dangerouslySetInnerHTML={{ __html: Data?.content }}
              ></p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};
DetailMangaSection.propTypes = {
  Data: PropTypes.object.isRequired,
  Image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};
export default DetailMangaSection;
