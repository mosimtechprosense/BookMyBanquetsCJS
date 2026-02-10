import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=918920597474&text=Hi"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed
        bottom-18 md:bottom-6 lg:bottom-6 right-6
        z-[9999]
        flex items-center justify-center
        w-14 h-14
        bg-green-500 hover:bg-green-600
        text-white
        rounded-full
        shadow-lg
        transition
      "
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}
