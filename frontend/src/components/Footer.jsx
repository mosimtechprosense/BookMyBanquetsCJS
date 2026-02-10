import footer_logo from '../assets/footer_logo.png'
import { IoLogoFacebook } from "react-icons/io5";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { RiInstagramLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f8f8f8] pt-12 pb-5 px-8 text-black font-medium select-none">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 1️⃣ Logo + Description */}
       <div className="flex flex-col items-center md:items-start text-center md:text-left">
         <img src={footer_logo} alt="bookMyBanquetsLogo" className="w-40 h-auto mb-5"/>
           <p className="text-base leading-relaxed max-w-sm">
            Discover the most high rated wedding vendors and plan your wedding more better, forever.
        </p>
       </div>
        {/* 2️⃣ Company */}
        {/* <div>
          <h2 className="text-red-600 mb-3 text-lg">Company</h2>
          <ul className="space-y-2 text-base">
            <li><a href="#" className="hover:text-red-600">About us</a></li>
            <li><a href="#" className="hover:text-red-600">Venues</a></li>
            <li><a href="#" className="hover:text-red-600">Blog</a></li>
            <li><a href="#" className="hover:text-red-600">Why?</a></li>
          </ul>
        </div> */}

       {/* 3️⃣ Company */}
       <div>
         <h2 className="text-red-600 mb-3 text-lg">Company</h2>
         <ul className="space-y-2 text-base">
          <li>
           <Link to="/about" className="hover:text-red-600">
             About us
          </Link>
          
          </li>
<li>
  <Link to="/venues/banquet-halls" className="hover:text-red-600">
    Venues
  </Link>
</li>

         <li>
          <Link to="/blogs" className="hover:text-red-600">
            Blog
          </Link>
         </li>
         <li>
          <Link to="why-us" className="hover:text-red-600">
            Why Us?
          </Link>
         </li>
         </ul>
       </div>

       {/* 3️⃣ Support */}
       <div>
         <h2 className="text-red-600 mb-3 text-lg">Support</h2>
         <ul className="space-y-2 text-base">
          <li>
           <Link to="/contact" className="hover:text-red-600">
             Get in Touch
          </Link>
          
          </li>
          <li>
           <Link to="/terms" className="hover:text-red-600">
             Terms & Conditions
          </Link>
         </li>
         <li>
          <Link to="/privacy" className="hover:text-red-600">
            Privacy Policy 
          </Link>
         </li>
         <li>
<a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-red-600">
  Sitemap
</a>
         </li>
         </ul>
       </div>

        {/* 4️⃣ Contact */}
        <div>
          <h2 className="text-red-600 mb-3 text-lg">Contact us</h2>
          <ul className="space-y-2 text-base">
            <li>📧 info@bookmybanquets.in</li>
            <li>📞 +91 8920597474</li>
            <li>📍 40A/5, CHANDER NAGAR,<br />
                Sector 15 Part 2, Sector 15,<br />
                 Gurugram, Haryana 122001</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className=" bg-border-t border-gray-300 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto text-base">
        <h1>© 2026 Book My Banquets</h1>
        <div className="flex items-center gap-4 mt-3 md:mt-0">
          <a href="https://www.facebook.com/bookmybanquets06/" aria-label="Facebook"><IoLogoFacebook className="text-red-600 text-2xl hover:text-black transition duration-200" /></a>
          <a href="https://www.linkedin.com/in/bookmy-banquet-210784336/" aria-label="LinkedIn"><FaLinkedin className="text-red-600 text-2xl hover:text-black transition duration-200" /></a>
          <a href="https://www.instagram.com/book_my_banquets/" aria-label="Instagram"><RiInstagramLine className="text-red-600 text-2xl hover:text-black transition duration-200" /></a>
          <a href="https://www.youtube.com/@Bookmybanquets" aria-label="YouTube"><FaYoutube className="text-red-600 text-2xl hover:text-black transition duration-200" /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
