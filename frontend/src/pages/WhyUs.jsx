import { useNavigate } from "react-router-dom";
import { MdCelebration, MdHandshake, MdStarRate, MdEventAvailable } from "react-icons/md";


const WhyUs = () => {

  const navigate = useNavigate();

  const features = [
  {
    icon: <MdCelebration className="text-3xl" />,
    title: "Exceptional Venues",
    description:
      "Discover handpicked venues including elegant banquet halls, outdoor spaces, and luxury hotels — all selected for their ambiance, amenities, and unforgettable atmosphere.",
  },
  {
    icon: <MdHandshake className="text-3xl" />,
    title: "Tailored Services",
    description:
      "Every event is unique — that’s why we offer personalized packages covering decor, catering, entertainment, logistics, and more, making your event truly one of a kind.",
  },
  {
    icon: <MdEventAvailable className="text-3xl" />,
    title: "Trusted Vendors",
    description:
      "We collaborate with the most reliable vendors — from photographers and decorators to caterers and entertainers — ensuring your celebration is in capable hands.",
  },
  {
    icon: <MdStarRate className="text-3xl" />,
    title: "Customer Satisfaction",
    description:
      "Your satisfaction is our top priority. We’re proud of our glowing reviews and repeat clients — a true reflection of the quality and care we deliver with every booking.",
  },
];

const trustedLogos = [
  { src: "https://cdn-icons-png.flaticon.com/512/4298/4298943.png", label: "Wedding Planners" },
  { src: "https://cdn-icons-png.flaticon.com/512/925/925014.png", label: "Decorators" },
  { src: "https://cdn-icons-png.flaticon.com/512/3081/3081648.png", label: "Caterers" },
  { src: "https://img.icons8.com/?size=100&id=sw74zbdDoBbt&format=png&color=000000", label: "Photographers" },
  { src: "https://cdn-icons-png.flaticon.com/512/1807/1807363.png", label: "Makeup Artists" },
  { src: "https://cdn-icons-png.flaticon.com/512/4035/4035117.png", label: "Entertainment & DJs" },
];


  return (
    <div className="w-full bg-gradient-to-b from-[#ffffff] to-[#f9f9f9] py-8 px-6 md:px-16 lg:px-24">

      {/* Breadcrumb */}
      <div className="flex items-center gap-x-2 mb-10 text-sm md:text-base">
        <h3
          className="text-red-600 font-medium cursor-pointer hover:text-gray-800"
          onClick={() => navigate("/")}
        >
          Home
        </h3>
        <span>/</span>
        <span className="text-gray-600 font-normal">Why Us</span>
      </div>

      {/* Heading */}
      <div className="w-full text-center mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-3">Why Choose Us?</h2>
        <p className="text-gray-600 text-lg italic mb-6">
          We’re more than just a booking platform — we help you craft unforgettable celebrations.
        </p>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
          Welcome to <span className="font-semibold text-[#dc2626]">BookMyBanquet’s</span>, your go-to platform for discovering and booking the perfect banquet halls for your special occasions. 
          Whether you're planning a wedding, corporate event, birthday party, or any other celebration, 
          we help you find the ideal venue that fits your style, budget, and needs.
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-16">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-5 md:w-[45%] bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="text-[#dc2626] bg-[#fdeaea] p-4 rounded-full flex-shrink-0">
              {feature.icon}
            </div>
            <div className="text-center md:text-left mt-3 md:mt-0">
              <h3 className="text-xl font-semibold text-[#dc2626] mb-2">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trusted By */}
      <div className="mt-20 text-center">
        <h4 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">
          Trusted by Event Experts Across India
        </h4>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 opacity-90">
          {trustedLogos.map((logo, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={logo.src}
                alt={logo.label}
                className="h-20 w-20 sm:h-12 sm:w-12 object-contain transition-all duration-300"
                loading="lazy"
              />
              <p className="text-gray-600 text-base sm:text-sm mt-3">{logo.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-20">
        <h3 className="text-2xl font-semibold text-[#09122C] mb-4">
          Ready to Plan Your Perfect Event?
        </h3>
        <button
            onClick={() => {
           navigate("/");
           window.scrollTo({ top: 0, behavior: "smooth" });
           }}
          className="bg-[#dc2626] text-white px-8 py-3 rounded-lg font-medium cursor-pointer hover:bg-[#b91c1c] transition-all duration-300"
          aria-label="Explore Venues"
        >
          Explore Venues
        </button>
      </div>
    </div>
  );
};

export default WhyUs;
