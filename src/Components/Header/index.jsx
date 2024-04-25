import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useState, useEffect , useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SettingsIcon from '@mui/icons-material/Settings';
import EuroIcon from '@mui/icons-material/Euro';
import Face6Icon from '@mui/icons-material/Face6';


const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  // Khởi tạo activeTab từ URL
  const [activeTab, setActiveTab] = useState(location.pathname.split('/')[2] || 'Home');
  const scrollRef = useRef(null);
  useEffect(() => {
    const currentTab = location.pathname.split('/')[2] || 'Home';
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location]);

  // Lưu trạng thái mới của activeTab vào localStorage
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsDrawerOpen(false);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  };
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <header className="w-full h-20 bg-[whitesmoke] shadow-lg border-b-2 border-black flex flex-row items-center fixed top-0 left-0 right-0 z-[9999px]">
      {/* // This is the left side of the header */}
      <div className="w-1/2 h-full  pl-4  lg:pl-16 flex items-center">
        <div className="w-full h-full flex items-center   flex-row">
          {!isLargeScreen && (
            <MenuIcon
              fontSize="40px"
              className="inline-block  text-[40px] border-black p-1 border-2 m-1 rounded-full"
              onClick={handleDrawerOpen}
            />
          )}
          <span className="text-slate-400 lg:text-[40px] text-lg font-normal m-1">
            Yuki
          </span>

          <span className="w-[27.61px]  text-black lg:text-[40px] text-lg flex items-center  font-extrabold m-1">
            雪
          </span>
        </div>
      </div>
      <div className="w-1/2 h-full lg:pr-16   flex items-center justify-center  px-2">
        <div className="hidden lg:block w-[417px]  h-12 lg:ml-5 lg:mr-5 ">
          <form className="w-full h-full relative ">
            <input
              type="text"
              className="w-full  h-full pl-8 pr-14 py-3  rounded-3xl  border border-black focus:outline-none focus:border-black"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="absolute right-0 top-0 w-[50px] h-full rounded-r-3xl bg-blue hover:bg-slate-300 z-50 "
            >
              <SearchIcon />
            </button>
          </form>
        </div>

        <button className=" w-[108px] h-12 text-center text-gray-50 text-base bg-cyan-800 font-semibold font-['Lato'] tracking-wide mr-5 rounded-md hover:opacity-35">
          Log in
        </button>
        <button className="w-[108px] h-12 text-center text-stone-900 text-base  font-semibold font-['Lato'] tracking-wide mr-5 rounded-md hover:border-2 hover:border-black">
          Sign up
        </button>
      </div>
      <Drawer
        className="w-full h-full"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <div className=" h-full  w-[250px]   bg-cyan-800 ">
          {/* Menu for manga */}
          <div className=" h-[250px]  w-full mt-20 px-5">
            <div className="text-gray-50 text-opacity-50 text-lg font-bold font-['Lato'] tracking-wide px-2">
              Menu -
            </div>
            <div className="w-full h-[280px]  ">
              <Link
                to="/Home"
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${
                  activeTab === "Home" ? "bg-red-200" : ""
                }  cursor-pointer  hover:bg-red-200 item my-1 transition duration-300`}
                onClick={() => {
                  localStorage.removeItem("currentPage");
                  handleTabClick("Home");
                }}
              >
                <span className="mr-2 flex items-center">
                  <HomeIcon />
                </span>{" "}
                Home
              </Link>

              <Link
                to="/danh-sach/the-loai"
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${
                  activeTab === "the-loai" ? "bg-red-200" : ""
                }  cursor-pointer  hover:bg-red-200 item my-1 transition duration-300`}
                onClick={() => {
                  localStorage.removeItem("currentPage");
                  handleTabClick("the-loai");
                }}
              >
                <span className="mr-2 flex items-center">
                  <CollectionsBookmarkIcon />
                </span>{" "}
                Discover comics
              </Link>

              <Link
                to="/danh-sach/truyen-moi"
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${
                  activeTab === "truyen-moi" ? "bg-red-200" : ""
                }  cursor-pointer  hover:bg-red-200 item my-1 transition duration-300`}
                onClick={() => handleTabClick("truyen-moi")}
              >
                <span className="mr-2 flex items-center">
                  <MenuBookIcon />
                </span>{" "}
                Truyen moi
              </Link>

              <Link
                to="/danh-sach/dang-phat-hanh"
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${
                  activeTab === "dang-phat-hanh" ? "bg-red-200" : ""
                }  cursor-pointer  hover:bg-red-200 item my-1 transition duration-300`}
                onClick={() => handleTabClick("dang-phat-hanh")}
              >
                <span className="mr-2 flex items-center">
                  <WhatshotIcon />
                </span>{" "}
                Đang phát hành
              </Link>
              <div
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${
                  activeTab === "Sắp ra mắt" ? "bg-red-200" : ""
                }  cursor-pointer  hover:bg-red-200 item my-1 transition duration-300`}
                onClick={() => handleTabClick("Sắp ra mắt")}
              >
                <span className="mr-2 flex items-center">
                  <NewReleasesIcon />
                </span>{" "}
                Sắp ra mắt
              </div>
            </div>
          </div>
          {/* Menu for setting */}
          <div className=" h-[300px]  w-full mt-10 px-5">
            <div className="text-gray-50 text-opacity-50 text-lg font-bold font-['Lato'] tracking-wide px-2">
              General -
            </div>
            <div className="w-full h-[148px]  ">
              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide  cursor-pointer  hover:bg-red-200 transition duration-300">
                <span className="mr-2 flex items-center">
                  <SettingsIcon />
                </span>{" "}
                Settings
              </div>

              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide  cursor-pointer  hover:bg-red-200 transition duration-300">
                <span className="mr-2 flex items-center">
                  <EuroIcon />
                </span>{" "}
                Donate
              </div>

              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide  cursor-pointer  hover:bg-red-200 transition duration-300">
                <span className="mr-2 flex items-center">
                  <Face6Icon />
                </span>{" "}
                Sign in
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
