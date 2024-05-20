import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "primereact/card";
import "./index.css";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
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
        slidesToShow: 4,
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
        infinite: true,

        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        dots: false,
      },
    },

    {
      breakpoint: 350,
      settings: {
        slidesToShow: 1,
        infinite: true,
        slidesToScroll: 1,
        initialSlide: 2,
        dots: false,
      },
    },
  ],
};

const Sliders = ({ data }) => {
  const [datas, setData] = useState([]);
  const [domain, setDomain] = useState(
    "https://otruyenapi.com/uploads/comics/"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/the-loai/${data}?page=1`
        );
        setData(response.data.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);
  return (
    <div className="w-full px-2">
      <Slider {...settings}>
        {datas.length === 0
          ? [1, 1, 1, 1, 1].map(() => (
              <Skeleton
                key=""
                height={400}
                shape="rectangle"
                animation="wave"
              />
            ))
          : datas.map((item) => (
              <Card key={item?.name} className="rounded-2xl  shadow-md  border">
                <Link to={`/truyen-tranh/${item?.slug}`}>
                  <img
                    src={`${domain}/${item?.thumb_url}`}
                    alt={item?.slug}
                    className="h-[170px] lg:h-[200px] xl:h-[200px] 2xl:h-[150px] 3xl:h-[250px] w-full rounded-t-2xl"
                  />
                  <div className="p-2">
                    <h5 className="overflow-hidden text-left font-semibold overflow-ellipsis whitespace-nowrap dark:text-white">
                      {item?.name}
                    </h5>
                    <i
                      className="pi pi-tag p-mr-2"
                      style={{ color: "var(--green-500)" }}
                    />
                    <span className="font-normal uppercase rounded-lg text-white bg-gradient-to-br from-sky-400 to-blue-700 text-sm px-1 dark:text-white">
                      Chương:{" "}
                      {item.chaptersLatest && item.chaptersLatest[0]
                        ? item.chaptersLatest[0].chapter_name
                        : "??"}
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
      </Slider>
    </div>
  );
};
Sliders.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Sliders;
