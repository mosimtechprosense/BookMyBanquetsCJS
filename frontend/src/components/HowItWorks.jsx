import { FaSearch, FaHeart, FaLock } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import howItWorksVideo from "../assets/videos/howitworks.mp4";



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

  const videoRef = useRef(null);
const [loadVideo, setLoadVideo] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setLoadVideo(true);
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  if (videoRef.current) {
    observer.observe(videoRef.current);
  }

  return () => observer.disconnect();
}, []);

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

{/* Right side - video frame */}
      {/* Right side video */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-3xl">

          <div ref={videoRef} className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-black shadow-[0_0_30px_5px_rgba(0,0,0,0.5)]">

{loadVideo && (
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
    preload="none"
    poster="../assets/howitworks-preview.avif"
    disablePictureInPicture
  >
    <source src={howItWorksVideo} type="video/mp4" />
  </video>
)}

          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
