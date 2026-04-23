import { IoLogoFacebook, IoCall } from "react-icons/io5"
import { FaLinkedin, FaYoutube } from "react-icons/fa"
import { RiInstagramLine } from "react-icons/ri"
import HeroSection from "./HeroSection"
import { useContext } from "react"
import { UIContext } from "../store/UIContext"
import CityFilter from "./CityFilter"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { setPopupOpen } = useContext(UIContext)
  const navigate = useNavigate()

  const quoteHandler = () => {
    setPopupOpen(true)
  }
  

  const logoutHandler = () => {
  localStorage.removeItem("businessToken")
  navigate("/business/login")
  window.location.reload()
}



const storedToken = !!localStorage.getItem("businessToken")

const listBusinessHandler = () => {
  const authToken = localStorage.getItem("businessToken")

  if (authToken) {
    navigate("/business/dashboard")
  } else {
    navigate("/business/register")
  }
}

  return (
    <div>
      <div className="flex flex-col gap-0 md:flex-row items-center justify-between py-2 px-6 md:px-20 bg-white border-b border-gray-200 select-none">
        {/* Left Section: Social Icons & Phone */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/bookmybanquets06/"
              aria-label="Facebook"
            >
              <IoLogoFacebook className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a
              href="https://www.linkedin.com/in/bookmy-banquet-210784336/"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a
              href="https://www.instagram.com/book_my_banquets/"
              aria-label="Instagram"
            >
              <RiInstagramLine className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a
              href="https://www.youtube.com/@Bookmybanquets"
              aria-label="YouTube"
            >
              <FaYoutube className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 ">
            <IoCall className="text-lg text-[#dc2626]" />
            <span className="font-medium hover:text-[#dc2626] transition duration-200">
              +91 8920597474
            </span>
          </div>
        </div>

{/* Right Section: CTA + City Selector */}
<div className="flex flex-col md:flex-row items-start md:items-center justify-end gap-2 w-full md:w-auto mt-4 md:mt-0">

  {/* ✅ CityFilter FIRST in code */}
  <div className="w-full flex justify-center md:justify-start mb-2 md:mb-0 order-1 md:order-2">
    <CityFilter />
  </div>

  {/* ✅ Buttons SECOND in code */}
  <div className="flex flex-row gap-2 w-full md:w-auto justify-end order-2 md:order-1">
    <button
    id="get-a-quote-popup"
      onClick={quoteHandler}
      className="flex-1 sm:flex-none w-full sm:w-auto bg-[#dc2626] text-white text-[0.8rem] font-medium px-5 py-2.5 rounded-xl hover:bg-red-700 cursor-pointer transition duration-200 whitespace-nowrap"
    >
      Get a Quote
    </button>

    {!storedToken ? (
      <button
        onClick={listBusinessHandler}
        className="flex-1 sm:flex-none w-full sm:w-auto border border-[#dc2626] text-[#dc2626] text-[0.8rem] font-medium px-5 py-2.5 rounded-xl cursor-pointer hover:bg-[#dc2626] hover:text-white transition duration-200 whitespace-nowrap"
      >
        List Your Business
      </button>
    ) : (
      <button
        onClick={logoutHandler}
        className="flex-1 sm:flex-none w-full sm:w-auto border border-red-500 text-red-500 rounded-lg hover:bg-red-50 text-[0.8rem] font-medium px-5 py-2.5 cursor-pointer transition duration-200 whitespace-nowrap"
      >
        Logout
      </button>
    )}
  </div>
</div>




      </div>
      <HeroSection />
    </div>
  )
}

export default Navbar