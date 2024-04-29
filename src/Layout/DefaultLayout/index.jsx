import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { Link, useLocation } from "react-router-dom";

//icon
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import SettingsIcon from "@mui/icons-material/Settings";
import EuroIcon from "@mui/icons-material/Euro";
import Face6Icon from "@mui/icons-material/Face6";
//compoent
import Drawer from "@mui/material/Drawer";
import Header from "../../Components/Header";

const DefaultLayout = ({ children }) => {
  const location = useLocation();
  const scrollRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Khởi tạo activeTab từ URL
  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/")[2] || "Home"
  );

  useEffect(() => {
    const currentTab = location.pathname.split("/")[2] || "Home";
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location]);

  // Lưu trạng thái mới của activeTab vào localStorage
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
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
    <div ref={scrollRef} className=" w-full h-full">
      <Header className="w-full   bg-white" />
      <div className="w-full h-12 lg:px-32 px-4 bg-orange-500 dark:bg-[#242526] lg:block flex items-center justify-start">
        <nav className="w-full h-full lg:flex  items-center hidden   ">
          <ul className="list-none h-12  flex   items-center font-['Lato']  text-white ">
            <Link
              to="/Home"
              className="hover:bg-orange-400 p-[10px] cursor-pointer text-lg  font-['Lato'] "
            >
              {" "}
              Home
            </Link>
            <Link
              to="/danh-sach/the-loai"
              className="hover:bg-orange-400  p-[10px]  cursor-pointer text-lg  font-['Lato'] "
            >
              Category
            </Link>
            <Link
              to="/danh-sach/truyen-moi"
              className="hover:bg-orange-400  p-[10px]  cursor-pointer text-lg  font-['Lato'] "
            >
              {" "}
              Truyện mới
            </Link>
            <Link
              to="/danh-sach/dang-phat-hanh"
              className="hover:bg-orange-400 p-[10px] cursor-pointer text-lg  font-['Lato'] "
            >
              {" "}
              Đang phát hành
            </Link>
            <Link
              to="/danh-sach/the-loai"
              className="hover:bg-orange-400  p-[10px]  cursor-pointer text-lg  font-['Lato'] "
            >
              Category
            </Link>
            <Link
              to="/danh-sach/truyen-moi"
              className="hover:bg-orange-400  p-[10px]  cursor-pointer text-lg  font-['Lato'] "
            >
              {" "}
              Truyện mới
            </Link>
          </ul>
        </nav>
        {!isLargeScreen && (
          <MenuIcon
            fontSize="25px"
            color="orange"
            className="inline-block text-white  text-[25px] border-black   m-1"
            onClick={handleDrawerOpen}
          />
        )}
      </div>
      <div className="w-full  flex lg:flex-row ">
        <div className=" lg:px-32 px-4 w-full   bg-white dark:bg-[#18191A] min-h-screen">
          {children}
        </div>
      </div>
      <Drawer
        className="w-full max-h-fit fixed left-0 right-0 top-0"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <div className=" h-full min-h-fit max-h-full w-full   z-[99999px]   bg-orange-600">
          {/* Menu for manga */}
          <div className=" h-[250px]  w-full mt-20  px-5">
            <div className="text-gray-50 text-opacity-50 text-lg font-bold font-['Lato'] tracking-wide px-2">
              Menu -
            </div>
            <div className="w-full h-[280px]  ">
              <Link
                to="/Home"
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${
                  activeTab === "Home" ? "bg-black" : ""
                }  cursor-pointer  hover:bg-black item my-1 transition duration-300`}
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
                  activeTab === "the-loai" ? "bg-black" : ""
                }  cursor-pointer  hover:bg-black item my-1 transition duration-300`}
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
                  activeTab === "truyen-moi" ? "bg-black" : ""
                }  cursor-pointer  hover:bg-black item my-1 transition duration-300`}
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
                  activeTab === "dang-phat-hanh" ? "bg-black" : ""
                }  cursor-pointer  hover:bg-black item my-1 transition duration-300`}
                onClick={() => handleTabClick("dang-phat-hanh")}
              >
                <span className="mr-2 flex items-center">
                  <WhatshotIcon />
                </span>{" "}
                Đang phát hành
              </Link>
              <div
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${
                  activeTab === "Sắp ra mắt" ? "bg-black" : ""
                }  cursor-pointer  hover:bg-black item my-1 transition duration-300`}
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
          <div className=" h-[200px]  w-full mt-10 px-5">
            <div className="text-gray-50 text-opacity-50 text-lg font-bold font-['Lato'] tracking-wide px-2">
              General -
            </div>
            <div className="w-full h-[148px]  ">
              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide  cursor-pointer  hover:bg-black transition duration-300">
                <span className="mr-2 flex items-center">
                  <SettingsIcon />
                </span>{" "}
                Settings
              </div>

              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide  cursor-pointer  hover:bg-black transition duration-300">
                <span className="mr-2 flex items-center">
                  <EuroIcon />
                </span>{" "}
                Donate
              </div>

              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide  cursor-pointer  hover:bg-black transition duration-300">
                <span className="mr-2 flex items-center">
                  <Face6Icon />
                </span>{" "}
                Sign in
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
