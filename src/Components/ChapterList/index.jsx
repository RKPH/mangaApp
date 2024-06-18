import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const ChapterList = ({ chapters, slug }) => {
  return (
    <div className="mt-2 p-4 bg-gradient-to-br from-ophim-dark to-ophim-onyx rounded-xl  shadow-md">
      <h3 className="text-left  text-xl text-black dark:text-white uppercase font-bold">
        Danh sách chương
      </h3>
      <div className=" overflow-y-auto w-full mt-2 min-h-[300px] max-h-[300px]">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-10 gap-2 ">
          {chapters.map((chapter) =>
            chapter.server_data.map((item, index) => (
              <Link
                to={`/truyen-tranh/${slug}/chapter-${item.chapter_name}`}
                state={{
                  chapter_api: item.chapter_api_data,
                  data: chapters,
                }}
                className="flex font-[helvetica] text-lg items-center justify-center p-1 border rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer transition ease-in-out duration-300"
                key={`${item.chapter_name}-${index}`}
              >
                <span className="text-base font-normal">
                  Chương {item.chapter_name}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
ChapterList.propTypes = {
  chapters: PropTypes.array.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ChapterList;
