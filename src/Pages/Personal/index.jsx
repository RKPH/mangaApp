import { useUser } from "../../Service/User";
const Personalpage = () => {
  const user = useUser();
  return (
    <div className="min-w-full min-h-screen  flex flex-col items-center  bg-white dark:bg-[#18191A] py-4 z-0">
      <div className="min-h-screen min-w-full bg-[whitesmoke] dark:bg-[#242526] lg:px-10 px-4 py-2">
        <div className="w-full flex flex-col items-center mb-10">
          <img src={user?.avatar} className="w-40 h-40 m-5" alt="" />
          <span className="font-bold text-lg dark:text-white text-black">
            {user?.userName}
          </span>
        </div>
        <div className="w-full flex lg:flex-row flex-col gap-y-5 lg:px-10">
          <div className="lg:w-1/2 w-full  xl:px-28 lg:px-24 md:px-16 ">
            <div className=" flex flex-col  justify-center gap-y-4 dark:border-white border-black border p-4 shadow-lg rounded-lg py-5">
              <span className="dark:text-white text-black text-lg font-semibold">
                Số dư tài khoản: 0
              </span>
              <span className="dark:text-white text-black text-lg font-semibold">
                Số điểm: 0
              </span>
            </div>
          </div>
          <div className="lg:w-1/2 w-full  xl:px-28 lg:px-24 md:px-16 ">
            <div className=" flex flex-col  justify-center gap-y-4 dark:border-white border-black border p-4 shadow-lg rounded-lg py-5">
              <span className="dark:text-white text-black text-lg font-semibold">
                Số truyện đã đọc: 0
              </span>
              <span className="dark:text-white text-black text-lg font-semibold">
                Số truyện đã lưu: {user?.userMangas.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalpage;
