import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import SearchIcon from "@mui/icons-material/Search";
//compoent
import Drawer from "@mui/material/Drawer";
import MemoizedHeader from "../../Components/Header";
import FooterComponent from "../../Components/Footer";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/themes/light.css";
import { ToastContainer } from "react-toastify"; // Import the ToastContainer
const DefaultLayout = ({ children }) => {
  const location = useLocation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
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
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  let timeoutId;
  return (
    <div ref={headerRef} className=" w-full h-full font-font-['Oswald']">
      <MemoizedHeader className="w-full sticky top-0  left-0 z-10  bg-white" />
      <ToastContainer
        autoClose={1000}
        closeOnClick={true}
        pauseOnHover={false}
        position="top-center"
      />
      <div className="w-full h-12 sticky top-20  z-10  xl:px-32 px-4 bg-orange-500 dark:bg-[#242526] xl:block flex items-center justify-start">
        <nav className="w-full h-full xl:flex font-font-['Oswald'] font-semibold items-center hidden   lg:text-lg text-base">
          <ul className="list-none h-12  flex  font-semibold items-center  gap-x-2  text-white ">
            <Link
              to="/Home"
              className="hover:bg-orange-400 p-[12px] cursor-pointer  lg:text-lg text-base flex items-center gap-1  uppercase "
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
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
                  className="min-w-[400px] min-h-fit dark:bg-[#242426] bg-orange-500 border-white"
                >
                  <div className="grid grid-cols-6 gap-x-2 p-5 border ">
                    {domain.map((category) => (
                      <Link
                        to={`/the-loai/${category.slug}`}
                        key={category._id}
                        className="hover:opacity-60"
                      >
                        <div>
                          <h4
                            onClick={() => setDropdownVisible(false)}
                            className=" font-semibold  lg:text-lg text-base"
                          >
                            {category.name}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            >
              <li
                onMouseOut={() =>
                  (timeoutId = setTimeout(() => {
                    setDropdownVisible(false);
                  }, 100))
                }
                onMouseOver={() => {
                  clearTimeout(timeoutId);
                  setDropdownVisible(true);
                }}
                className="hover:bg-orange-400 p-[12px]  cursor-pointer  lg:text-lg text-base  uppercase "
              >
                Category
              </li>
            </Tippy>

            <Link
              to="/danh-sach/truyen-moi"
              className="hover:bg-orange-400  p-[12px]  cursor-pointer  lg:text-lg text-base uppercase  "
            >
              {" "}
              Truyện mới
            </Link>
            <Link
              to="/danh-sach/dang-phat-hanh"
              className="hover:bg-orange-400 p-[12px] cursor-pointer  lg:text-lg text-base uppercase  "
            >
              {" "}
              Đang phát hành
            </Link>
            <Link
              to="/danh-sach/hoan-thanh"
              className="hover:bg-orange-400  p-[12px]  cursor-pointer  lg:text-lg text-base uppercase "
            >
              Hoàn thành
            </Link>
            <Link
              to="/gacha"
              className="hover:bg-orange-400  p-[12px]  cursor-pointer  lg:text-lg text-base uppercase "
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
            className="inline-block xl:hidden text-white  text-[25px] border-black   m-1"
            onClick={handleDrawerOpen}
          />
        )}
      </div>
      <div className="w-full  flex xl:flex-row ">
        <div className=" xl:px-32 lg:px-4  w-full   bg-white dark:bg-[#18191A] min-h-screen  ">
          {children}
        </div>
      </div>
      <FooterComponent />
      <Drawer
        anchor="top"
        className="w-full font-font-['Oswald'] max-h-fit fixed left-0 right-0 top-0 block xl:hidden"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <div className="h-full  w-full z-[99999px] bg-orange-600 dark:bg-[#242526] font-font-['Oswald']">
          {/* Menu for manga */}
          <div className="h-fit font-font-['Oswald'] w-full mt-5 px-5">
            <div className="w-full p-2 flex items-end justify-end dark:text-white text-black">
              <button onClick={handleDrawerClose}>close </button>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                navigate(`/result?q=${inputValue}`);
                setInputValue("");
              }}
              className="w-full 3xl:h-10 2xl:h-10 h-[30px] relative mb-5 "
            >
              <input
                value={inputValue}
                onChange={handleInputChange}
                type="text"
                className="w-full  h-full pl-8 pr-14   p-4 rounded-md  border border-black dark:text-white dark:bg-[#3A3B3C] focus:outline-none focus:border-black"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="absolute right-0 top-0 z-0 w-[50px] h-full rounded-r-md bg-blue dark:text-white hover:bg-slate-300 "
              >
                <SearchIcon />
              </button>
            </form>
            <div className="text-gray-50 text-opacity-50  font-bold font-font-['Oswald'] tracking-wide px-2  lg:text-lg text-base">
              Menu -
            </div>
            <div className="w-full  text-sm">
              <Link
                to="/Home"
                className={`h-12 w-full flex items-center flex-wrap px-2 text-gray-50 text-sm font-semibold overflow-ellipsis whitespace-nowrap font-font-['Oswald'] tracking-wide ${
                  activeTab === "Home" ? "bg-black" : ""
                } cursor-pointer hover:bg-black item my-1 transition duration-300`}
                onClick={() => {
                  handleTabClick("Home");
                }}
              >
                <span className="mr-2 flex items-center text-sm">
                  <HomeIcon style={{ fontSize: "0.875rem" }} />
                </span>{" "}
                <span className=" lg:text-lg text-base">Home</span>
              </Link>

              <Link
                to="/danh-sach/the-loai"
                className={`h-12 w-full flex items-center px-2 text-gray-50  lg:text-lg text-base font-semibold overflow-ellipsis whitespace-nowrap font-font-['Oswald'] tracking-wide ${
                  activeTab === "the-loai" ? "bg-black" : ""
                } cursor-pointer hover:bg-black item my-1 transition duration-300`}
                onClick={() => {
                  localStorage.removeItem("currentPage");
                  handleTabClick("the-loai");
                }}
              >
                <span className="mr-2 flex items-center  lg:text-lg text-base">
                  <CollectionsBookmarkIcon style={{ fontSize: "0.875rem" }} />
                </span>{" "}
                <span className=" lg:text-lg text-base">Discover comics</span>
              </Link>

              <Link
                to="/danh-sach/truyen-moi"
                className={`h-12 w-full flex items-center px-2 text-gray-50  lg:text-lg text-base font-semibold overflow-ellipsis whitespace-nowrap font-font-['Oswald'] tracking-wide ${
                  activeTab === "truyen-moi" ? "bg-black" : ""
                } cursor-pointer hover:bg-black item my-1 transition duration-300`}
                onClick={() => handleTabClick("truyen-moi")}
              >
                <span className="mr-2 flex items-center  lg:text-lg text-base">
                  <MenuBookIcon style={{ fontSize: "0.875rem" }} />
                </span>{" "}
                <span className=" lg:text-lg text-base">Truyện mới</span>
              </Link>

              <Link
                to="/danh-sach/dang-phat-hanh"
                className={`h-12 w-full flex items-center px-2 text-gray-50  lg:text-lg text-base font-semibold overflow-ellipsis whitespace-nowrap font-font-['Oswald'] tracking-wide ${
                  activeTab === "dang-phat-hanh" ? "bg-black" : ""
                } cursor-pointer hover:bg-black item my-1 transition duration-300`}
                onClick={() => handleTabClick("dang-phat-hanh")}
              >
                <span className="mr-2 flex items-center  lg:text-lg text-base">
                  <WhatshotIcon style={{ fontSize: "0.875rem" }} />
                </span>{" "}
                <span className=" lg:text-lg text-base">Đang phát hành</span>
              </Link>
              <Link
                to="/danh-sach/hoan-thanh"
                className={`h-12 w-full flex items-center px-2 text-gray-50  lg:text-lg text-base font-semibold overflow-ellipsis whitespace-nowrap font-font-['Oswald'] tracking-wide ${
                  activeTab === "Hoàn thành" ? "bg-black" : ""
                } cursor-pointer hover:bg-black item my-1 transition duration-300`}
                onClick={() => handleTabClick("Hoàn thành")}
              >
                <span className="mr-2 flex items-center  lg:text-lg text-base">
                  <NewReleasesIcon style={{ fontSize: "0.875rem" }} />
                </span>{" "}
                <span className=" lg:text-lg text-base">Hoàn thành</span>
              </Link>
            </div>
          </div>
          {/* Menu for setting */}
          <div className="h-fit w-full  px-5">
            <div className="text-gray-50 text-opacity-50  lg:text-lg text-base font-bold tracking-wide font-font-['Oswald'] px-2">
              General -
            </div>
            <div className="w-full ">
              <Link className="h-12 w-full flex items-center px-2 text-gray-50  lg:text-lg text-base font-semibold overflow-ellipsis whitespace-nowrap tracking-wide font-font-['Oswald'] cursor-pointer my-1 hover:bg-black transition duration-300">
                <span className="mr-2 flex items-center lg:text-lg text-base">
                  <SettingsIcon style={{ fontSize: "0.875rem" }} />
                </span>{" "}
                Settings
              </Link>

              <div className="h-12 w-full flex items-center px-2 text-gray-50  lg:text-lg text-base font-semibold tracking-wide font-font-['Oswald'] cursor-pointer overflow-ellipsis whitespace-nowrap my-1 hover:bg-black transition duration-300">
                <span className="mr-2 flex items-center  lg:text-lg text-base">
                  <EuroIcon style={{ fontSize: "0.875rem" }} />
                </span>{" "}
                Donate
              </div>
              <Link
                to="/gacha"
                className={`h-12 w-full flex items-center px-2 text-gray-50  lg:text-lg text-base font-semibold overflow-ellipsis whitespace-nowrap font-font-['Oswald'] tracking-wide ${
                  activeTab === "gacha" ? "bg-black" : ""
                } cursor-pointer hover:bg-black item my-1 transition duration-300`}
                onClick={() => {
                  localStorage.removeItem("currentPage");
                  handleTabClick("gacha");
                }}
              >
                Vòng quay
              </Link>
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
