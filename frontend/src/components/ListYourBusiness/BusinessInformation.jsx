import { useEffect, useRef, useState } from "react";

const businessTypes = [
  "Banquet Halls",
  "Marriage Halls",
  "Party Halls",
  "Party Lawn",
  "Other"
];

export default function BusinessInformation({ data, updateField, next, errors }) {
const [open, setOpen] = useState(false)
const dropdownRef = useRef(null);
  

// close dropdown when click outside
useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [])



  return (

    <div>

      <h2 className="text-xl font-semibold mb-6">
        Business Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="Business Name"
            value={data.businessName}
            onChange={(e)=>updateField("businessName",e.target.value)}
          />
          {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
        </div>

        <div>
          <input
           className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="Owner Name"
            value={data.ownerName}
            onChange={(e)=>updateField("ownerName",e.target.value)}
          />
          {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
        </div>

        <div>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="Email Address"
            value={data.email}
            onChange={(e)=>updateField("email",e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>


{/* business type drop down */}

<div ref={dropdownRef} className="relative w-full">
  {/* Selected box */}
  <button
    type="button"
    onClick={() => setOpen(!open)}
    className="w-full flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 bg-white text-sm text-gray-700 shadow-sm cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
  >
    {data.businessType || "Select Business Type"}

    <svg
      className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>


  {/* Dropdown options */}
<div
  className={`absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 ease-out origin-top ${
    open
      ? "opacity-100 scale-100 translate-y-0 visible"
      : "opacity-0 scale-95 -translate-y-1 invisible pointer-events-none"
  }`}
>
      {businessTypes.map((type) => (
        <div
          key={type}
          onClick={() => {
            updateField("businessType", type)
            setOpen(false)
          }}
          className="px-4 py-3 text-sm text-gray-700 cursor-pointer border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
        >
          {type}
        </div>
      ))}

    </div>

  {errors.businessType && (
    <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>
  )}

</div>



        <div>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="Phone Number"
            value={data.phone}
            onChange={(e)=>updateField("phone",e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          placeholder="Alternate Phone"
          value={data.alternatePhone}
          onChange={(e)=>updateField("alternatePhone",e.target.value)}
        />

      </div>

      <div className="flex justify-end mt-8">
        <button onClick={next} className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition cursor-pointer">
          Next
        </button>
      </div>

    </div>

  )
}