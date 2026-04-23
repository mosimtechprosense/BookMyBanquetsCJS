import React from "react"
import { useEffect, useState } from "react"

const RecentSearches = () => {
  const [locations, setLocations] = useState([]) // full list from API

  const API_BASE = import.meta.env.VITE_API_BASE

  // fetch locations form API
  useEffect(() => {
    fetch(`${API_BASE}/api/locations`)
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.data || [])
      })
      .catch((err) => {
        console.error("Error fetching locations:", err)
        setLocations([])
      })
  }, [API_BASE])



  const path = window.location.pathname.split("/")[1] || ""

// pages that should NOT be treated as service slugs
const invalidSlugs = [
  "services",
  "about",
  "why-us",
  "blogs",
  "contact",
  "faq",
  "terms",
  "privacy",
]

let serviceSlug = "banquet-hall"

if (path && !invalidSlugs.includes(path)) {
  serviceSlug = path.includes("-in-")
    ? path.split("-in-")[0]
    : path
}

const serviceLabel = serviceSlug
  .replace(/-/g, " ")
  .replace(/\b\w/g, (c) => c.toUpperCase())


  const handleClick = (loc) => {
    if (!loc?.name) return

    const localitySlug = loc.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")

    const citySlug =
      loc.city_name?.toLowerCase() || loc.city?.name?.toLowerCase()

    const params = new URLSearchParams(window.location.search)

    //  SAME LOGIC YOU PROVIDED
    const cleanCities = ["delhi", "gurgaon", "gurugram"]

    const isMainCity = cleanCities.includes(citySlug)

    const isExactCitySelection =
      localitySlug === citySlug ||
      loc.name.toLowerCase() === loc.city?.name?.toLowerCase()

    //  CITY CLICK
    if (isMainCity && isExactCitySelection) {
      const url = `/${serviceSlug}-in-${citySlug}`
      window.location.href = url
    }

    //  LOCALITY CLICK
    else {
      // optional: attach lat/lng like before
      if (loc.lat && loc.lng) {
        params.set("lat", loc.lat)
        params.set("lng", loc.lng)
      }

      const url = `/${serviceSlug}-in-${citySlug}/${localitySlug}${
        params.toString() ? `?${params.toString()}` : ""
      }`

      window.location.href = url
    }
  }

  return (
    <section className="bg-[#dc2626] text-white py-6 px-6 text-center relative overflow-hidden select-none">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-[#b91c1c] to-[#ef4444] opacity-90"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">
          Recent Searches
        </h2>
        <p className="text-white/80 text-sm sm:text-base mb-10">
          Explore the most popular banquet hall locations near you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-6 text-left">
          {locations.map((loc, i) => (
            <button
              id={`${loc.name
                ?.toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")}-shortcut-btn`}
              key={i}
              onClick={() => handleClick(loc)}
              className="relative group text-left text-white/90 font-medium hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span className="relative inline-block">
                {serviceLabel} in {loc.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentSearches
