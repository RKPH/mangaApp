import { useDispatch } from "react-redux";
import { addManga } from "../../Redux/MangaSlice"; // Import the action creator from your slice
import { useUser } from "../../Service/User";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { BreadCrumb } from "primereact/breadcrumb";
import { Tab } from "@headlessui/react";
import Divider from "@mui/material/Divider";
import RowOfCard from "../../Components/RowOfCard";
const Library = () => {
  const User = useUser();
  const [currentTab, setCurrentTab] = useState("Truyện đã lưu");
  const [data, setData] = useState([]);
  const items = [
    {
      label: "Thư viện",
      template: () => (
        <a className="text-primary font-semibold text-orange-500 dark:text-blue-400">
          Thư viện
        </a>
      ),
    },
  ];
  useEffect(() => {
    setData(User?.userMangas || []);
    console.log("libarry:", User?.userMangas);
  }, [User?.userMangas]);
  const handleClick = (tab) => {
    setCurrentTab(tab);
  };

  const home = { label: "Trang chủ", url: "/" };

  return (
    <div className="w-full flex flex-col items-center bg-white dark:bg-[#18191A] py-4 z-0">
      <div className="bg-[whitesmoke] dark:bg-[#242526] lg:px-10 px-4 py-2 min-w-full min-h-screen">
        <BreadCrumb
          model={items}
          home={home}
          className="px-1 shadow-md min-w-fit max-w-fit lg:text-base text-sm dark:text-white rounded-md mb-5"
        />

        <h1 className="text-xl lg:text-2xl 3xl:text-3xl font-semibold text-orange-500 dark:text-blue-400 text-center my-5 ">
          Library ({User?.userMangas.length})
        </h1>
        <Tab.Group>
          <Tab.List className="flex  lg:text-base text-sm">
            <Tab
              onClick={() => handleClick("Truyện đã lưu")}
              className={`px-4 py-2 mx-2  rounded-md transition   ${
                currentTab === "Truyện đã lưu"
                  ? "dark:text-white dark:bg-[#0E46A3] bg-[#FF7D29] "
                  : "dark:text-white text-black"
              }`}
            >
              Truyện đã lưu
            </Tab>
            <Tab
              onClick={() => handleClick("Yêu thích")}
              className={`px-4 py-2 mx-2  rounded-md transition transform   ${
                currentTab === "Yêu thích"
                  ? "dark:text-white dark:bg-[#0E46A3] bg-[#FF7D29] "
                  : "dark:text-white text-black"
              }`}
            >
              Yêu thích
            </Tab>
          </Tab.List>
          <Divider className="my-2 dark:text-white" />
          {/* row of cards */}
          <Tab.Panels>
            <Tab.Panel>
              <RowOfCard data={data} />
            </Tab.Panel>
            <Tab.Panel>Tab2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Library;
