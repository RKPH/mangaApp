import { useState } from "react";

const Discussion = () => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleClick = () => {
    if (content.trim() !== "") {
      setComments([
        ...comments,
        {
          text: content,
          name: "Lucifer",
          time: "12:03 PM",
          avatarUrl:
            "https://th.bing.com/th/id/R.da2e546841da40cdcf60061743233500?rik=IeO7Sr%2fkUW54wQ&riu=http%3a%2f%2fwww.venmond.com%2fdemo%2fvendroid%2fimg%2favatar%2fbig.jpg&ehk=JihI5nQ0BOd0W%2bZVhtIWmqwac0NMyRMOV7%2bzryywg%2fg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
        },
      ]);
      setContent("");
    }
  };

  return (
    <div className="my-5 w-full shadow-md p-4">
      <h3 className="text-left  text-xl text-black dark:text-white uppercase font-bold">
        Bình luận
      </h3>
      <div className="flex items-center gap-1 w-full">
        <img
          className="md:w-12 md:h-12 h-10 w-10 rounded-full border-2 border-[#6E75D1FF]"
          src="https://th.bing.com/th/id/R.da2e546841da40cdcf60061743233500?rik=IeO7Sr%2fkUW54wQ&riu=http%3a%2f%2fwww.venmond.com%2fdemo%2fvendroid%2fimg%2favatar%2fbig.jpg&ehk=JihI5nQ0BOd0W%2bZVhtIWmqwac0NMyRMOV7%2bzryywg%2fg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
          alt="User avatar"
        />
        <div className="flex gap-4 w-full text-[#6E75D1FF] shadow-sm items-center px-6 py-4 rounded">
          <div className="relative flex items-center h-fit md:w-3/4 w-full">
            <textarea
              className="w-full dark:bg-[#242526] items-center flex dark:text-white text-neutral-600 min-h-[20px] text-lg rounded-xl p-1 pl-8 border border-gray-300 focus:border-blue-500 focus:outline-none"
              placeholder="Leave a comment"
              value={content}
              onChange={handleInputChange}
              style={{ resize: "none" }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 absolute right-2 text-black"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <svg
            onClick={handleClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </div>
      </div>

      <div className="dark:bg-[#242526] bg-gray-50 mt-2 w-full px-6 py-2  rounded-md">
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="mb-4 border rounded-md p-4">
              <div className="flex gap-2 font-sans  items-center">
                <img
                  className="w-9 h-9 rounded-full"
                  src={comment.avatarUrl}
                  alt=""
                />
                <span className="font-semibold dark:text-white text-neutral-600 text-base">
                  {comment.name}
                </span>
                <span className="dark:text-white text-neutral-600 text-base">
                  {comment.time}
                </span>
              </div>
              <p className="p-4 dark:text-white text-neutral-600] text-base">
                {comment.text}
              </p>
              <div className="flex gap-4 font-sans text-sm">
                <span className="dark:text-white text-black bg-violet-500 p-2 font-bold rounded cursor-pointer">
                  Like
                </span>
                <span className="p-2 text-purple-violet cursor-pointer">
                  Reply
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No comments available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussion;
