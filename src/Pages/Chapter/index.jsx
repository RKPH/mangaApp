import axios from "axios";
import { Fragment, useEffect, useState, useRef } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";

const Chapter = () => {
  const location = useLocation();
  const { slug } = useParams();
  const [chapter, setChapter] = useState(null);
  const [chapters, setChapters] = useState(location.state.data);
  const [domain, setDomain] = useState("");
  const [apiData, setApiData] = useState("");
  const [isListboxOpen, setIsListboxOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.chapter_api) {
      setApiData(location.state.chapter_api);
      setChapters(location.state.data);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      if (!apiData) return;

      try {
        const response = await axios.get(apiData);
        const item = response.data.data?.item;
        const domain_cdn = response.data.data?.domain_cdn;
        console.log("item:", item);

        setChapter(item);
        setDomain(domain_cdn);

        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiData]);

  const findChapterIndex = (chapterName) => {
    for (let i = 0; i < chapters.length; i++) {
      for (let j = 0; j < chapters[i]?.server_data.length; j++) {
        if (chapters[i]?.server_data[j]?.chapter_name === chapterName) {
          return { chapterIndex: j, chapterGroupIndex: i };
        }
      }
    }
    return { chapterIndex: -1, chapterGroupIndex: -1 };
  };

  const { chapterIndex, chapterGroupIndex } = findChapterIndex(
    chapter?.chapter_name
  );

  const previousChapter =
    chapterIndex > 0
      ? chapters[chapterGroupIndex]?.server_data[chapterIndex - 1]
      : null;

  const nextChapter =
    chapterIndex < chapters[chapterGroupIndex]?.server_data.length - 1
      ? chapters[chapterGroupIndex]?.server_data[chapterIndex + 1]
      : null;

  return (
    <div
      ref={scrollRef}
      className="w-full flex flex-col items-center bg-white dark:bg-[#18191A] py-4 z-0"
    >
      <div className="bg-[whitesmoke] dark:bg-[#242526]  justify-center items-center py-2 lg:w-2/3 w-full">
        <div className="lg:px-2 w-full">
          <div className="bg-white dark:bg-[#18191A] p-5 rounded-lg mb-5">
            <div className="m-1">
              <h1 className="lg:text-lg text-base font-bold dark:text-white">
                {chapter?.comic_name} - Chapter: {chapter?.chapter_name}
              </h1>
            </div>
            {/* Listbox */}
            <div className="lg:text-base text-sm flex dark:text-white text-black justify-center">
              <Listbox value={apiData} onChange={setApiData}>
                <Listbox.Button
                  className="border-2 border-gray-300 rounded-md p-2 m-2"
                  onClick={() => setIsListboxOpen(!isListboxOpen)}
                >
                  chương {chapter?.chapter_name}
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  show={isListboxOpen}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute w-64 py-1 mt-14 overflow-auto text-base bg-white dark:bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {chapters.map((chapter) =>
                      chapter?.server_data.map((item) => (
                        <Listbox.Option
                          key={item?.chapter_name}
                          className={({ active }) =>
                            `${
                              active
                                ? "text-amber-900 bg-amber-100"
                                : "text-gray-900"
                            } cursor-default select-none relative p-2`
                          }
                          value={item.chapter_api_data}
                        >
                          {({ selected }) => (
                            <Link
                              to={`/truyen-tranh/${slug}/chap-${item.chapter_name}`}
                              onClick={() => setIsListboxOpen(false)}
                              state={{
                                chapter_api: item.chapter_api_data,
                                data: chapters,
                              }}
                              className={`${
                                selected
                                  ? "font-extrabold text-black"
                                  : "font-normal"
                              } block truncate lg:text-base text-sm`}
                            >
                              Chương {item?.chapter_name}
                            </Link>
                          )}
                        </Listbox.Option>
                      ))
                    )}
                  </Listbox.Options>
                </Transition>
              </Listbox>
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            {chapter?.chapter_image.map((image, index) => (
              <img
                key={index}
                className="w-full  object-contain"
                src={`${domain}/${chapter.chapter_path}/${image.image_file}`}
                alt={`page ${image.image_page}`}
              />
            ))}
          </div>

          <div className="lg:text-base text-sm flex dark:text-white text-black justify-center">
            <Listbox value={apiData} onChange={setApiData}>
              <Listbox.Button
                className="border-2 border-gray-300 rounded-md lg:p-2 p-1 m-2"
                onClick={() => setIsListboxOpen(!isListboxOpen)}
              >
                chương {chapter?.chapter_name}
              </Listbox.Button>
              <Transition
                as={Fragment}
                show={isListboxOpen}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-64 py-1 mt-14 overflow-auto text-base bg-white dark:bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {chapters.map((chapter) =>
                    chapter?.server_data.map((item) => (
                      <Listbox.Option
                        key={item?.chapter_name}
                        className={({ active }) =>
                          `${
                            active
                              ? "text-amber-900 bg-amber-100"
                              : "text-gray-900"
                          } cursor-default select-none relative p-2`
                        }
                        value={item.chapter_api_data}
                      >
                        {({ selected }) => (
                          <Link
                            to={`/truyen-tranh/${slug}/${item.chapter_name}`}
                            onClick={() => setIsListboxOpen(false)}
                            state={{
                              chapter_api: item.chapter_api_data,
                              data: chapters,
                            }}
                            className={`${
                              selected
                                ? "font-extrabold text-black"
                                : "font-normal"
                            } block truncate lg:text-base text-sm`}
                          >
                            Chương {item?.chapter_name}
                          </Link>
                        )}
                      </Listbox.Option>
                    ))
                  )}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 z-10 left-0 right-0 flex items-center justify-center p-2 bg-white dark:bg-[#18191A]  border-t border-gray-200 dark:border-gray-700">
        {previousChapter && (
          <Link
            to={`/truyen-tranh/${slug}/chapter-${previousChapter.chapter_name}`}
            state={{
              chapter_api: previousChapter.chapter_api_data,
              data: chapters,
            }}
            className="btn btn-primary dark:text-white text-black p-2 rounded-md lg:text-base text-xs border dark:bg-[#3F94D5] dark:border-white border-black m-1 hover:bg-gray-500"
          >
            chương trước
          </Link>
        )}
        {nextChapter && (
          <Link
            to={`/truyen-tranh/${slug}/chapter-${nextChapter.chapter_name}`}
            state={{
              chapter_api: nextChapter.chapter_api_data,
              data: chapters,
            }}
            className="btn btn-primary dark:text-white text-black rounded-md p-2 lg:text-base text-xs border dark:bg-[#3F94D5] dark:border-white border-black m-1 hover:bg-gray-500"
          >
            Chương sau
          </Link>
        )}
      </div>
    </div>
  );
};

export default Chapter;
