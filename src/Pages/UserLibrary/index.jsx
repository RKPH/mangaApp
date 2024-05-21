import { useDispatch } from "react-redux";
import { addManga } from "../../Redux/MangaSlice"; // Import the action creator from your slice
import { useUser } from "../../Service/User";

import { Link } from "react-router-dom";

import { Card } from "primereact/card";
import { BreadCrumb } from "primereact/breadcrumb";
const TruyenMoi = () => {
  const dispatch = useDispatch();

  const User = useUser();

  const items = [
    {
      label: "Đang phát hành",
      template: () => (
        <a className="text-primary font-semibold text-orange-500 dark:text-blue-400">
          Thư viện
        </a>
      ),
    },
  ];
  const home = { label: "Trang chủ", url: "/" };
  const handleMangaClick = (manga) => {
    dispatch(addManga(manga));
  };

  return (
    <div className="w-full  flex flex-col items-center  bg-white dark:bg-[#18191A] py-4 z-0">
      <div className=" bg-[whitesmoke] dark:bg-[#242526] lg:px-10 px-4 py-2">
        <BreadCrumb
          model={items}
          home={home}
          className="p-2 shadow-md  min-w-fit max-w-fit border lg:text-base text-sm dark:text-white rounded-md mb-5"
        />
        <h1 className="text-lg lg:text-3xl  text-orange-500 dark:text-blue-400 text-center my-5 mb-10">
          Library ({User?.userMangas.length})
        </h1>

        {/* row of cards */}
        <div className="w-full my-10 grid grid-cols-2 s:grid-cols-3 xs:grid-cols-2 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-7 gap-7">
          {User?.userMangas?.map((item) => (
            <Card
              key={item.name}
              className="rounded-2xl shadow-md hover:scale-105 border"
              onClick={() => handleMangaClick(item)}
            >
              <Link to={`/truyen-tranh/${item.slug}`}>
                <img
                  src={item.mangaImage}
                  alt={item.slug}
                  className="h-[150px] xs:h-[150px] sm:h-[200px] lg:h-[200px] 2xl:h-[170px] 3xl:h-[250px] w-full rounded-t-2xl"
                />
                <div className="p-2">
                  <h5 className="overflow-hidden text-left font-semibold overflow-ellipsis whitespace-nowrap dark:text-white">
                    {item.mangaName}
                  </h5>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TruyenMoi;
