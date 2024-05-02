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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Khởi tạo activeTab từ URL
  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/")[2] || "Home"
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const currentTab = location.pathname.split("/")[2] || "Home";
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location, activeTab]);
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
    window.scrollTo(0, 0);
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
    <div ref={headerRef} className=" w-full h-full">
      <Header className="w-full   bg-white" />
      <div className="w-full h-12 lg:px-32 px-4 bg-orange-500 dark:bg-[#242526] lg:block flex items-center justify-start">
        <nav className="w-full h-full lg:flex  items-center hidden  ">
          <ul className="list-none h-12  flex   items-center  gap-x-2  text-white ">
            <Link
              to="/Home"
              className="hover:bg-orange-400 p-[10px] cursor-pointer text-lg   "
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
                className="hover:bg-orange-400  p-[10px]  cursor-pointer text-lg   "
              >
                Category
              </Link>
            </Tippy>

            <Link
              to="/danh-sach/truyen-moi"
              className="hover:bg-orange-400  p-[10px]  cursor-pointer text-lg   "
            >
              {" "}
              Truyện mới
            </Link>
            <Link
              to="/danh-sach/dang-phat-hanh"
              className="hover:bg-orange-400 p-[10px] cursor-pointer text-lg   "
            >
              {" "}
              Đang phát hành
            </Link>
            <Link
              to="/danh-sach/hoan-thanh"
              className="hover:bg-orange-400  p-[10px]  cursor-pointer text-lg   "
            >
              Hoàn thành
            </Link>
            <Link
              to="/danh-sach/truyen-moi"
              className="hover:bg-orange-400  p-[10px]  cursor-pointer text-lg   "
            >
              {" "}
              Vòng quay
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
        className="w-full max-h-fit fixed left-0 right-0 top-0 block lg:hidden"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <div className=" h-full min-h-fit max-h-full w-full   z-[99999px]   bg-orange-600 dark:bg-[#242526]">
          {/* Menu for manga */}
          <div className=" h-[280px]  w-full mt-20  px-5">
            <div className="text-gray-50 text-opacity-50 text-lg font-bold  tracking-wide px-2">
              Menu -
            </div>
            <div className="w-full h-[280px]  ">
              <Link
                to="/Home"
                className={`h-12 w-full flex items-center flex-wrap  px-2 text-gray-50  text-sm font-semibold  overflow-ellipsis whitespace-nowrap tracking-wide ${
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
                className={`h-12 w-full flex items-center  px-2 text-gray-50  text-sm font-semibold  overflow-ellipsis whitespace-nowrap tracking-wide ${
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
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-sm font-semibold overflow-ellipsis whitespace-nowrap tracking-wide ${
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
                className={`h-12 w-full flex items-center  px-2 text-gray-50 text-sm font-semibold  overflow-ellipsis whitespace-nowrap tracking-wide ${
                  activeTab === "dang-phat-hanh" ? "bg-black" : ""
                }  cursor-pointer  hover:bg-black item my-1 transition duration-300`}
                onClick={() => handleTabClick("dang-phat-hanh")}
              >
                <span className="mr-2 flex items-center">
                  <WhatshotIcon />
                </span>{" "}
                Đang phát hành
              </Link>
              <Link
                className={`h-12 w-full flex items-center px-2 text-gray-50 text-sm font-semibold  overflow-ellipsis whitespace-nowrap tracking-wide ${
                  activeTab === "Sắp ra mắt" ? "bg-black" : ""
                }  cursor-pointer  hover:bg-black item my-1 transition duration-300`}
                onClick={() => handleTabClick("Sắp ra mắt")}
              >
                <span className="mr-2 flex items-center">
                  <NewReleasesIcon />
                </span>{" "}
                Hoàn thành
              </Link>
            </div>
          </div>
          {/* Menu for setting */}
          <div className=" h-[250px]  w-full mt-10 px-5">
            <div className="text-gray-50 text-opacity-50 text-lg font-bold tracking-wide px-2">
              General -
            </div>
            <div className="w-full h-[200px]  ">
              <Link className="h-12 w-full flex items-center  px-2 text-gray-50 text-sm font-semibold  overflow-ellipsis whitespace-nowrap tracking-wide  cursor-pointer my-1 hover:bg-black transition duration-300">
                <span className="mr-2 flex items-center">
                  <SettingsIcon />
                </span>{" "}
                Settings
              </Link>

              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-sm font-semibold tracking-wide  cursor-pointer overflow-ellipsis whitespace-nowrap my-1 hover:bg-black transition duration-300">
                <span className="mr-2 flex items-center">
                  <EuroIcon />
                </span>{" "}
                Donate
              </div>
              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-sm font-semibold  overflow-ellipsis whitespace-nowrap tracking-wide  cursor-pointer my-1 hover:bg-black transition duration-300">
                <span className="mr-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 64 64"
                  >
                    <g id="a" />

                    <g id="b" />

                    <g id="c" />

                    <g id="d" />

                    <g id="e" />

                    <g id="f" />

                    <g id="g" />

                    <g id="h" />

                    <g id="i" />

                    <g id="j" />

                    <g id="k" />

                    <g id="l" />

                    <g id="m" />

                    <g id="n" />

                    <g id="o" />

                    <g id="p" />

                    <g id="q" />

                    <g id="r" />

                    <g id="s" />

                    <g id="t" />

                    <g id="u" />

                    <g id="v" />

                    <g id="w" />

                    <g id="x" />

                    <g id="y" />

                    <g id="a`" />

                    <g id="aa" />

                    <g id="ab" />

                    <g id="ac" />

                    <g id="ad" />

                    <g id="ae" />

                    <g id="af" />

                    <g id="ag" />

                    <g id="ah" />

                    <g id="ai" />

                    <g id="aj" />

                    <g id="ak" />

                    <g id="al" />

                    <g id="am" />

                    <g id="an" />

                    <g id="ao" />

                    <g id="ap" />

                    <g id="aq" />

                    <g id="ar" />

                    <g id="as" />

                    <g id="at" />

                    <g id="au" />

                    <g id="av" />

                    <g id="aw" />

                    <g id="ax">
                      <polygon
                        fill="#8fd7f8"
                        fillRule="evenodd"
                        points="50.65 49.78 50.65 41.19 31.32 37.7 13.35 41.19 13.35 49.78 30.44 53.38 50.65 49.78"
                      />

                      <path
                        d="M11.24,49.78H52.75c.95,0,1.73,.78,1.73,1.73v3.57c0,.95-.78,1.73-1.73,1.73H11.24c-.95,0-1.73-.77-1.73-1.73v-3.57c0-.95,.77-1.73,1.73-1.73Z"
                        fill="#d9f0f3"
                      />

                      <polygon
                        fill="#f0f3f5"
                        fillRule="evenodd"
                        points="44.87 54.62 44.87 47.14 31.24 45.39 19.13 47.14 19.13 54.62 32.81 56.21 44.87 54.62"
                      />

                      <path
                        d="M49.19,49.78c.96,0,1.73,.77,1.73,1.73v3.57c0,.96-.77,1.73-1.73,1.73h3.57c.96,0,1.73-.77,1.73-1.73v-3.57c0-.96-.77-1.73-1.73-1.73h-3.57Z"
                        fill="#b8e3ee"
                        fillRule="evenodd"
                      />

                      <path
                        d="M16.23,13c-4.22,4.2-6.58,9.86-6.6,15.77l6.61,15.76c4.17,4.2,9.84,6.58,15.76,6.61l15.77-6.6c4.22-4.19,6.58-9.85,6.6-15.77l-6.61-15.76c-4.17-4.2-9.84-6.58-15.76-6.61l-15.77,6.6Z"
                        fill="#8996a8"
                        fillRule="evenodd"
                      />

                      <path
                        d="M32,28.77H9.63c.03,5.92,2.41,11.59,6.61,15.76l15.76-15.76Z"
                        fill="#9fa9b6"
                        fillRule="evenodd"
                      />

                      <path
                        d="M32,28.77v22.37c5.93,0,11.62-2.36,15.81-6.56l-15.81-15.81Z"
                        fill="#9fa9b6"
                        fillRule="evenodd"
                      />

                      <path
                        d="M32,28.77h22.37c0-5.93-2.36-11.62-6.55-15.82l-15.82,15.82Z"
                        fill="#9fa9b6"
                        fillRule="evenodd"
                      />

                      <path
                        d="M32,5.93l-5.46,1.15c-3.91,1-7.48,3.04-10.33,5.91l15.78,15.78V5.93Z"
                        fill="#9fa9b6"
                        fillRule="evenodd"
                      />

                      <path
                        d="M44.5,16.34c-2.26-2.26-5.09-3.86-8.19-4.64h-4.31l-12.47,4.67c-3.32,3.31-5.19,7.79-5.21,12.47l5.22,12.46c3.3,3.32,7.77,5.2,12.45,5.22l12.49-5.18c3.32-3.31,5.18-7.81,5.18-12.5l-5.18-12.5Z"
                        fill="#e8a3c1"
                        fillRule="evenodd"
                      />

                      <path
                        d="M32,28.84H14.32c.02,4.68,1.9,9.16,5.22,12.46l12.45-12.46Z"
                        fill="#f0f3f5"
                        fillRule="evenodd"
                      />

                      <path
                        d="M32,28.84v17.68c4.69,0,9.18-1.87,12.49-5.18l-12.49-12.5Z"
                        fill="#f0f3f5"
                        fillRule="evenodd"
                      />

                      <path
                        d="M32,28.84h17.68c0-4.69-1.86-9.18-5.18-12.5l-12.5,12.5Z"
                        fill="#f0f3f5"
                        fillRule="evenodd"
                      />

                      <path
                        d="M32,11.7h-4.31c-3.09,.79-5.91,2.41-8.16,4.67l12.47,12.47V11.7Z"
                        fill="#f0f3f5"
                        fillRule="evenodd"
                      />

                      <path
                        d="M36.77,9.34c0,4.2-4.77,8.33-4.77,8.33,0,0-4.77-4.13-4.77-8.33,0-2.63,2.13-4.34,4.77-4.34s4.77,1.71,4.77,4.34Z"
                        fill="#f2d865"
                        fillRule="evenodd"
                      />

                      <path
                        d="M17.71,54.62h28.58c1.21,0,2.19,.98,2.19,2.19s-.98,2.19-2.19,2.19H17.71c-1.21,0-2.19-.98-2.19-2.19s.98-2.19,2.19-2.19Z"
                        fill="#e4ecf0"
                        fillRule="evenodd"
                      />

                      <path
                        d="M42.06,54.62c1.21,0,2.19,.98,2.19,2.19s-.98,2.19-2.19,2.19h4.23c1.21,0,2.19-.98,2.19-2.19s-.98-2.19-2.19-2.19h-4.23Z"
                        fill="#d9e3e9"
                        fillRule="evenodd"
                      />

                      <circle cx="32" cy="9.41" r="1" />

                      <path d="M11.24,57.81h3.48c.42,1.26,1.58,2.19,2.99,2.19h28.58c1.4,0,2.56-.93,2.99-2.19h3.48c1.5,0,2.73-1.22,2.73-2.73v-3.57c0-1.5-1.22-2.73-2.73-2.73h-1.1v-7.35c2.34-3.64,3.72-7.96,3.72-12.6,0-11.18-7.91-20.73-18.85-22.89-1.03-1.2-2.62-1.95-4.52-1.95s-3.49,.75-4.52,1.95c-10.94,2.16-18.85,11.71-18.85,22.89,0,4.64,1.38,8.96,3.72,12.6v7.34h-1.1c-1.5,0-2.73,1.22-2.73,2.73v3.57c0,1.51,1.22,2.73,2.73,2.73Zm35.04,.19H17.71c-.66,0-1.19-.53-1.19-1.19s.53-1.19,1.19-1.19h28.58c.66,0,1.19,.53,1.19,1.19s-.53,1.19-1.19,1.19ZM10.68,29.84h2.74c.24,4.39,1.98,8.36,4.74,11.43l-1.94,1.94c-3.25-3.57-5.3-8.23-5.54-13.36Zm20.32-11.73v8.32l-10.05-10.05c1.75-1.55,3.86-2.72,6.2-3.44,1.15,2.45,3.08,4.43,3.86,5.17Zm5.86-5.17c2.34,.71,4.44,1.89,6.2,3.44l-10.05,10.05v-8.32c.78-.74,2.7-2.72,3.86-5.17Zm10.92,30.26l-1.94-1.94c2.76-3.07,4.5-7.04,4.74-11.43h2.74c-.24,5.14-2.29,9.8-5.54,13.36Zm-14.78,6.95v-2.74c4.39-.24,8.35-1.98,11.43-4.74l1.94,1.94c-3.57,3.25-8.23,5.3-13.36,5.54Zm1.41-20.32h14.17c-.23,3.84-1.75,7.31-4.15,10.01l-10.02-10.01Zm8.6,11.43c-2.71,2.4-6.17,3.92-10.01,4.15v-14.16l10.01,10.01Zm-23.44-1.41c-2.4-2.71-3.92-6.18-4.15-10.01h14.17l-10.02,10.01Zm11.43-8.6v14.16c-3.84-.23-7.31-1.75-10.01-4.15l10.01-10.01Zm19.59-3.42c-.23-4.35-1.95-8.34-4.73-11.44l1.91-1.91c3.26,3.58,5.28,8.24,5.52,13.34h-2.69Zm-2,0h-14.17l10.03-10.03c2.42,2.73,3.92,6.22,4.15,10.03Zm-19.01,0H15.41c.23-3.81,1.73-7.3,4.15-10.03l10.03,10.03Zm-16.17,0h-2.69c.24-5.1,2.25-9.76,5.52-13.34l1.91,1.91c-2.78,3.1-4.5,7.08-4.73,11.44Zm6.17,14.84c3.07,2.76,7.04,4.5,11.43,4.74v2.74c-5.14-.24-9.79-2.29-13.36-5.54l1.94-1.94Zm.55,6.25c3.48,2.07,7.53,3.28,11.87,3.28s8.39-1.21,11.87-3.28v4.69H20.13v-4.69Zm33.35,2.58v3.57c0,.41-.32,.73-.73,.73h-3.48c-.42-1.26-1.58-2.19-2.99-2.19h-.42v-2.84h6.88c.41,0,.73,.32,.73,.73Zm-3.83-2.73h-3.78v-1.18c1.91-1.42,2.72-2.27,3.78-3.5v4.67Zm-3.3-35.7l-1.88,1.88c-1.95-1.76-4.31-3.07-6.93-3.89,.14-.57,.22-1.15,.22-1.73,0-.35-.04-.69-.1-1.01,3.31,.91,6.26,2.54,8.69,4.75Zm-14.36-7.08c2.22,0,3.77,1.37,3.77,3.34,0,2.81-2.53,5.71-3.77,6.95-1.23-1.24-3.77-4.14-3.77-6.95,0-1.97,1.55-3.34,3.77-3.34Zm-5.67,2.33c-.06,.33-.1,.66-.1,1.01,0,.58,.08,1.16,.22,1.73-2.62,.82-4.97,2.13-6.93,3.89l-1.88-1.88c2.43-2.21,5.38-3.84,8.69-4.75ZM14.35,44.11c1.17,1.35,1.96,2.14,3.78,3.5v1.18h-3.78v-4.67Zm-3.83,7.4c0-.41,.32-.73,.73-.73h6.88v2.84h-.42c-1.4,0-2.56,.93-2.99,2.19h-3.48c-.41,0-.73-.32-.73-.73v-3.57Z" />
                    </g>
                  </svg>
                </span>{" "}
                Vòng quay
              </div>
              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-sm font-semibold  tracking-wide  cursor-pointer overflow-ellipsis whitespace-nowrap my-1 hover:bg-black transition duration-300">
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
