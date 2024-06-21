import React from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import PropTypes from "prop-types";
const HistoryRead = ({ data2, domain, handleClicked }) => {
  return (
    <div className="mt-5 mb-10 w-full lg:hidden block">
      <h2 className="md:text-xl text-lg  font-sansII dark:text-white text-black  uppercase font-bold my-2">
        Lịch sử đọc của bạn
      </h2>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg  bg-[whitesmoke] px-4 py-2 text-left  font-medium text-black hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
              <span className="text-sm">
                Danh sách tiếp tục xem ({data2.length})
              </span>
              <KeyboardArrowDownIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-black`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-2 pb-2 pt-4 text-sm text-gray-500 max-h-[500px] overflow-y-auto">
              {data2.map((item, index) => (
                <Link
                  to={`/truyen-tranh/${item.slug}`}
                  key={index}
                  className="w-full h-[100px] p-1 bg-[whitesmoke] border-2  rounded-md cursor-pointer grid grid-cols-12  mb-4 items-center hover:shadow-xl hover:bg-slate-300  transition duration-300 "
                >
                  <div className="col-span-10 lg:col-span-8  gap-4 ml-1 flex ">
                    <img
                      className="min-w-[70px] h-[80px] rounded-md shadow-md"
                      src={`${domain}/${item.thumb_url} `}
                      loading="lazy"
                      alt={item.slug}
                    />
                    <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <h1 className="text-lg font-sansII  text-black font-semibold">
                        {item.name}
                      </h1>
                      <h2 className="text-base text-gray-500 font-normal">
                        {item.origin_name}
                      </h2>
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleClicked(e, item)}
                    className="col-span-2 lg:col-span-4 items-start justify-end flex  h-full w-full px-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-black hover:text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </Link>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
HistoryRead.propTypes = {
  data2: PropTypes.array,
  domain: PropTypes.string,
  handleClicked: PropTypes.func,
};
export default HistoryRead;
