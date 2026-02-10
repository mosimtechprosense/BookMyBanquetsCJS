import { FaSearch, FaHeart, FaLock } from "react-icons/fa";
import howItWorksVideo from "../assets/videos/howitworks.webm";

const steps = [
  {
    icon: <FaSearch className="text-white text-xl" />,
    title: "Discover",
    description: "Explore hidden gems across the Delhi NCR",
  },
  {
    icon: <FaHeart className="text-white text-xl" />,
    title: "Find your perfect match",
    description: "Tailored choice for your unique style",
  },
  {
    icon: <FaLock className="text-white text-xl" />,
    title: "Secure your venue",
    description: "Reserve your dream spot before it’s gone",
  },
];

const HowItWorks = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-16 lg:px-24 py-16 bg-[#ffffff]">
      {/* Left side - Text steps */}
      <div className="flex-1">
        <h4 className="text-[#dc2626] font-semibold uppercase mb-2 tracking-wide">
          Simple Process
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-[#06002e] mb-8">
          How it Works?
        </h2>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-5">
              <div className="bg-[#dc2626] rounded-full w-12 h-12 flex items-center justify-center shadow-md shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-[#06002e]">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - video frame with black */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-3xl rounded-xl overflow-hidden border-4 border-black shadow-[0_0_30px_5px_rgba(0,0,0,0.5)]">
          <video
            className="w-full h-auto object-cover"
            src={howItWorksVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
