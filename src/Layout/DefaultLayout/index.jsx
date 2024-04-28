import PropTypes from "prop-types";
import Header from "../../Components/Header";
import { useState, useEffect, useRef } from "react";

//icon
import HomeIcon from "@mui/icons-material/Home";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import SettingsIcon from "@mui/icons-material/Settings";
import EuroIcon from "@mui/icons-material/Euro";
import Face6Icon from "@mui/icons-material/Face6";

import { Link, useLocation } from "react-router-dom";
const DefaultLayout = ({ children }) => {
  const location = useLocation();

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
  return (
    <div className="w-full h-full ">
      <Header className="w-full   bg-white" />
      <div className="w-full h-full flex lg:flex-row ">
        
        <div className=" w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
