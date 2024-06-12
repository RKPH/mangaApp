import { useState, useEffect, useRef } from "react";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../Redux/authSlice";
//icon
import SearchIcon from "@mui/icons-material/Search";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Logo from "../../assets/OIG4.png";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
//Components
import Tippy from "@tippyjs/react/headless";
import "tippy.js/themes/light.css";
import Divider from "@mui/material/Divider";

const Header = () => {
  const location = useLocation();
  // Khởi tạo activeTab từ URL
  const User = useSelector((state) => state.user.user);
  console.log("user in userSlcie: ", User);
  const [inputValue, setInputValue] = useState("");
  const initialTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(initialTheme);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/")[2] || "Home"
  );
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

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
      className="w-full  h-20 bg-[whitesmoke] dark:bg-[#18191A] xl:px-32 px-4 shadow-lg border-b-2 border-black flex flex-row items-center z-0 font-mono "
    >
      {/* // This is the left side of the header */}
      <div className="w-1/2 h-full     flex items-center ">
        <div className="w-full h-full flex items-center  flex-row">
          <Link to="/" className="flex flex-row  gap-x-1 items-center">
            <img
              src={Logo}
              alt=""
              className="h-12 w-12 rounded-t-3xl border border-white"
            />
            <div className="flex flex-col">
              <span className="text-slate-400 lg:inline hidden dark:text-white  text-2xl font-bold">
                Iceycure
              </span>
              <span className="text-slate-400 lg:inline hidden dark:text-white  text-sm font-momo">
                Đọc mọi lúc mọi nơi
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-1/2 h-full    flex items-center justify-end ">
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
              className="w-full  h-full pl-8 pr-14   p-3 rounded-md  border border-black dark:text-white dark:bg-[#3A3B3C] focus:outline-none focus:border-black"
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
                <div className=" w-fit min-h-fit bg-[#161618]  py-4 shadow-lg rounded-lg ">
                  <div className="flex flex-row items-center gap-x-2 px-4 my-4">
                    <img
                      onClick={() => setDropdownVisible(!isDropdownVisible)}
                      src={User?.avatar}
                      className="h-[30px] w-[30px] lg:w-[34px] lg:h-[34px] border border-white rounded-full"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <Link
                        onClick={() => {
                          setDropdownVisible(!isDropdownVisible);
                        }}
                        to="/me"
                        className="text-white lg:text-base text-sm font-semibold hover:underline"
                      >
                        {User?.userName}
                      </Link>
                      <div className="flex flex-row gap-1 text-xs lg:text-base  text-white">
                        <span className="lg:text-base text-xs">
                          số dư tài khoản: 0
                        </span>
                        <span className="lg:text-base text-xs">số điểm: 0</span>
                      </div>
                    </div>
                  </div>
                  <Divider color="white" className="text-white  w-full" />
                  <Link
                    to="/library"
                    onClick={() => {
                      setDropdownVisible(!isDropdownVisible);
                    }}
                    className="flex flex-row items-center gap-x-2 px-4 lg:text-base text-sm  hover:bg-slate-300 p-4"
                  >
                    <span className="text-white text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="lg:w-7 lg:h-7 w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </span>

                    <span className="text-white lg:text-base text-sm ">
                      Thư viện của bạn
                    </span>
                  </Link>

                  <div
                    onClick={() => {
                      navigate("/");
                      setDropdownVisible(false);
                      dispatch(logoutSuccess());
                    }}
                    className="flex flex-row items-center gap-x-2 px-4  hover:bg-slate-300 p-4 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="lg:w-7 lg:h-7 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>

                    <span className="text-white lg:text-base text-sm ">
                      Đăng xuất
                    </span>
                  </div>
                </div>
              )}
            >
              <img
                onClick={() => setDropdownVisible(!isDropdownVisible)}
                src={User?.avatar}
                className="xl:h-[32px] xl:w-[32px] 2xl:w-[35px] 2xl:h-[35px] 3xl:h-10 3xl:w-10 md:h-12 md:w-12 xs:h-8 xs:w-8 h-12 w-12 rounded-full border-2 border-white "
                alt=""
              />
            </Tippy>
            <button
              onClick={handleLogout}
              className=" hidden xl:block 2xl:block 3xl:block  p-2 w-[60px] 3xl:w-[80px] text-center text-gray-50 3xl:text-sm  lg:text-[12px] text-[12px] bg-orange-500 dark:bg-[#3F94D5] font-semibold font-['Lato']  rounded-md hover:opacity-35"
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
