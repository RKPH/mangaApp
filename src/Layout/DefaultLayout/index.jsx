import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
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
import FooterComponent from "../../Components/Footer";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/themes/light.css";

const DefaultLayout = ({ children }) => {
  const location = useLocation();
  const scrollRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Khởi tạo activeTab từ URL
  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/")[2] || "Home"
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const currentTab = location.pathname.split("/")[2] || "Home";
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location]);
  const [domain, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://otruyenapi.com/v1/api/the-loai"
        );
        setCategories(response.data.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Lưu trạng thái mới của activeTab vào localStorage
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsDrawerOpen(false);
  };
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  let timeoutId;
  return (
    <div ref={scrollRef} className=" w-full h-full">
      <Header className="w-full   bg-white" />
      <div className="w-full h-12 lg:px-32 px-4 bg-orange-500 dark:bg-[#242526] lg:block flex items-center justify-start">
        <nav className="w-full h-full lg:flex  items-center hidden  ">
          <ul className="list-none h-12  flex   items-center font-['Lato'] gap-x-2  text-white ">
            <Link
              to="/Home"
              className="hover:bg-orange-400 p-[10px] cursor-pointer text-lg  font-['Lato'] "
            >
              {" "}
              Home
            </Link>
            <Tippy
              interactive
              visible={isDropdownVisible}
              arrow={true}
              placement="bottom-end"
              onMouseEnter={() => {
                clearTimeout(timeoutId);
                setDropdownVisible(true);
              }}
              onClickOutside={() => setDropdownVisible(false)}
              render={(attrs) => (
                <div
                  onMouseEnter={() => {
                    clearTimeout(timeoutId);
                    setDropdownVisible(true);
                  }}
                  onMouseLeave={() => setDropdownVisible(false)}
                  className="min-w-[500px] min-h-[400px] dark:bg-[#242426] bg-orange-500"
                >
                  <div className="grid grid-cols-6 gap-4  py-10 px-5 border border-white">
                    {domain.map((category) => (
                      <Link
                        to={`/the-loai/${category.slug}`}
                        key={category._id}
                        className="hover:opacity-60"
                      >
                        <div>
                          <h1
                            onClick={() => setDropdownVisible(false)}
                            className=" font-semibold text-base"
                          >
                            {category.name}
                          </h1>
                        </div>

                        {/* Adjust the font size */}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            >
              <Link
                onMouseOut={() =>
                  (timeoutId = setTimeout(() => {
                    setDropdownVisible(false);
                  }, 500))
                }
                onMouseOver={() => {
                  clearTimeout(timeoutId);
                  setDropdownVisible(true);
                }}
                to="/danh-sach/the-loai"
                className="hover:bg-orange-400  p-[10px]  cursor-pointer text-lg  font-['Lato'] "
              >
                Category
              </Link>
            </Tippy>

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
              to="/danh-sach/hoan-thanh"
              className="hover:bg-orange-400  p-[10px]  cursor-pointer text-lg  font-['Lato'] "
            >
              Hoàn thành
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
        <div className=" lg:px-32 px-2 w-full   bg-white dark:bg-[#18191A] min-h-screen">
          {children}
        </div>
      </div>
      <FooterComponent />
      <Drawer
        className="w-full max-h-fit fixed left-0 right-0 top-0"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <div className=" h-full min-h-fit max-h-full w-full   z-[99999px]   bg-orange-600 dark:bg-[#242526]">
          {/* Menu for manga */}
          <div className=" h-[250px]  w-full mt-20  px-5">
            <div className="text-gray-50 text-opacity-50 text-lg font-bold font-['Lato'] tracking-wide px-2">
              Menu -
            </div>
            <div className="w-full h-[280px]  ">
              <Link
                to="/Home"
                className={`h-12 w-full flex items-center flex-wrap  px-2 text-gray-50 text-lg font-bold font-['Lato'] overflow-ellipsis whitespace-nowrap tracking-wide ${
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
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] overflow-ellipsis whitespace-nowrap tracking-wide ${
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
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] overflow-ellipsis whitespace-nowrap tracking-wide ${
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
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] overflow-ellipsis whitespace-nowrap tracking-wide ${
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
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] overflow-ellipsis whitespace-nowrap tracking-wide ${
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
              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] overflow-ellipsis whitespace-nowrap tracking-wide  cursor-pointer  hover:bg-black transition duration-300">
                <span className="mr-2 flex items-center">
                  <SettingsIcon />
                </span>{" "}
                Settings
              </div>

              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide  cursor-pointer overflow-ellipsis whitespace-nowrap hover:bg-black transition duration-300">
                <span className="mr-2 flex items-center">
                  <EuroIcon />
                </span>{" "}
                Donate
              </div>

              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide  cursor-pointer overflow-ellipsis whitespace-nowrap hover:bg-black transition duration-300">
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
