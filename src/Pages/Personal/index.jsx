import { useUser } from "../../Service/User";
import { useState, useEffect } from "react";
import axios from "axios";

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
      <div className="min-h-screen min-w-full bg-[whitesmoke] dark:bg-[#242526] lg:px-10 px-4 py-2">
        <div className="w-full flex flex-col items-center mb-10">
          <div className="relative flex items-center justify-center w-32 h-32">
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
                className="relative w-28 h-28  border-4 border-white object-cover"
              />
            )}
          </div>
          <span className="font-bold text-lg dark:text-white text-black">
            {formData.userName}
          </span>
        </div>
        <div className="w-full flex lg:flex-row flex-col gap-y-5 lg:px-10">
          <div className="lg:w-1/2 w-full xl:px-28 lg:px-24 md:px-16">
            <div className="flex flex-col justify-center gap-y-4 dark:border-white border-black border p-4 shadow-lg rounded-lg py-5">
              <span className="dark:text-white text-black text-lg font-semibold">
                Số dư tài khoản: 0
              </span>
              <span className="dark:text-white text-black text-lg font-semibold">
                Số điểm: 0
              </span>
            </div>
          </div>
          <div className="lg:w-1/2 w-full xl:px-28 lg:px-24 md:px-16">
            <div className="flex flex-col justify-center gap-y-4 dark:border-white border-black border p-4 shadow-lg rounded-lg py-5">
              <span className="dark:text-white text-black text-lg font-semibold">
                Số truyện đã đọc: 0
              </span>
              <span className="dark:text-white text-black text-lg font-semibold">
                Số truyện đã lưu: {user?.userMangas?.length || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center lg:px-10 mt-10">
          <div className="w-full max-w-lg bg-white dark:bg-[#242526] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold dark:text-white text-black mb-6">
              Update Profile
            </h2>
            <form onSubmit={handleSave} className="flex flex-col gap-y-4">
              <div>
                <label
                  className="block dark:text-white text-black font-semibold mb-2"
                  htmlFor="email"
                >
                  Email (cannot be changed)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData?.email}
                  disabled
                  className="w-full p-2 border rounded-lg dark:bg-[#3A3B3C] bg-gray-100 dark:text-white"
                />
              </div>
              <div>
                <label
                  className="block dark:text-white text-black font-semibold mb-2"
                  htmlFor="userName"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-[#3A3B3C] dark:text-white"
                />
              </div>
              <div>
                <label
                  className="block dark:text-white text-black font-semibold mb-2"
                  htmlFor="avatar"
                >
                  Avatar
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-lg dark:bg-[#3A3B3C] dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-blue-600 transition duration-300"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalpage;
