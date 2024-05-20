import { useUser } from "../../Service/User";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Personalpage = () => {
  const user = useUser();
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    avatar: "",
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user?.userEmail || "",
        userName: user?.userName || "",
        avatar: user?.avatar || "",
      });
      setPreview(user?.avatar || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const formsData = new FormData();
        formsData.append("file", file);

        const response = await axios.post(
          "https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Image/upload",
          formsData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = response.data.imageUrl;
        console.log("Image URL:", imageUrl);
        setFormData((prevData) => ({
          ...prevData,
          avatar: imageUrl,
        }));
        setPreview(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Saving user information:", formData);
    try {
      // Make the API call to save the user data
      const response = await axios.put(
        `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/Update/${user?.userID}`,
        {
          userName: formData.userName,
          avatar: formData.avatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("User information updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div className="min-w-full min-h-screen flex flex-col items-center bg-white dark:bg-[#18191A] py-4 z-0">
      <div className="min-h-screen min-w-full bg-custom-image2 bg-cover bg-center bg-no-repeat lg:px-10 px-4 py-5">
        {/* avatar */}
        <div className="w-full flex flex-col items-center mb-6">
          <div className="relative flex items-center justify-center w-36 h-36">
            <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
            <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-md"></div>
            {loading ? (
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="loader"></div>
              </div>
            ) : (
              <img
                src={preview || "default-avatar-url"} // Replace with a default avatar URL if necessary
                alt="User avatar"
                className="relative w-32 h-32  border-4 border-white object-cover"
              />
            )}
          </div>
          <span className="font-bold font-mono  text-lg dark:text-white text-black">
            {formData.userName}
          </span>
        </div>
        <div className="w-full justify-center  items-center flex p-1 mb-6">
          <Link
            to="/setting"
            className="p-2 px-10 rounded-lg bg-blue-500 hover:opacity-40"
          >
            Edit
          </Link>
        </div>
        <div className="w-full flex items-center justify-center mb-6">
          <div className="min-h-[300px] xl:min-w-[1000px] min-w-full flex flex-col items-center  bg-white dark:bg-[#18191A] rounded-xl p-5">
            <div className="w-full text-center flex items-center justify-center mb-5">
              <span className="font-mono font-semibold dark:text-white">
                {" "}
                Tham gia vào: 21/12/2024
              </span>
            </div>
            <div className="xl:w-[65%] w-full  grid grid-cols-4 gap-2  m-2">
              <div className="xl:col-span-2 flex col-span-4 items-center border-white border">
                <div className="flex flex-col dark:text-white font-mono font-semibold">
                  <span className="m-2">Tài khoản: </span>
                  <span className="m-2">Số điểm: </span>
                </div>
              </div>
              <div className="xl:col-span-2 flex col-span-4 items-center border-white border ">
                <div className="flex flex-col dark:text-white font-mono font-semibold">
                  <span className="m-2">Số sách đã đọc: </span>
                  <span className="m-2">Số giờ online: </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="min-h-[300px] xl:min-w-[1000px] min-w-full flex flex-col items-center  bg-white dark:bg-[#18191A] rounded-xl p-5">
            <div className="w-full text-center flex items-center justify-center mb-5">
              <span className="font-mono font-semibold dark:text-white">
                {" "}
                LỊCH SỬ HOẠT ĐỘNG
              </span>
            </div>
            <div className="xl:w-[65%] w-full text-center font-mono uppercase dark:text-white">
              <span> Chưa có ghi nhận</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalpage;
