import { Footer } from "flowbite-react";
import logo from "../../assets/OIG4.png";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const FooterComponent = () => {
  return (
    <Footer bgDark>
      <div className="w-full bg-orange-500 dark:bg-[#18191A] text-white border-t border-white">
        <div className="flex flex-col items-center px-6 py-8 md:flex-row md:justify-between">
          <div className=" w-full flex flex-col items-center">
            <span className="text-2xl font-extrabold text-center font-sansII">
              About us
            </span>
            <p className="mt-4 text-justify  text-lg font-sansII px-14">
              Welcome to IceyCure, your ultimate destination for captivating
              stories and immersive reading experiences. Dive into a world of
              imagination and creativity, where every story takes you on a new
              adventure. Whether you’re into fantasy, romance, mystery, or
              science fiction, IceyCube has something for every reader.
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-800 px-4 py-6 flex flex-col items-center sm:flex-row sm:justify-between">
          <Footer.Copyright href="#" by="IceyCube™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} aria-label="Facebook" />
            <Footer.Icon href="#" icon={BsInstagram} aria-label="Instagram" />
            <Footer.Icon href="#" icon={BsTwitter} aria-label="Twitter" />
            <Footer.Icon href="#" icon={BsGithub} aria-label="Github" />
            <Footer.Icon href="#" icon={BsDribbble} aria-label="Dribbble" />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
