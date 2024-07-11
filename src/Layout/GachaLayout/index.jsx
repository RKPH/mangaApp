import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

//compoent

import { MemoizedUnFixedHeader } from "../../Components/Header";

import { ToastContainer } from "react-toastify"; // Import the ToastContainer
import { UnFixedNavbar as Navbar } from "../../Components/Navbar";
import Drawers from "../../Components/Drawer";
const GachaLayout = ({ children }) => {
  const location = useLocation();

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
  }, [location, activeTab]);

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

  return (
    <div className=" w-full h-screen font-[helvetica]">
      <MemoizedUnFixedHeader className="w-full  bg-white" />
      <ToastContainer
        autoClose={1000}
        closeOnClick={true}
        pauseOnHover={false}
        position="top-center"
      />
      <Navbar handleDrawerOpen={handleDrawerOpen} />
      <div className="w-full  xl:flex-row ">
        <div className=" xl:px-32 lg:px-4  w-full   bg-white dark:bg-[#18191A] ">
          {children}
        </div>
      </div>

      <Drawers
        isDrawerOpen={isDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
    </div>
  );
};

GachaLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GachaLayout;
