import PropTypes from "prop-types";
import Header from "../../Components/Header";
import { useState, useEffect , useRef} from "react";

//icon
import HomeIcon from '@mui/icons-material/Home';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SettingsIcon from '@mui/icons-material/Settings';
import EuroIcon from '@mui/icons-material/Euro';
import Face6Icon from '@mui/icons-material/Face6';
//css
import "./index.css";
import { Link ,useLocation } from "react-router-dom";
const DefaultLayout = ({ children }) => {
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
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  };
  return (
    
    <div className="w-full h-screen  ">
      <Header className="w-full fixed top-0 left-0 right-0 z-[9999px] bg-white" />
      <div className="w-full h-full flex flex-row">
        <div className="hidden w-0 lg:block lg:w-1/5  left-0  lg:fixed mt-20 h-full bg-cyan-800 ">
          {/* Menu for manga */}
          <div className=" h-[250px]  w-full mt-20 px-5">
            <div className="text-gray-50 text-opacity-50 text-lg font-bold font-['Lato'] tracking-wide px-2">
              Menu -
            </div>
            <div className="w-full h-[280px]  ">

              <Link to="/Home" className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${activeTab === 'Home' ? 'bg-red-200' : ''}  cursor-pointer  hover:bg-red-200 item my-1 transition duration-300`}        
              onClick={() => {
                localStorage.removeItem('currentPage')
                handleTabClick('Home')
              }}
              >
                <span className="mr-2 flex items-center"><HomeIcon/></span> Home
              </Link>

              <Link to='/danh-sach/the-loai' className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${activeTab === 'the-loai' ? 'bg-red-200' : ''}  cursor-pointer  hover:bg-red-200 item my-1 transition duration-300`}
              onClick={() => {
                localStorage.removeItem('currentPage')
                handleTabClick('the-loai')}}
              >
                <span className="mr-2 flex items-center"><CollectionsBookmarkIcon/></span> Discover comics
              </Link>

              <Link to="/danh-sach/truyen-moi" className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${activeTab === 'truyen-moi' ? 'bg-red-200' : ''}  cursor-pointer  hover:bg-red-200 item my-1 transition duration-300`}     
              onClick={() => handleTabClick('truyen-moi')}
              >
                <span className="mr-2 flex items-center"><MenuBookIcon/></span> Truyen moi
              </Link>

              <Link to="/danh-sach/dang-phat-hanh" className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${activeTab === 'dang-phat-hanh' ? 'bg-red-200' : ''}  cursor-pointer  hover:bg-red-200 item my-1 transition duration-300`}     
              onClick={() => handleTabClick('dang-phat-hanh')}
              >
                <span className="mr-2 flex items-center"><WhatshotIcon/></span> Đang phát hành
              </Link>
              <div className={`h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide ${activeTab === 'Sắp ra mắt' ? 'bg-red-200' : ''}  cursor-pointer  hover:bg-red-200 item my-1 transition duration-300`}     
              onClick={() => handleTabClick('Sắp ra mắt')}
              >
                <span className="mr-2 flex items-center"><NewReleasesIcon/></span> Sắp ra mắt
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
                <span className="mr-2 flex items-center"><SettingsIcon/></span> Settings
              </div>

              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide  cursor-pointer  hover:bg-red-200 transition duration-300">
                <span className="mr-2 flex items-center"><EuroIcon/></span> Donate
              </div>

              <div className="h-12 w-full flex items-center  px-2 text-gray-50 text-lg font-bold font-['Lato'] tracking-wide  cursor-pointer  hover:bg-red-200 transition duration-300">
                <span className="mr-2 flex items-center"><Face6Icon/></span> Sign in
              </div>
             
            </div>
          </div>
        </div>
        <div  className="lg:w-4/5 w-full overflow-y-auto mt-20 lg:ml-[20%]">
          <div ref={scrollRef} className="w-full h-full">
             {children}
          </div>
        </div>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
