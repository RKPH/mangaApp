import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/themes/light.css";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ handleDrawerOpen }) => {
  const location = useLocation();

  // Khởi tạo activeTab từ URL

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const getPathSegment = (path) => {
    const segments = path.split("/");
    return segments.length > 2 ? segments[2] : segments[1];
  };

  const [activeTab, setActiveTab] = useState(
    getPathSegment(location.pathname) || "Home"
  );

  useEffect(() => {
    const currentTab = getPathSegment(location.pathname) || "Home";
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location]);

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
  };

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  let timeoutId;

  return (
    <div className="w-full h-12 sticky top-20 z-10 shadow-xl xl:px-32 px-4 bg-orange-500 dark:bg-[#242526] xl:block flex items-center justify-start">
      <nav className="w-full h-full xl:flex  font-sansII font-semibold items-center hidden text-base">
        <ul className="list-none h-12 flex font-semibold items-center  text-white ">
          <Link
            to="/Home"
            className={`dark:hover:bg-blue-500  hover:bg-orange-400 ${
              activeTab == "Home" ? "dark:bg-blue-500 bg-orange-400" : ""
            } p-[12px] cursor-pointer text-base flex items-center justify-center gap-1 uppercase`}
            onClick={() => handleTabClick("Home")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3.5}
              stroke="currentColor"
              className="w-5 h-5 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Trang chủ
          </Link>
          <Tippy
            interactive
            visible={isDropdownVisible}
            placement="bottom-end"
            onMouseEnter={() => {
              clearTimeout(timeoutId);
              setDropdownVisible(true);
            }}
            onClickOutside={() => setDropdownVisible(false)}
            render={() => (
              <div
                onMouseEnter={() => {
                  clearTimeout(timeoutId);
                  setDropdownVisible(true);
                }}
                onMouseLeave={() => setDropdownVisible(false)}
                className="min-w-[400px] h-[500px] overflow-auto dark:bg-[#242426] bg-orange-500 rounded-3xl border border-white shadow-md top-0"
              >
                <div className="grid grid-cols-3 gap-2 p-5">
                  {categories.map((category) => (
                    <Link
                      to={`/the-loai/${category.slug}`}
                      key={category._id}
                      className="hover:opacity-60"
                    >
                      <div>
                        <h4
                          onClick={() => setDropdownVisible(false)}
                          className="font-semibold text-base font-sansII"
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
              className="dark:hover:bg-blue-500 hover:bg-orange-400 p-[12px] cursor-pointer text-base uppercase font-sansII"
            >
              Category
            </li>
          </Tippy>

          <Link
            to="/danh-sach/truyen-moi"
            className={`dark:hover:bg-blue-500 font-sansII  hover:bg-orange-400 ${
              activeTab == "truyen-moi" ? "dark:bg-blue-500 bg-orange-400" : ""
            } p-[12px] cursor-pointer text-base flex items-center justify-center gap-1 uppercase`}
            onClick={() => handleTabClick("truyen-moi")}
          >
            Truyện mới
          </Link>
          <Link
            to="/danh-sach/dang-phat-hanh"
            className={`dark:hover:bg-blue-500  hover:bg-orange-400 ${
              activeTab == "dang-phat-hanh"
                ? "dark:bg-blue-500 bg-orange-400"
                : ""
            } p-[12px] cursor-pointer text-base flex items-center font-sansII justify-center gap-1 uppercase`}
            onClick={() => handleTabClick("dang-phat-hanh")}
          >
            Đang phát hành
          </Link>
          <Link
            to="/danh-sach/hoan-thanh"
            className={`dark:hover:bg-blue-500 font-sansII  hover:bg-orange-400 ${
              activeTab == "hoan-thanh" ? "dark:bg-blue-500 bg-orange-400" : ""
            } p-[12px] cursor-pointer text-base flex items-center justify-center gap-1 uppercase`}
            onClick={() => handleTabClick("hoan-thanh")}
          >
            Hoàn thành
          </Link>
          <Link
            to="/gacha"
            className={`dark:hover:bg-blue-500 font-sansII hover:bg-orange-400 ${
              activeTab == "gacha" ? "dark:bg-blue-500 bg-orange-400" : ""
            } p-[12px] cursor-pointer text-base flex items-center justify-center gap-1 uppercase`}
            onClick={() => handleTabClick("gacha")}
          >
            Vòng quay
          </Link>
        </ul>
      </nav>
      {!isLargeScreen && (
        <MenuIcon
          fontSize="25px"
          color="orange"
          className="inline-block xl:hidden text-white text-[25px] border-black m-1"
          onClick={handleDrawerOpen}
        />
      )}
    </div>
  );
};

Navbar.propTypes = {
  handleDrawerOpen: PropTypes.func.isRequired,
};

export default Navbar;
