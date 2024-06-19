import { Link } from "react-router-dom";

const carouselItemTemplate = (item) => {
  return (
    <div className="flex items-center justify-center dark:bg-[#18191A] rounded-3xl lg:h-[550px] h-[350px] z-0 relative font-[helvetica]">
      <img
        className="h-full w-full rounded-3xl shadow-md"
        src={`https://img.otruyenapi.com/uploads/comics/${item?.thumb_url}`}
      />
      <Link
        to={`/truyen-tranh/${item.slug}`}
        className="absolute md:w-11/12 w-full h-full"
      >
        <div className="grid grid-cols-12 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl shadow-lg top-14 relative">
          <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 3xl:col-span-3 md:flex hidden justify-center items-center">
            <img
              src={`https://img.otruyenapi.com/uploads/comics/${item?.thumb_url}`}
              className="rounded-xl w-[200px] h-[300px] border-4 bg-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-8 3xl:col-span-9 flex flex-col gap-y-2 h-full dark:bg-[#18191abb] rounded-lg border p-2">
            <span className="flex-wrap flex">
              <h1 className="md:text-left  font-sansII text-lg text-left dark:text-blue-600 text-orange-600 uppercase font-bold">
                {item?.name ?? "Undefined"}
              </h1>
            </span>
            <span className="font-normal text-base font-sansII w-fit rounded-lg text-black bg-gradient-to-br from-sky-400 to-blue-700 px-2 dark:text-white">
              Chapter:{" "}
              {item.chaptersLatest && item.chaptersLatest[0]
                ? item.chaptersLatest[0].chapter_name
                : "Loading..."}{" "}
            </span>
            <div className="w-full h-px my-2 bg-gradient-to-l from-slate-200 via-ophim-border to-yellow-200"></div>

            <div>
              <span className="font-semibold text-lg  font-sansII dark:text-blue-600 text-orange-600">
                Tác giả:{" "}
              </span>
              <span className="text-base font-sansII  font-medium text-white mr-1">
                {item?.author ?? "Đang cập nhật"}
              </span>
            </div>
            <div className="flex items-end">
              <span className="font-semibold text-lg  font-sansII dark:text-blue-600 text-orange-600 mr-2 whitespace-nowrap">
                Thể loại:
              </span>
              <div className="flex gap-1 flex-wrap">
                {item?.category?.map((category) => (
                  <Link
                    to={`/the-loai/${category.slug}`}
                    key={category.slug}
                    className="px-2 dark:text-white font-sansII text-black font-thin text-base  bg-blue-500 hover:grayscale cursor-pointer whitespace-nowrap rounded-md"
                  >
                    {category.name}
                  </Link>
                )) ?? "Undefined"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default carouselItemTemplate;
