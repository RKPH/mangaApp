import PropTypes from "prop-types";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";

const Modal = ({ handleClose, isOpen, Data, api }) => {
  const [chapter, setChapter] = useState(null);
  const [domain, setDomain] = useState("");
  const [apiData, setApiData] = useState("");
  const scrollRef = useRef(null);
  useEffect(() => {
    setApiData(api);
  }, [api]);

  useEffect(() => {
    let isMounted = true; // add this line
    const fetchData = async () => {
      try {
        const response = await axios.get(apiData);
        const { item, domain_cdn } = response.data.data;

        // check if component is still mounted
        setChapter(item);
        setDomain(domain_cdn);
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [apiData, api]);

  return (
    <div className="w-full h-full">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 top-0 right-0 left-0 bottom-0 z-10 mt-10 bg-white dark:bg-[#18191A] "
          onClose={handleClose}
        >
          <div className="max-h-screen max-w-full m-auto lg:px-20 text-center">
            <Dialog.Overlay className="fixed  right-0 overflow-hidden  inset-0 dark:bg-black bg-white  opacity-100 z-[99999px]" />
            <div className=" inline-block  w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-[#242526] shadow-xl rounded-2xl">
              <div className="p-4 bg-gray-100 dark:bg-[#18191A] flex justify-between items-center sticky top-0  z-10">
                <h2 className="hidden lg:inline text-2xl font-bold dark:text-white">
                  {chapter?.comic_name}
                </h2>
                <div className="dark:bg-white">
                  <Listbox value={apiData} onChange={setApiData}>
                    <Listbox.Button className="border-2 border-gray-300 rounded-md p-4">
                      Choose a chapter: chương {chapter?.chapter_name}
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute w-64 py-1 mt-1 overflow-auto text-base bg-white dark:bg-white  rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {Data.item?.chapters?.map((chapter) =>
                          chapter.server_data.map((item) => (
                            <Listbox.Option
                              key={item?.chapter_name}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "text-amber-900 bg-amber-100"
                                    : "text-gray-900"
                                }
                                  cursor-default select-none relative py-2 pl-10 pr-4`
                              }
                              value={item.chapter_api_data}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`${
                                      selected ? "font-medium" : "font-normal"
                                    } block truncate`}
                                  >
                                    Chương {item?.chapter_name}
                                  </span>
                                </>
                              )}
                            </Listbox.Option>
                          ))
                        )}
                      </Listbox.Options>
                    </Transition>
                  </Listbox>
                </div>
                <button onClick={handleClose} className="text-lg font-bold">
                  X
                </button>
              </div>
              <div className="flex overflow-y-auto max-h-[calc(100vh-10rem)]">
                <div className="hidden lg:block lg:w-1/5 p-4 overflow-y-auto  border-r border-gray-200 ">
                  {Data.item?.chapters?.map((chapters) =>
                    chapters.server_data.map((item) => (
                      <div
                        className="border-b border-solid py-[5px] hover:grayscale cursor-pointer"
                        key={item?.chapter_name}
                        onClick={() => {
                          setApiData(item.chapter_api_data);
                        }}
                      >
                        <span
                          className={`text-base lg:text-base  text-black dark:text-white font-semibold ${
                            item?.chapter_name === chapter?.chapter_name
                              ? "text-orange-300"
                              : ""
                          }`}
                        >
                          Chương {item.chapter_name}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <div className="w-full lg:w-4/5 p-4 overflow-y-auto lg:max-h-full flex flex-col items-center">
                  <h3
                    ref={scrollRef}
                    className="text-xl font-semibold mb-4 dark:text-white"
                  >
                    Chapter: {chapter?.chapter_name}
                  </h3>
                  <div className="w-full flex flex-col items-center">
                    {chapter?.chapter_image.map((image, index) => (
                      <img
                        key={index}
                        className="lg:w-3/4 w-full"
                        src={`${domain}/${chapter.chapter_path}/${image.image_file}`}
                        alt={`page ${image.image_page}`}
                      />
                    ))}
                  </div>
                  <div className="w-full min-h-24 text-center flex items-center justify-center">
                    <span className="text-xl font-bold">
                      Vui lòng không thêm quảng cáo cá độ dưới mọi hình thức
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  api: PropTypes.string.isRequired,
  Data: PropTypes.array.isRequired,
};

export default Modal;
