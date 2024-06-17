import React, { useState, useRef, useEffect } from "react";
import { Label, TextInput } from "flowbite-react";

const Disscussion = () => {
  const [content, setContent] = useState("");
  // Ref to access the textarea DOM element
  const textareaRef = useRef(null);

  // Function to handle changes to the textarea content
  const handleInputChange = (event) => {
    // Update the content state with the new value
    setContent(event.target.value);
  };

  // Effect to adjust the height of the textarea when the content changes
  useEffect(() => {
    // Calculate the scrollHeight of the textarea
    const scrollHeight = textareaRef.current.scrollHeight;
    // Adjust the height of the textarea
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${scrollHeight}px`;
  }, [content]);
  return (
    <div className="my-5 w-full ">
      <div className="flex md:flex-row flex-col items-center gap-1 w-full">
        <img
          className="md:w-12 md:h-12 h-10 w-10 rounded-full border-2 border-[#6E75D1FF]"
          src="https://th.bing.com/th/id/R.da2e546841da40cdcf60061743233500?rik=IeO7Sr%2fkUW54wQ&riu=http%3a%2f%2fwww.venmond.com%2fdemo%2fvendroid%2fimg%2favatar%2fbig.jpg&ehk=JihI5nQ0BOd0W%2bZVhtIWmqwac0NMyRMOV7%2bzryywg%2fg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
          alt=""
        />
        <div className="flex gap-4 w-full text-[#6E75D1FF] shadow-sm  items-center px-6 py-4 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>
          <div className="relative flex items-center w-full">
            <textarea
              className="w-full dark:bg-[#242526] dark:text-white text-neutral-600 overflow-hidden text-lg rounded-xl p-2 pl-8 border border-gray-300 focus:border-blue-500 focus:outline-none"
              placeholder="Leave a comment"
              name=""
              id=""
              value={content}
              ref={textareaRef}
              onChange={handleInputChange}
              style={{ resize: "none" }} // Prevent manual resizing
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 absolute right-2 text-black "
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </div>
      </div>

      <div className="bg-gray-50 mt-6 w-full px-6 py-4">
        <div className="mb-12">
          <div className="flex gap-2 font-sans">
            <img
              className="w-9 h-9 rounded-full"
              src="https://th.bing.com/th/id/R.da2e546841da40cdcf60061743233500?rik=IeO7Sr%2fkUW54wQ&riu=http%3a%2f%2fwww.venmond.com%2fdemo%2fvendroid%2fimg%2favatar%2fbig.jpg&ehk=JihI5nQ0BOd0W%2bZVhtIWmqwac0NMyRMOV7%2bzryywg%2fg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
              alt=""
            />
            <span className="font-semibold text-sm">Lucifer</span>
            <span className="text-neutral-600 text-[12px]">12:03 PM</span>
          </div>
          <p className="p-4 text-[#323842FF] text-sm">
            Deserunt minim incididunt cillum nostrud do voluptate excepteur
            excepteur minim ex minim est laborum labore. Mollit commodo in do
            dolor ut in mollit est sint esse nostrud ipsum laboris incididunt
            nulla officia sunt minim. Nisi dolore velit ea occaecat labore minim
            ea do.{" "}
          </p>

          <div className="flex gap-4 font-sans text-sm">
            <span className="text-white bg-purple-violet p-2 font-bold rounded cursor-pointer">
              Like
            </span>
            <span className="p-2 text-purple-violet cursor-pointer">
              Reply{" "}
            </span>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="flex gap-2 font-sans">
            <img
              className="w-9 h-9 rounded-full"
              src="https://th.bing.com/th/id/R.da2e546841da40cdcf60061743233500?rik=IeO7Sr%2fkUW54wQ&riu=http%3a%2f%2fwww.venmond.com%2fdemo%2fvendroid%2fimg%2favatar%2fbig.jpg&ehk=JihI5nQ0BOd0W%2bZVhtIWmqwac0NMyRMOV7%2bzryywg%2fg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
              alt=""
            />
            <span className="font-semibold text-sm">Lucifer</span>
            <span className="text-neutral-600 text-[12px]">12:03 PM</span>
          </div>
          <p className="p-4 text-[#323842FF] text-sm">
            Deserunt minim incididunt cillum nostrud do voluptate excepteur
            excepteur minim ex minim est laborum labore. Mollit commodo in do
            dolor ut in mollit est sint esse nostrud ipsum laboris incididunt
            nulla officia sunt minim. Nisi dolore velit ea occaecat labore minim
            ea do.{" "}
          </p>

          <div className="flex gap-4 font-sans text-sm">
            <span className="text-white bg-purple-violet p-2 font-bold rounded cursor-pointer">
              Like
            </span>
            <span className="p-2 text-purple-violet cursor-pointer">
              Reply{" "}
            </span>
          </div>
          <div className="ml-8 my-12">
            <div className="flex gap-2 font-sans">
              <img
                className="w-9 h-9 rounded-full"
                src="https://th.bing.com/th/id/R.da2e546841da40cdcf60061743233500?rik=IeO7Sr%2fkUW54wQ&riu=http%3a%2f%2fwww.venmond.com%2fdemo%2fvendroid%2fimg%2favatar%2fbig.jpg&ehk=JihI5nQ0BOd0W%2bZVhtIWmqwac0NMyRMOV7%2bzryywg%2fg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
                alt=""
              />
              <span className="font-semibold text-sm">Lucifer</span>
              <span className="text-neutral-600 text-[12px]">12:03 PM</span>
            </div>
            <p className="p-4 text-[#323842FF] text-sm">
              Deserunt minim incididunt cillum nostrud do voluptate excepteur
              excepteur minim ex minim est laborum labore. Mollit commodo in do
              dolor ut in mollit est sint esse nostrud ipsum laboris incididunt
              nulla officia sunt minim. Nisi dolore velit ea occaecat labore
              minim ea do.{" "}
            </p>

            <div className="flex gap-4 font-sans text-sm">
              <span className="text-white bg-purple-violet p-2 font-bold rounded cursor-pointer">
                Like
              </span>
              <span className="p-2 text-purple-violet cursor-pointer">
                Reply{" "}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex gap-2 font-sans">
            <img
              className="w-9 h-9 rounded-full"
              src="https://th.bing.com/th/id/R.da2e546841da40cdcf60061743233500?rik=IeO7Sr%2fkUW54wQ&riu=http%3a%2f%2fwww.venmond.com%2fdemo%2fvendroid%2fimg%2favatar%2fbig.jpg&ehk=JihI5nQ0BOd0W%2bZVhtIWmqwac0NMyRMOV7%2bzryywg%2fg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
              alt=""
            />
            <span className="font-semibold text-sm">Lucifer</span>
            <span className="text-neutral-600 text-[12px]">12:03 PM</span>
          </div>
          <p className="p-4 text-[#323842FF] text-sm">
            Deserunt minim incididunt cillum nostrud do voluptate excepteur
            excepteur minim ex minim est laborum labore. Mollit commodo in do
            dolor ut in mollit est sint esse nostrud ipsum laboris incididunt
            nulla officia sunt minim. Nisi dolore velit ea occaecat labore minim
            ea do.{" "}
          </p>

          <div className="flex gap-4 font-sans text-sm">
            <span className="text-white bg-purple-violet p-2 font-bold rounded cursor-pointer">
              Like
            </span>
            <span className="p-2 text-purple-violet cursor-pointer">
              Reply{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disscussion;
