import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { HiLocationMarker } from "react-icons/hi"
import { FaChevronDown } from "react-icons/fa"

const cities = ["Delhi", "Gurgaon"]

const CityFilter = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")
  const wrapperRef = useRef(null)


  useEffect(() => {
  // if user is NOT on listing page, clear dropdown
  if (!location.pathname.includes("-in/")) {
    setSelectedCity("")
    setOpen(false)
  }
}, [location.pathname])



  /* ---- outside click close ---- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (city) => {
    setSelectedCity(city)
    setOpen(false)

    const citySlug = city.toLowerCase().replace(/\s+/g, "-")
    navigate(`/banquet-hall-in/${citySlug}`)
  }

  return (
    <div ref={wrapperRef} className="relative w-[160px]">
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-3 cursor-pointer
                   rounded-xl border border-gray-300 bg-white
                   px-4 py-2.5 text-sm
                   hover:border-red-600 transition"
      >
        <div className="flex items-center gap-2">
          <HiLocationMarker className="text-lg text-gray-400" />
          <span
            className={`truncate ${
              selectedCity ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {selectedCity || "Select city"}
          </span>
        </div>

        <FaChevronDown
          className={`text-xs text-gray-400 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 right-0 mt-1 z-1100
                     rounded-xl border border-gray-300 bg-white
                     shadow-lg overflow-hidden"
        >
          {cities.map((city) => (
            <div
              key={city}
              onClick={() => handleSelect(city)}
              className="px-4 py-3 text-sm cursor-pointer border-b border-gray-100
                         hover:bg-red-50 hover:text-red-600 transition"
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CityFilter
