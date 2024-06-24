import React from "react";
import PropTypes from "prop-types";
import Sliders from "../Slider";

const Hero = ({ data }) => {
  return (
    <div className="w-full flex flex-col  mb-10">
      <h2 className="md:text-xl text-lg  font-sansII dark:text-white text-black p-2 uppercase font-bold my-5 ">
        Truyện hay
      </h2>
      <Sliders data={data} />
    </div>
  );
};

Hero.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      thumb_url: PropTypes.string,
      name: PropTypes.string,
      chaptersLatest: PropTypes.arrayOf(
        PropTypes.shape({
          chapter_name: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default Hero;
