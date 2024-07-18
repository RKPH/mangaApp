import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const Discussion = ({ slug }) => {
  const [content, setContent] = useState("");
  const [commentDatas, setCommentDatas] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.user);
  const [like, setLike] = useState(0);
  const handleInputChange = (event) => {
    setContent(event.target.value);
  };
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Comments/comments/${slug}`
      );
      setCommentDatas(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [commentDatas]);
  useEffect(() => {
    fetchComments();
  }, [slug]);

  const handleClick = () => {
    if (content.trim() === "") {
      return; // Prevents empty comments
    }
    const userID = user?.userID;

    axios
      .post(
        `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Comments/addcomment/${slug}`,
        {
          userID: userID,
          comment: content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Comment added:", response.data);
        // Update comments list with the new comment
        const newComment = {
          ...response.data,
          comment: content,
          user: {
            userName: user?.userName || "Unknown",
            userAvatar: user?.avatar || "default-avatar.png",
          },
          createdAt: new Date().toLocaleString(),
        };
        setCommentDatas([...commentDatas, newComment]);
        setContent(""); // Clear the textarea after successful comment
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        // Handle error (e.g., display an error message)
      });
  };

  return (
    <div className="my-5 w-full shadow-md p-4">
      <h3 className="text-left text-xl text-black dark:text-white uppercase font-bold">
        Bình luận
      </h3>
      <div className="flex items-center gap-1 w-full">
        <img
          className="md:w-12 md:h-12 h-10 w-10 rounded-full border-2 md:block hidden border-[#6E75D1FF]"
          src={user?.avatar || "/default-avatar.png"}
          alt="User avatar"
        />
        <div className="flex gap-4 w-full text-[#6E75D1FF] shadow-sm items-center px-2 py-4 rounded">
          <div className="relative flex items-center h-fit  w-full">
            <textarea
              className="w-full dark:bg-[#242526] items-center flex justify-center dark:text-white text-neutral-600 min-h-[20px] text-lg rounded-xl p-1 pl-8 border border-gray-300 focus:border-blue-500 focus:outline-none"
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

      <div className="dark:bg-[#242526] bg-gray-50 mt-2 w-full p-4 px-12  rounded-md">
        {commentDatas && commentDatas.length > 0 ? (
          commentDatas.map((comment, index) => (
            <div key={index} className=" w-full p-4">
              <div className="flex gap-2 font-sans">
                <img
                  className="md:w-12 md:h-12 h-10 w-10 rounded-full border-2 border-[#6E75D1FF]"
                  src={comment.user?.avatar || "/default-avatar.png"}
                  alt="User Avatar"
                />
                <div className="flex flex-col font-sansII">
                  <div className="p-2 border  w-full rounded-2xl ">
                    <span className="font-semibold dark:text-white text-neutral-600 text-lg font-sansII py-1">
                      {comment.user?.userName}
                    </span>
                    <p className="dark:text-white text-black font-sansII font-normal">
                      {comment?.comment}
                    </p>
                  </div>
                  <div className="flex gap-2 p-2 font-sans text-sm items-center">
                    <span
                      onClick={() => setLike(like + 1)}
                      className="dark:text-white text-black bg-violet-500 p-2 font-bold rounded cursor-pointer"
                    >
                      Like {like}
                    </span>
                    <span className="p-2 dark:text-white text-black cursor-pointer">
                      Reply
                    </span>
                    <span className="dark:text-white text-neutral-600">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
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

Discussion.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default Discussion;
