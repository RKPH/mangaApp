import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import KeyboardDoubleArrowUpSharpIcon from "@mui/icons-material/KeyboardDoubleArrowUpSharp";
import { useLocation } from "react-router-dom";

//components
import { MemoizedFixedHeader } from "../../Components/Header";
import FooterComponent from "../../Components/Footer";
import { ToastContainer } from "react-toastify"; // Import the ToastContainer
import { FixedNavbar as Navbar } from "../../Components/Navbar";
import Drawers from "../../Components/Drawer";

const DefaultLayout = ({ children }) => {
  const location = useLocation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Initialize activeTab from URL
  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/")[2] || "Home"
  );

  useEffect(() => {
    const currentTab = location.pathname.split("/")[2] || "Home";
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location, activeTab]);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Save new state of activeTab to localStorage
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
  const [isShowButtonScroll, setIsShowButtonScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setIsShowButtonScroll(true);
      } else {
        setIsShowButtonScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="w-full h-full font-sansII ">
      <MemoizedFixedHeader className="w-full sticky top-0   z-20   bg-red-300 " />
      <ToastContainer
        autoClose={1000}
        closeOnClick={true}
        pauseOnHover={false}
        position="top-center"
      />
      {isShowButtonScroll && (
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="w-14 h-14 bg-blue-500 rounded-full shadow-md fixed bottom-5 right-5 z-50 flex items-center justify-center cursor-pointer"
        >
          <KeyboardDoubleArrowUpSharpIcon className="text-white w-8 h-8 m-3" />
        </div>
      )}

      <Navbar handleDrawerOpen={handleDrawerOpen} />
      <div className="w-full h-full flex xl:flex-row mt-32">
        <div className="xl:px-32 lg:px-4 w-full bg-white dark:bg-[#18191A] min-h-screen">
          {children}
        </div>
      </div>
      <FooterComponent />
      <Drawers
        isDrawerOpen={isDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
