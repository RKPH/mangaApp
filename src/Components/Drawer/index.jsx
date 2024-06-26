import PropTypes from "prop-types";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import SettingsIcon from "@mui/icons-material/Settings";
import EuroIcon from "@mui/icons-material/Euro";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
const Drawers = ({
  isDrawerOpen,
  handleDrawerClose,
  activeTab,
  handleTabClick,
}) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };
  return (
    <Drawer
      anchor="top"
      className="w-full  font-sansII max-h-fit fixed left-0 right-0 top-0 block xl:hidden "
      open={isDrawerOpen}
      onClose={handleDrawerClose}
    >
      <div className="h-full  w-full z-[99999px] bg-orange-600 dark:bg-[#242526] font-sansII">
        {/* Menu for manga */}
        <div className="h-fit  font-sansII w-full mt-5 px-5">
          <div className="w-full p-2 flex items-end justify-end dark:text-white text-black">
            <button onClick={handleDrawerClose}>close </button>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              navigate(`/result?q=${inputValue}`);
              setInputValue("");
            }}
            className="w-full h-[40px] relative mb-5 p-2 flex items-center justify-center dark:text-white text-black"
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
              onClick={handleDrawerClose}
              className="absolute right-0 top-0 z-0 w-[50px] h-full rounded-r-md bg-blue dark:text-white hover:bg-slate-300 "
            >
              <SearchIcon />
            </button>
          </form>
          <div className="text-gray-50 text-opacity-50  font-bold  font-sansII tracking-wide px-2   text-base">
            Menu -
          </div>
          <div className="w-full  text-sm">
            <Link
              to="/Home"
              className={`h-12 w-full flex items-center flex-wrap px-2 text-gray-50 text-sm font-semibold overflow-ellipsis whitespace-nowrap  font-sansII tracking-wide ${
                activeTab === "Home" ? "bg-black" : ""
              } cursor-pointer hover:bg-black item my-1 transition duration-300`}
              onClick={() => {
                handleTabClick("Home");
              }}
            >
              <span className="mr-2 flex items-center text-sm">
                <HomeIcon style={{ fontSize: "0.875rem" }} />
              </span>{" "}
              <span className=" text-base">Trang chủ</span>
            </Link>

            <Link
              to="/danh-sach/the-loai"
              className={`h-12 w-full flex items-center px-2 text-gray-50   text-base font-semibold overflow-ellipsis whitespace-nowrap  font-sansII tracking-wide ${
                activeTab === "the-loai" ? "bg-black" : ""
              } cursor-pointer hover:bg-black item my-1 transition duration-300`}
              onClick={() => {
                localStorage.removeItem("currentPage");
                handleTabClick("the-loai");
              }}
            >
              <span className="mr-2 flex items-center   text-base">
                <CollectionsBookmarkIcon style={{ fontSize: "0.875rem" }} />
              </span>{" "}
              <span className="  text-base">Thể loại</span>
            </Link>

            <Link
              to="/danh-sach/truyen-moi"
              className={`h-12 w-full flex items-center px-2 text-gray-50 text-base font-semibold overflow-ellipsis whitespace-nowrap  font-sansII tracking-wide ${
                activeTab === "truyen-moi" ? "bg-black" : ""
              } cursor-pointer hover:bg-black item my-1 transition duration-300`}
              onClick={() => handleTabClick("truyen-moi")}
            >
              <span className="mr-2 flex items-center   text-base">
                <MenuBookIcon style={{ fontSize: "0.875rem" }} />
              </span>{" "}
              <span className="text-base">Truyện mới</span>
            </Link>

            <Link
              to="/danh-sach/dang-phat-hanh"
              className={`h-12 w-full flex items-center px-2 text-gray-50   text-base font-semibold overflow-ellipsis whitespace-nowrap  font-sansII tracking-wide ${
                activeTab === "dang-phat-hanh" ? "bg-black" : ""
              } cursor-pointer hover:bg-black item my-1 transition duration-300`}
              onClick={() => handleTabClick("dang-phat-hanh")}
            >
              <span className="mr-2 flex items-center  text-base">
                <WhatshotIcon style={{ fontSize: "0.875rem" }} />
              </span>{" "}
              <span className="  text-base">Đang phát hành</span>
            </Link>
            <Link
              to="/danh-sach/hoan-thanh"
              className={`h-12 w-full flex items-center px-2 text-gray-50   text-base font-semibold overflow-ellipsis whitespace-nowrap  font-sansII tracking-wide ${
                activeTab === "Hoàn thành" ? "bg-black" : ""
              } cursor-pointer hover:bg-black item my-1 transition duration-300`}
              onClick={() => handleTabClick("Hoàn thành")}
            >
              <span className="mr-2 flex items-center   text-base">
                <NewReleasesIcon style={{ fontSize: "0.875rem" }} />
              </span>{" "}
              <span className="  text-base">Hoàn thành</span>
            </Link>
          </div>
        </div>
        {/* Menu for setting */}
        <div className="h-fit w-full  px-5">
          <div className="text-gray-50 text-opacity-50  text-base font-bold tracking-wide  font-sansII px-2">
            General -
          </div>
          <div className="w-full ">
            <Link className="h-12 w-full flex items-center px-2 text-gray-50  text-base font-semibold overflow-ellipsis whitespace-nowrap tracking-wide  font-sansII cursor-pointer my-1 hover:bg-black transition duration-300">
              <span className="mr-2 flex items-center text-base">
                <SettingsIcon style={{ fontSize: "0.875rem" }} />
              </span>{" "}
              Settings
            </Link>

            <div className="h-12 w-full flex items-center px-2 text-gray-50 text-base font-semibold tracking-wide  font-sansII cursor-pointer overflow-ellipsis whitespace-nowrap my-1 hover:bg-black transition duration-300">
              <span className="mr-2 flex items-center   text-base">
                <EuroIcon style={{ fontSize: "0.875rem" }} />
              </span>{" "}
              Donate
            </div>
            <Link
              to="/gacha"
              className={`h-12 w-full flex items-center px-2 text-gray-50   text-base font-semibold overflow-ellipsis whitespace-nowrap  font-sansII tracking-wide ${
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
  );
};
Drawers.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
};
export default Drawers;
