import { useState, useEffect, useRef } from "react";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../Redux/authSlice";
import SearchIcon from "@mui/icons-material/Search";
//icon
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import IconWebsite from "./svg";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
//Components
import Tippy from "@tippyjs/react/headless";
import "tippy.js/themes/light.css";
import Divider from "@mui/material/Divider";

//serviec
import { useUser } from "../../Service/User";

const Header = () => {
  const location = useLocation();
  // Khởi tạo activeTab từ URL
  const [inputValue, setInputValue] = useState("");
  const initialTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(initialTheme);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log("auth: ", auth);
  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/")[2] || "Home"
  );
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };
  const User = useUser();

  useEffect(() => {
    const currentTab = location.pathname.split("/")[2] || "Home";
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location, activeTab]);
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
  console.log("co bi render ko: ");
  const HandleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const handleLogout = () => {
    dispatch(logoutSuccess()); // Dispatch the logoutSuccess action when the Logout button is clicked
    navigate("/");
  };
  return (
    <header
      ref={headerRef}
      className="w-full  h-20 bg-[whitesmoke] dark:bg-[#18191A] xl:px-32 px-4 shadow-lg border-b-2 border-black flex flex-row items-center z-0 "
    >
      {/* // This is the left side of the header */}
      <div className="w-1/2 h-full     flex items-center ">
        <div className="w-full h-full flex items-center  flex-row">
          <Link to="/" className="flex flex-row items-center gap-x-1">
            <span className="text-slate-400 dark:text-white  text-2xl font-bold">
              Iceycure
            </span>
            <IconWebsite />
            <span className="w-[60px] h-[60px] text-3xl text-black dark:text-white  flex items-center  font-extrabold "></span>
          </Link>
        </div>
      </div>
      <div className="w-1/2 h-full    flex items-center justify-end py-2 ">
        <div className="hidden xl:flex items-center justify-evenly w-[417px]  h-12  ">
          <div
            className="rounded-full cursor-pointer border mx-4 border-orange-500 dark:border-white"
            onClick={HandleTheme}
          >
            <LightbulbIcon
              fontSize="80px"
              className="text-[30px]  text-orange-500 dark:text-white p-1 "
              color="orange"
            />
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              navigate(`/result?q=${inputValue}`);
              setInputValue("");
            }}
            className="w-[280px] 3xl:h-10 2xl:h-10 h-[30px] relative "
          >
            <input
              value={inputValue}
              onChange={handleInputChange}
              type="text"
              className="w-full  h-full pl-8 pr-14   rounded-md  border border-black dark:text-white dark:bg-[#3A3B3C] focus:outline-none focus:border-black"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="absolute right-0 top-0 z-0 w-[50px] h-full rounded-r-md bg-blue dark:text-white hover:bg-slate-300 "
            >
              <SearchIcon />
            </button>
          </form>
        </div>
        <div
          className="rounded-full cursor-pointer border mx-4 border-orange-500 xl:hidden block dark:border-white"
          onClick={HandleTheme}
        >
          <LightbulbIcon
            className="text-[30px]  text-orange-500 dark:text-white p-1"
            color="orange"
          />
        </div>
        {!auth.isAuthenticated ? (
          <div className="flex flex-row items-center gap-x-2 3xl:h-12 2xl:h-10  ">
            <Link to="/login">
              <button className="p-2 w-[60px] 3xl:w-[80px] text-center text-gray-50 3xl:text-sm  lg:text-[12px] text-[10px] bg-orange-500 dark:bg-[#3F94D5] font-semibold font-['Lato']  rounded-md hover:opacity-35">
                Log in
              </button>
            </Link>
            <Link to="/login">
              <button className="p-2 w-[60px] 3xl:w-[80px] text-center text-gray-50 3xl:text-sm  lg:text-[10px] text-[12px] bg-orange-500 dark:bg-[#3F94D5] font-semibold font-['Lato']  rounded-md hover:opacity-35">
                Sign up
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-x-2  3xl:h-10 2xl:h-8 ">
            <Tippy
              interactive={true}
              onClickOutside={() => setDropdownVisible(!isDropdownVisible)}
              visible={isDropdownVisible}
              placement="bottom-end"
              arrow={true}
              render={(attrs) => (
                <div className="w-[300px] min-h-fit bg-[#161618]  py-4 shadow-lg rounded-lg ">
                  <div className="flex flex-row items-center gap-x-2 px-4 my-4">
                    <img
                      onClick={() => setDropdownVisible(!isDropdownVisible)}
                      src={User?.avatar}
                      className="h-[25px] w-[25px] xl:w-[30px] xl:h-[30px] rounded-full"
                      alt=""
                    />
                    <Link to="/me" className="text-white">
                      {User?.userName}
                    </Link>
                  </div>
                  <Divider color="white" className="text-white  w-full" />
                  <div className="flex flex-row items-center gap-x-2 px-4 my-5">
                    <AutoStoriesIcon className="text-red-200 text-[30px] h-[50px]  rounded-full" />
                    <Link to="/library" className="text-white">
                      Thư viện của bạn
                    </Link>
                  </div>
                  <div className="flex flex-row items-center gap-x-2 px-4 my-5">
                    <AutoStoriesIcon className="text-white text-[30px] h-[50px]  rounded-full" />
                    <span className="text-white">Số dư tài khoản</span>
                  </div>
                  <div className="flex flex-row items-center gap-x-2 px-4 my-5">
                    <AutoStoriesIcon className="text-white text-[30px] h-[50px]  rounded-full" />
                    <span className="text-white">Thư viện của bạn</span>
                  </div>
                  <div className="flex flex-row items-center gap-x-2 px-4 my-5">
                    <AutoStoriesIcon className="text-white text-[30px] h-[50px]  rounded-full" />
                    <span className="text-white">Thư viện của bạn</span>
                  </div>
                </div>
              )}
            >
              <img
                onClick={() => setDropdownVisible(!isDropdownVisible)}
                src={User?.avatar}
                className="xl:h-[32px] xl:w-[32px] 2xl:w-[30px] 2xl:h-[30px] 3xl:h-10 3xl:w-10 md:h-12 md:w-12 h-8 w-8 rounded-full"
                alt=""
              />
            </Tippy>
            <button
              onClick={handleLogout}
              className=" hidden xl:block 2xl:block 3xl:block  p-2 w-[60px] 3xl:w-[80px] text-center text-gray-50 3xl:text-sm  lg:text-[10px] text-[12px] bg-orange-500 dark:bg-[#3F94D5] font-semibold font-['Lato']  rounded-md hover:opacity-35"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const MemoizedHeader = React.memo(Header);

export default MemoizedHeader;
