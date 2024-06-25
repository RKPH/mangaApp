import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Slider from "react-slick";

import { Card } from "primereact/card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,

  slidesToShow: 8,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        dots: false,
      },
    },
    {
      breakpoint: 350,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        dots: false,
      },
    },
  ],
};

const Sliders = ({ data }) => {
  const [datas, setData] = useState([]);
  const domain = "https://otruyenapi.com/uploads/comics/";

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  return (
    <div className="w-full ">
      <Slider autoplay={true} className="dark:text-white" {...settings}>
        {datas.length === 0
          ? Array(24)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="shadow-md rounded hover:scale-105 transition duration-300 p-2"
                >
                  <div className="h-[200px] xs:h-[200px] sm:h-[200px] lg:h-[220px] 2xl:h-[220px] 3xl:h-[220px] w-full">
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
          : datas.map((item, index) => (
              <div key={index} className="p-2">
                <Card
                  className=" rounded lg:hover:scale-110 transition duration-300 "
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
                      className="h-[200px] xs:h-[200px] sm:h-[200px] lg:h-[220px] 2xl:h-[220px] 3xl:h-[220px] w-full rounded-md relative"
                    />
                    <div className="py-2">
                      <h5 className="overflow-hidden text-left my-1 text-lg font-normal overflow-ellipsis whitespace-nowrap dark:text-white font-sansII">
                        {item.name ? item.name : item.mangaName}
                      </h5>
                      {item.chaptersLatest && (
                        <span className="font-thin text-base text-red-600 font-sansII">
                          Chương:{" "}
                          {item.chaptersLatest[0]
                            ? item.chaptersLatest[0].chapter_name
                            : "???"}
                        </span>
                      )}
                    </div>
                  </Link>
                </Card>
              </div>
            ))}
      </Slider>
    </div>
  );
};

Sliders.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      thumb_url: PropTypes.string,
      name: PropTypes.string,
      mangaImage: PropTypes.string,
      chaptersLatest: PropTypes.arrayOf(
        PropTypes.shape({
          chapter_name: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default Sliders;
