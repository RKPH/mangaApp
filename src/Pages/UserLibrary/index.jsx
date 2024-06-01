import { useDispatch } from "react-redux";
import { addManga } from "../../Redux/MangaSlice"; // Import the action creator from your slice
import { useUser } from "../../Service/User";
import React from "react";
import { Link } from "react-router-dom";

import { Card } from "primereact/card";
import { BreadCrumb } from "primereact/breadcrumb";

import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  tabRoot: {
    color: "black",
    "&.dark\\:text-white": {
      color: "white",
    },
    // Add more styles as needed
  },
});

const TruyenMoi = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const User = useUser();

  const items = [
    {
      label: "Đang phát hành",
      template: () => (
        <a className="text-primary font-semibold text-orange-500 dark:text-blue-400">
          Thư viện
        </a>
      ),
    },
  ];
  const home = { label: "Trang chủ", url: "/" };
  const handleMangaClick = (manga) => {
    dispatch(addManga(manga));
  };

  return (
    <div className="w-full flex flex-col items-center bg-white dark:bg-[#18191A] py-4 z-0">
      <div className="bg-[whitesmoke] dark:bg-[#242526] lg:px-10 px-4 py-2 min-w-full min-h-screen">
        <BreadCrumb
          model={items}
          home={home}
          className="px-1 shadow-md min-w-fit max-w-fit lg:text-base text-sm dark:text-white rounded-md mb-5"
        />
        <TabContext value={value}>
          <div className="flex p-1 font-mono font-medium dark:text-white text-black lg:text-base text-sm ">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
               
                label="Truyện theo dõi"
                value="1"
              />
              <Tab
             
                label="Yêu thích"
                value="2"
              />
            </TabList>
          </div>
          <TabPanel value="1" className="dark:text-white">
            <h1 className="text-xl lg:text-2xl 3xl:text-3xl font-semibold text-orange-500 dark:text-blue-400 text-center my-5 mb-10">
              Library ({User?.userMangas.length})
            </h1>

            {/* row of cards */}
            <div className="w-full my-10 grid grid-cols-2 s:grid-cols-3 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-5">
              {User?.userMangas?.map((item) => (
                <Card
                  key={item.slug}
                  className="shadow-md hover:scale-105"
                  onClick={() => handleMangaClick(item)}
                >
                  <Link to={`/truyen-tranh/${item.slug}`}>
                    <img
                      src={item.mangaImage}
                      alt={item.slug}
                      className="h-[200px] xs:h-[200px] sm:h-[200px] lg:h-[220px] 2xl:h-[220px] 3xl:h-[220px] w-full"
                    />
                    <div className="py-2">
                      <h5 className="overflow-hidden text-left lg:text-base text-xs font-medium overflow-ellipsis whitespace-nowrap dark:text-white">
                        {item.mangaName}
                      </h5>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel value="2" className="dark:text-white w-full min-w-full">
            <div className="w-full min-w-full">
              <h1>Truyen đã đọc</h1>
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default TruyenMoi;
