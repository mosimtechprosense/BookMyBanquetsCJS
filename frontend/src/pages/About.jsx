import { about1img, about2img, about3img } from "../assets/index";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const founders = [
    {
      name: "Sanjay Pathak",
      img: "/temp.png",
      exp: "8 years+ experience in wedding management",
      title: "Founder",
    },
    {
      name: "Raj Rajput",
      img: "/temp.png",
      exp: "5 years+ experience in wedding management",
      title: "Co-Founder",
    },
    {
      name: "Gaurav Chauhan",
      img: "/temp.png",
      exp: "3 years+ experience in wedding management",
      title: "Co-Founder",
    },
  ];

  return (
    <div className="w-full bg-[#ffffff] py-8 px-6 md:px-16 lg:px-24">
      {/* breadcrumb navigation */}
      <div className="flex items-center gap-x-2 mb-10">
        <h3
          className="text-red-600 font-medium cursor-pointer hover:text-gray-800"
          onClick={() => navigate("/")}
        >
          Home
        </h3>
        <span>/</span>
        <span className="text-gray-600 font-normal">About</span>
      </div>

      {/* first About Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mt-4">
        {/* first Left Text Section */}
        <div className="md:w-1/2 text-center md:text-left order-1">
          <h3 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">
            About Us
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            BookMyBanquets simplifies event planning by connecting you with
            premium venues and services, ensuring unforgettable celebrations
            with ease and elegance.
          </p>
        </div>

        {/* first Right Image Section */}
        <div className="md:w-1/2 flex justify-center order-2">
          <img
            src={about1img}
            alt="About Us"
            className="rounded-lg shadow-md w-full max-w-md object-cover"
          />
        </div>
      </div>

      {/* Second About Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 my-25">
        {/* Second Left Image Section */}
        <div className="md:w-1/2 flex justify-center order-2 md:order-1">
          <img
            src={about2img}
            alt="About Us"
            className="rounded-lg shadow-md w-full max-w-md object-cover"
          />
        </div>

        {/* Second Right Text Section */}
        <div className="md:w-1/2 text-center md:text-left order-1 md:order-2">
          <h3 className="text-3xl md:text-4xl font-bold text-[#09122C] mb-4">
            Discover and Book the Ideal Venue for Every Occasion
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            At BookMyBanquet, we make event planning effortless by connecting
            you with the finest banquet halls and venues. Whether it’s a
            wedding, birthday, or corporate event, our platform helps you
            explore, compare, and book the perfect space that fits your budget
            and style — ensuring every celebration is truly memorable. With
            trusted partners, transparent pricing, and personalized assistance,
            we turn your vision into reality, creating experiences that leave
            lasting impressions.
          </p>
        </div>
      </div>

      {/* Third About Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Third Left Text Section */}
        <div className="md:w-1/2 text-center md:text-left order-1">
          <h3 className="text-3xl md:text-4xl font-bold text-[#09122C] mb-4">
            Your Hassle-Free Partner for Memorable Celebrations
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            At BookMyBanquet, we simplify event planning with an easy way to
            discover, compare, and book stunning venues for every occasion. From
            weddings and engagements to birthdays and corporate events, our team
            ensures a stress-free experience from start to finish. With verified
            venues, transparent pricing, and personalized support, we handle the
            details so you can focus on creating lasting memories effortlessly.
          </p>
        </div>

        {/* Third Right Image Section */}
        <div className="md:w-1/2 flex justify-center order-2">
          <img
            src={about3img}
            alt="About Us"
            className="rounded-lg shadow-md w-full max-w-md object-cover"
          />
        </div>
      </div>

      {/* Founder & Co-Founders Section */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-[#09122C] mb-10">
          BookMyBanquet’s Founder & Co-Founders
        </h3>

        {/* Flex Cards */}
        <div className="flex flex-wrap justify-center gap-10">
          {founders.map((data) => (
            <div
              key={data.name}
              className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 flex flex-col items-center text-center border border-gray-100 w-[280px] sm:w-[300px]"
            >
              <img
                src={data.img}
                alt={data.name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-[#505050] shadow-[0_0_12px_#f52a2a]"
              />
              <h4 className="text-xl font-semibold text-[#09122C]">
                {data.name}
              </h4>
              <p className="text-[#dc2626] font-medium">{data.title}</p>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                {data.exp}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
