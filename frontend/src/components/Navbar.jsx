import { IoLogoFacebook, IoCall } from "react-icons/io5";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { RiInstagramLine } from "react-icons/ri";
import HeroSection from "./HeroSection";
import { useContext } from "react";
import { UIContext } from "../store/UIContext";
import CityFilter from "./CityFilter";


const Navbar = () => {

    const { setPopupOpen } = useContext(UIContext);

    const quoteHandler = () => {
       setPopupOpen(true)
    }


  return (
    <div>
      <div className="flex flex-col gap-0 md:flex-row items-center justify-between py-2 px-6 md:px-20 bg-white border-b border-gray-200 select-none">
        {/* Left Section: Social Icons & Phone */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/bookmybanquets06/" aria-label="Facebook">
              <IoLogoFacebook className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a href="https://www.linkedin.com/in/bookmy-banquet-210784336/" aria-label="LinkedIn">
              <FaLinkedin className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a href="https://www.instagram.com/book_my_banquets/" aria-label="Instagram">
              <RiInstagramLine className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a href="https://www.youtube.com/@Bookmybanquets" aria-label="YouTube">
              <FaYoutube className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 ">
            <IoCall className="text-lg text-[#dc2626]" />
            <a href="#" aria-label="Call">
              <span className="font-medium hover:text-[#dc2626] transition duration-200">
                +91 8920597474
              </span>
            </a>
          </div>
        </div>

        {/* Right Section: CTA + City Selector */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button onClick={quoteHandler} className="bg-[#dc2626] text-white text-[0.8rem] font-medium px-5 py-2.5 rounded-xl hover:bg-red-700 cursor-pointer transition duration-200 whitespace-nowrap">
            Get a Quote
          </button>


          {/* city filter */}
         <CityFilter />

        </div>
      </div>
      <HeroSection/>
      

    </div>
  );
};

export default Navbar;