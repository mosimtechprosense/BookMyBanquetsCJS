import { useState, useEffect, useRef, useContext } from "react"
import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"
import { UIContext } from "../store/UIContext"

const DiscountPopup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const popupRef = useRef(null);
  const { menuOpen, popupOpen, setPopupOpen } = useContext(UIContext);


  const API_BASE = import.meta.env.VITE_API_BASE;



  //* Handle reopen logic
useEffect(() => {
  let timer;

  const alreadySubmitted =
    sessionStorage.getItem("discountPopupSubmitted") === "true";

  if (alreadySubmitted) return; //  never reopen in this session

  const startTimer = () => {
    timer = setTimeout(() => setPopupOpen(true), 30000);
  };

  if (!popupOpen && name === "" && phone === "" && !menuOpen) {
    const debounce = setTimeout(startTimer, 500);
    return () => {
      clearTimeout(timer);
      clearTimeout(debounce);
    };
  }

  return () => clearTimeout(timer);
}, [popupOpen, setPopupOpen, name, phone, menuOpen]);




//* Disable scroll but preserve scrollbar space (no layout shift)/(scroll lock + layout stability.)

useEffect(() => {
  if (popupOpen) {
    // Calculate scrollbar width
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Disable scroll and add padding to prevent layout shift
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  } else {
    // Re-enable scroll and reset padding
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
  }

  // Cleanup: ensure scroll and padding reset if component unmounts while popupOpen
  return () => {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
  };
}, [popupOpen]);



  //* Close popup on outside click
useEffect(() => {
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupOpen(false);
    }
  };

  if (popupOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [popupOpen, setPopupOpen]);



  //* Validation & Error Handler
  const validateForm = () => {
    let valid = true
    setNameError("")
    setPhoneError("")

    if (name.trim().length < 3) {
      setNameError("Please enter a valid name (min 3 characters)")
      valid = false
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number")
      valid = false
    }

    return valid
  }



  //* Submit handler
const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  if (!validateForm()) return;

  setIsSubmitting(true);

  Toastify({
    text: "✅ Success! Our team will contact you shortly!",
    duration: 4000,
    gravity: "top",
    position: window.innerWidth <= 768 ? "center" : "right",
    className: "custom-toast text-white text-sm rounded-xl py-0 shadow-lg",
    style: {
      background: "#141414",
      width: "clamp(260px, 90%, 380px)",
      whiteSpace: "pre-line",
      wordBreak: "keep-all",
      textAlign: "center",
      borderRadius: "10px",
      margin: "0 auto",
      boxSizing: "border-box",
    },
    close: true
  }).showToast();

  try {
    await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email: "",
        message: "Discount request form"
      })
    });

    // ✅ mark submitted for THIS session
    sessionStorage.setItem("discountPopupSubmitted", "true");

    setPopupOpen(false);
    setName("");
    setPhone("");
  } catch (error) {
    console.error(error);
    Toastify({
      text: "❌ Failed to send request. Please try again.",
      duration: 3000,
      gravity: "top",
      position: window.innerWidth <= 768 ? "center" : "right",
      style: { background: "#dc2626", borderRadius: "10px", textAlign: "center" }
    }).showToast();
  } finally {
    setIsSubmitting(false);
  }
};






  if (!popupOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-1000 animate-fadeInSmooth select-none">
      <div
        ref={popupRef}
        className="popup-box bg-white w-[85%] sm:w-[400px] rounded-2xl shadow-2xl relative animate-fadeInSmooth p-6"
      >
        <div className="relative">
          <img
            src="/dialog.avif"
            alt="Wedding discount banner"
            className="w-full h-32 sm:h-40 object-cover rounded-2xl my-4"
          />

          <h2 className=" absolute bottom-2 left-2 text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_0_15px_#000]">
            Hurry Get 50% OFF!
          </h2>
        </div>
        <button
          className={`absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl cursor-pointer`}
          onClick={() => setPopupOpen(false)}
        >
          ✕
        </button>

        <p
          className={`mb-5 text-center transition-all duration-200 text-gray-600`}
        >
          Fill in your details to unlock your exclusive wedding discount
        </p>
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <label
              className="absolute -top-0.5 left-3 bg-white px-1 text-sm text-gray-500 font-semibold"
              htmlFor="name"
            >
              Enter Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => {
                setName(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                )

                if (nameError) setNameError("")
              }}
              className={`w-full border ${
                nameError ? "border-red-500" : "border-gray-400"
              } rounded-md px-3 py-2 mt-2 text-gray-700 focus:outline-none focus:ring-2 ${
                nameError ? "focus:ring-red-400" : "focus:ring-gray-400"
              }`}
              required
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
          </div>

          {/* Phone Input */}
          <div className="relative">
            <label
              className="absolute -top-0.5 left-3 bg-white px-1 text-sm text-gray-500 font-semibold"
              htmlFor="phone"
            >
              Enter your Mobile Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder=" "
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                if (phoneError) setPhoneError("")
              }}
              className={`w-full border ${
                phoneError ? "border-red-500" : "border-gray-400"
              } rounded-md px-3 py-2 mt-2 text-gray-700 focus:outline-none focus:ring-2 ${
                phoneError ? "focus:ring-red-400" : "focus:ring-gray-400"
              }`}
              required
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
             className={`w-full bg-[#dc2626] text-white font-semibold py-2 rounded-md transition-all
             ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#b91c1c] cursor-pointer"}`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default DiscountPopup
