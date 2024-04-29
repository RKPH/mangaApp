import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const Header = () => {
  const location = useLocation();

  // Khởi tạo activeTab từ URL
  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/")[2] || "Home"
  );
  const scrollRef = useRef(null);
  useEffect(() => {
    const currentTab = location.pathname.split("/")[2] || "Home";
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location, activeTab]);
  const initialTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(initialTheme);
  // Lưu trạng thái theme vào localStorage
  useEffect(() => {
    // Save theme to local storage
    localStorage.setItem("theme", theme);
    console.log("theme change");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const HandleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const iconColor = theme === "dark" ? "black" : "white";
  return (
    <header
      ref={scrollRef}
      className="w-full  h-20 bg-[whitesmoke] dark:bg-[#18191A] lg:px-32 px-4 shadow-lg border-b-2 border-black flex flex-row items-center "
    >
      {/* // This is the left side of the header */}
      <div className="w-1/2 h-full     flex items-center ">
        <div className="w-full h-full flex items-center  flex-row">
          <Link to="/" className="flex flex-row">
            <span className="text-slate-400 dark:text-white  lg:text-[40px] text-lg font-normal m-1">
              Yuki
            </span>

            <span className="w-[27.61px]  text-black dark:text-white lg:text-[40px] text-lg flex items-center  font-extrabold ">
              雪
            </span>
          </Link>
        </div>
      </div>
      <div className="w-1/2 h-full    flex items-center justify-end ">
        <div className="hidden lg:flex items-center justify-evenly w-[417px]  h-12 lg:ml-5 lg:mr-5 ">
          <div
            className="rounded-full cursor-pointer border mx-4 border-orange-500 dark:border-white"
            onClick={HandleTheme}
          >
            <LightbulbIcon
              fontSize="80px"
              className="text-[38px] text-orange-500 dark:text-white p-2 "
              color="orange"
            />
          </div>
          <form className="w-[390px] h-full relative ">
            <input
              type="text"
              className="w-full  h-full pl-8 pr-14 py-3  rounded-3xl  border border-black dark:text-white dark:bg-[#3A3B3C] focus:outline-none focus:border-black"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="absolute right-0 top-0 w-[50px] h-full rounded-r-3xl bg-blue dark:text-white hover:bg-slate-300 z-50 "
            >
              <SearchIcon />
            </button>
          </form>
        </div>

        <button className=" w-12 p-1 lg:w-[108px] lg:h-12 h-10 text-center text-gray-50  lg:text-base text-[10px] bg-orange-500 dark:bg-[#3F94D5] font-semibold font-['Lato'] lg:mr-5 mr-2 rounded-md hover:opacity-35">
          Log in
        </button>
        <button className="w-12 p-1 lg:w-[108px] border dark:border-none lg:h-12 h-10 text-center text-stone-900 dark:text-white lg:text-base text-[10px]  font-semibold dark:bg-[#3F94D5] font-['Lato']   rounded-md hover:border-2 hover:border-black">
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
