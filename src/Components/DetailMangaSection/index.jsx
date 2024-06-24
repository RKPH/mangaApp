import React, { memo, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper function to format the timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date
    .getFullYear()
    .toString()
    .slice(-2)}`;
  const formattedTime = date.toLocaleTimeString();

  return `${formattedDate}, ${formattedTime}`;
};

const DetailMangaSection = memo(({ Data, Image, slug }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.token);
  const [isSaved, setIsSaved] = React.useState(false);

  useEffect(() => {
    const isMangaSaved = user?.userMangas?.some(
      (manga) => manga?.slug === Data?.slug
    );
    setIsSaved(isMangaSaved);
  }, [user?.userMangas, Data?.slug]);

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
      toast.success(`Saved manga successfully`); 
      setIsSaved(true);
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to save manga: ${error.message}`);
    }
  };

  const statusText = useMemo(() => {
    if (Data?.item?.status === "ongoing") {
      return "Đang cập nhật";
    } else if (Data?.item?.status === "completed") {
      return "Đã hoàn thành";
    } else {
      return "";
    }
  }, [Data?.item?.status]);

  const formattedDate = useMemo(() => {
    return Data?.seoOnPage?.updated_time
      ? formatTimestamp(Data.seoOnPage.updated_time)
      : "";
  }, [Data?.seoOnPage?.updated_time]);

  return (
    <div className="grid grid-cols-12 gap-4 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl shadow-md">
      <div className="col-span-12 xl:col-span-4  lg:col-span-4  2xl:col-span-4 3xl:col-span-3 flex justify-center">
        <img
          src={Image}
          alt={slug}
          className="rounded-xl lg:w-[340px] lg:h-[450px] h-[350px] w-4/5 border-4 bg-cover"
        />
      </div>
      <div className="col-span-12  lg:col-span-8 xl:col-span-8 2xl:col-span-8 3xl:col-span-9 flex flex-col gap-y-2">
        <h1 className="md:text-left text-center md:text-3xl text-2xl dark:text-blue-600 text-orange-600 font-medium font-sansII">
          {Data?.item?.name ?? "Undefined"}
        </h1>
        <div className="w-full h-px my-2 bg-gradient-to-l from-slate-200 via-ophim-border to-yellow-200"></div>
        <div className="flex ">
          <span className="font-semibold font-sansII whitespace-nowrap     text-lg dark:text-blue-600 text-orange-600 mr-[81px]">
            Tên khác:
          </span>
          <span className="px-2 dark:text-white text-black text-thin font-sansII text-lg flex flex-wrap">
            {Data?.item?.origin_name ?? "Undefined"}
          </span>
        </div>
        <div>
          <span className="font-semibold font-sansII text-lg dark:text-blue-600 text-orange-600 mr-3">
            Cập nhật lần cuối:
          </span>
          <span className="px-2 dark:text-white text-black text-thin font-sansII lowercase text-lg">
            {formattedDate}
          </span>
        </div>
        <div>
          <span className="font-semibold font-sansII text-lg dark:text-blue-600 text-orange-600 mr-[72px]">
            Trạng thái:
          </span>
          <span className="px-2 dark:text-white text-black text-thin font-sansII text-lg">
            {statusText ?? "Undefined"}
          </span>
        </div>
        <div>
          <span className="font-semibold font-sansII text-lg dark:text-blue-600 text-orange-600 mr-[70px]">
            Tác giả:{" "}
          </span>
          <span className="px-8 dark:text-white text-black text-thin font-sansII text-lg">
            {Data?.item?.author ?? "Undefined"}
          </span>
        </div>
        <div className="flex items-start">
          <h5 className="font-semibold text-lg dark:text-blue-600 text-orange-600 mr-20 whitespace-nowrap font-sansII ">
            Thể loại:
          </h5>
          <div className="px-5 flex gap-2 flex-wrap items-center mt-1">
            {Data?.item?.category?.map((category) => (
              <Link
                to={`/the-loai/${category.slug}`}
                key={category.slug}
                className="px-2 dark:text-white text-black text-thin text-base bg-blue-500 hover:grayscale cursor-pointer whitespace-nowrap rounded-md font-sansII"
              >
                {category.name}
              </Link>
            )) ?? "Undefined"}
          </div>
        </div>
        <div className="flex flex-row lg:gap-3 gap-1 flex-wrap text-center w-full py-2 rounded-t-none rounded-xl">
          <button
            onClick={() =>
              handleClick(Data?.item.slug, Data?.item?.name, Image)
            }
            className="bg-orange-600 w-24 justify-center hover:bg-orange-500 flex border rounded-md text-lg dark:text-white text-black items-center text-center p-1 font-sansII"
          >
            <span className="text-base font-sansII">
              {isSaved ? "Đã lưu" : "Lưu truyện"}
            </span>
          </button>
          <button className="w-24 flex justify-center border rounded-md text-lg dark:text-white text-black items-center text-center p-1 font-sansII">
            <span className="text-base font-sansII text-center">
              Đọc truyện
            </span>
          </button>
          <button className="bg-red-600 hover:bg-red-500 w-24 flex justify-center border rounded-md text-lg dark:text-white text-black items-center text-center p-1 font-sansII">
            <span className="text-base font-sansII text-center">Yêu thích</span>
          </button>
        </div>
        <div className="mt-2">
          <h3 className="text-xl font-sansII font-semibold dark:text-white m-1">
            Giới thiệu
          </h3>
          <div className="max-h-28 overflow-auto bg-white dark:bg-[#242520] p-2 border rounded-lg font-sansII">
            <article>
              <p
                className="dark:text-white font-thin text-black text-lg font-sansII"
                dangerouslySetInnerHTML={{ __html: Data?.item?.content }}
              ></p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
});

DetailMangaSection.propTypes = {
  Data: PropTypes.object.isRequired,
  Image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default DetailMangaSection;
