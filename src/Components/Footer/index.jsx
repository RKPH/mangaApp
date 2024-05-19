import { Footer } from "flowbite-react";
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
          <div className="grid w-full grid-cols-2 gap-4 text-center md:grid-cols-4 md:text-left">
            <div className="flex flex-col">
              <Footer.Title className="text-white" title="Company" />
              <Footer.LinkGroup col>
                <Footer.Link className="text-white" href="#">
                  About
                </Footer.Link>
                <Footer.Link className="text-white" href="#">
                  Careers
                </Footer.Link>
                <Footer.Link className="text-white" href="#">
                  Brand Center
                </Footer.Link>
                <Footer.Link className="text-white" href="#">
                  Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="flex flex-col">
              <Footer.Title className="text-white" title="Help Center" />
              <Footer.LinkGroup className="text-white" col>
                <Footer.Link href="#">Discord Server</Footer.Link>
                <Footer.Link href="#">Twitter</Footer.Link>
                <Footer.Link href="#">Facebook</Footer.Link>
                <Footer.Link href="#">Contact Us</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="flex flex-col">
              <Footer.Title className="text-white" title="Legal" />
              <Footer.LinkGroup className="text-white" col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Licensing</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="flex flex-col">
              <Footer.Title className="text-white" title="Download" />
              <Footer.LinkGroup className="text-white" col>
                <Footer.Link href="#">iOS</Footer.Link>
                <Footer.Link href="#">Android</Footer.Link>
                <Footer.Link href="#">Windows</Footer.Link>
                <Footer.Link href="#">MacOS</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-800 px-4 py-6 flex flex-col items-center sm:flex-row sm:justify-between">
          <Footer.Copyright href="#" by="IceyCube™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
