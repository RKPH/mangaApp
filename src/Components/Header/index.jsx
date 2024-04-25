import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <header className="w-full h-20 bg-[whitesmoke] shadow-lg border-b-2 border-black flex flex-row items-center fixed top-0 left-0 right-0 z-[9999px]">
      {/* // This is the left side of the header */}
      <div className="w-1/2 h-full  pl-16 flex items-center">
        <div className="w-[127px] h-full flex items-center  flex-row">
          <div className="w-[127px] h-full flex items-center ">
            <span className="text-slate-400 text-[40px] font-normal tracking-widest ">
              Yuki
            </span>
            <span className="text-stone-900 text-[40px] font-semibold  tracking-widest">
              {" "}
            </span>
          </div>
          <div className="w-[27.61px]  text-black text-[40px] flex items-center  font-extrabold  tracking-[16px]">
            雪
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full pr-16   flex items-center justify-center">
        <div className="w-[417px] h-12 ml-5 mr-5 ">
          <form className="w-full h-full relative ">
            <input
              type="text"
              className="w-full  h-full pl-8 pr-14 py-3  rounded-3xl  border border-black focus:outline-none focus:border-black"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="absolute right-0 top-0 w-[50px] h-full rounded-r-3xl bg-blue hover:bg-slate-300 z-50 "
            >
              <SearchIcon />
            </button>
          </form>
        </div>

        <button className="w-[108px] h-12 text-center text-gray-50 text-base bg-cyan-800 font-semibold font-['Lato'] tracking-wide mr-5 rounded-md hover:opacity-35">Log in</button>
        <button className="w-[108px] h-12 text-center text-stone-900 text-base  font-semibold font-['Lato'] tracking-wide mr-5 rounded-md hover:border-2 hover:border-black">Sign up</button>
      </div>
    </header>
  );
};

export default Header;
