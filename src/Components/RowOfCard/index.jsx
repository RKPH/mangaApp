import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addManga, saveMangas } from "../../Redux/MangaSlice"; // Import the action creator from your slice

import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { Skeleton } from "@mui/material";
const RowOfCard = ({ data }) => {
  const domain = "https://otruyenapi.com/uploads/comics/";
  const dispatch = useDispatch();
  const handleMangaClick = (manga) => {
    dispatch(addManga(manga));
    dispatch(saveMangas());
  };
  return (
    <div className="w-full my-10 grid grid-cols-2 s:grid-cols-3 xs:grid-cols-2 sm:grid-cols-4  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-5">
      {data.length === 0
        ? Array(24)
            .fill()
            .map((_, index) => (
              <div key={index} className="shadow-md rounded hover:scale-105">
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
        : data.map((item, index) => (
            <Card
              key={index}
              className=" lg:hover:scale-110 transition duration-300  "
              onClick={() => handleMangaClick(item)}
            >
              <Link to={`/truyen-tranh/${item.slug}`}>
                <img
                  src={`${
                    item?.thumb_url
                      ? `${domain}/${item.thumb_url}`
                      : item.mangaImage
                  }`}
                  alt={item.slug}
                  className="h-[200px] xs:h-[200px] sm:h-[200px] lg:h-[220px] 2xl:h-[220px] 3xl:h-[220px] w-full rounded-md"
                />
                <div className="py-2">
                  <h5 className="overflow-hidden text-left  text-lg  font-normal overflow-ellipsis whitespace-nowrap dark:text-white">
                    {item.name ? item.name : item.mangaName}
                  </h5>
                  {item.chaptersLatest ? (
                    <>
                      <i
                        className="pi pi-tag p-mr-2"
                        style={{ color: "var(--green-500)" }}
                      />
                      <span className="font-normal uppercase lg:text-sm text-xs rounded-lg text-white bg-gradient-to-br from-sky-400 to-blue-700 px-1 dark:text-white">
                        Chương:{" "}
                        {item.chaptersLatest[0]
                          ? item.chaptersLatest[0].chapter_name
                          : "???"}
                      </span>
                    </>
                  ) : null}
                </div>
              </Link>
            </Card>
          ))}
    </div>
  );
};
RowOfCard.propTypes = {
  data: PropTypes.array.isRequired,
};
export default RowOfCard;
