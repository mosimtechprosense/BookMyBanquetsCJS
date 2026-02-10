import React, { useContext } from "react"
import { UIContext } from "../store/UIContext"
import {
  caterers,
  decor,
  makeup,
  mehendi,
  photographers,
  venues
} from "../assets"
import { useNavigate } from "react-router-dom"

const Services = () => {
  const { setPopupOpen } = useContext(UIContext)
  const navigate = useNavigate()

  const services = [
    {
      title: "Venues",
      desc: "Banquet Halls, Marriage Gardens, Lawns",
      img: venues,
      bg: "bg-[#d7e1ff]"
    },
    {
      title: "Photographers",
      desc: "Wedding & Candid Photography",
      img: photographers,
      bg: "bg-[#f6d5b0]"
    },
    {
      title: "Makeup",
      desc: "Bridal & Family Makeup Artists",
      img: makeup,
      bg: "bg-[#eac1b2]"
    },
    {
      title: "Planning & Décor",
      desc: "Wedding Planners & Decorators",
      img: decor,
      bg: "bg-[#f7b58c]"
    },
    {
      title: "Caterers",
      desc: "Customized Menus for Every Event",
      img: caterers,
      bg: "bg-[#fae3cc]"
    },
    {
      title: "Mehendi",
      desc: "Bridal & Traditional Mehendi Artists",
      img: mehendi,
      bg: "bg-[#edd4c2]"
    }
  ]

  return (
    <section className="w-full bg-white py-8 px-6 sm:px-8 md:px-12 lg:px-24 select-none">
      {/* Breadcrumb */}
      <div className="flex items-center gap-x-2 mb-8 text-sm md:text-base">
        <h3
          className="text-red-600 font-medium cursor-pointer hover:text-gray-800"
          onClick={() => navigate("/")}
        >
          Home
        </h3>
        <span>/</span>
        <span className="text-gray-600 font-normal">Services</span>
      </div>

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#06002e]">
          Our Services
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Everything you need to plan a perfect wedding, curated from trusted
          professionals.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`group flex items-center justify-between ${service.bg} rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-[140px]`}
          >
            {/* Text */}
            <div className="flex flex-col justify-center px-6 py-4 w-[65%]">
              <h3 className="text-lg sm:text-xl font-semibold text-[#06002e]">
                {service.title}
              </h3>

              <p className="text-sm text-gray-700 mt-1 leading-snug">
                {service.desc}
              </p>

              {/* Get a Quote */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setPopupOpen(true)
                }}
                className="
    w-32
    mt-5
    inline-flex items-center gap-2
    px-3 py-1.5
    text-sm font-semibold
    text-white
    bg-red-600
    rounded-lg
    shadow-sm
    cursor-pointer
    hover:bg-red-700
    hover:gap-3
    transition-all
  "
              >
                Get a Quote
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            {/* Image */}
            <div className="w-[35%] h-full relative">
              <div className="absolute inset-0 rounded-l-full overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
