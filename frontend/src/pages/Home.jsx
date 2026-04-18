import { useInView } from "react-intersection-observer"
import { useState, useEffect, lazy, Suspense, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import { CiLocationOn } from "react-icons/ci"
import { IoIosSearch } from "react-icons/io"
import homeWalpaper from "../assets/homeWalpaper.avif"
import HomeSEO from "../components/SEO/HomeSEO"
const HowItWorks = lazy(() => import("../components/Home/HowItWorks"))
const Categories = lazy(() => import("../components/Home/Categories"))
const OfferBanner = lazy(() => import("../components/Home/OfferBanner"))
const RecommendedListings = lazy(
  () => import("../components/ListingCards/RecommendedListings")
)
const HighlyDemandedListings = lazy(
  () => import("../components/ListingCards/HighlyDemandedListings")
)
const HomeBlogSection = lazy(() => import("../components/Home/HomeBlogSection"))
const HomeContent = lazy(() => import("../components/Home/HomeContent"))

const LazySection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px"
  })

  return <div ref={ref}>{inView ? children : null}</div>
}

const Home = () => {
  const services = useMemo(
    () => [
      { label: "Banquet Halls", path: "/banquet-hall", categoryId: 6 },
      { label: "Marriage Halls", path: "/marriage-halls", categoryId: 8 },
      {
        label: "Wedding Farmhouse",
        path: "/wedding-farmhouse",
        categoryId: 13
      },
      { label: "Party Halls", path: "/party-halls", categoryId: 7 },
      {
        label: "5 Star Wedding Hotels",
        path: "/5-star-wedding-hotels",
        categoryId: 11
      },
      {
        label: "Destination Weddings",
        path: "/destination-weddings",
        categoryId: 12
      },
      { label: "BMB Assured", path: "/bmb-assured", categoryId: 26 },
      { label: "BMB Verified", path: "/bmb-verified", categoryId: 27 }
    ],
    []
  )

  const categoryToSlug = {
    6: "banquet-hall",
    7: "party-hall",
    8: "marriage-hall",
    11: "5-star-wedding-hotel",
    12: "destination-wedding",
    13: "wedding-farmhouse",
    26: "bmb-assured",
    27: "bmb-verified"
  }

  const API_BASE = import.meta.env.VITE_API_BASE

  const navigate = useNavigate()

  // search services state
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredServices, setFilteredServices] = useState(services)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  // search locations state
  const [locationQuery, setLocationQuery] = useState("")
  const [locations, setLocations] = useState([]) // full list from API
  const [filteredLocations, setFilteredLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [serviceError, setServiceError] = useState(false)
  const [locationError, setLocationError] = useState(false)

  // Fetch locations once on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/locations`)
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.data || [])
        setFilteredLocations(data.data || [])
      })
      .catch((err) => {
        console.error("Error fetching locations:", err)
        setLocations([])
        setFilteredLocations([])
      })
  }, [API_BASE])

  // venues & services handlers
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setServiceError(false)

    const filtered = services.filter((service) =>
      service.label.toLowerCase().startsWith(value.toLowerCase())
    )
    setFilteredServices(filtered)
  }

  const handleSelectService = (service) => {
    setSearchQuery(service.label)
    setSelectedService(service)
    setShowSuggestions(false)
  }

  // location handlers
  const handleLocationChange = (e) => {
    const value = e.target.value.toLowerCase().trim()

    setLocationQuery(value)
    setLocationError(false)

    const filtered = locations
      .map((loc) => {
        const name = loc.name?.toLowerCase() || ""
        const city = loc.city?.name?.toLowerCase() || ""

        let score = 0

        // 1. exact match = highest priority
        if (name === value || city === value) {
          score = 100
        }

        // 2. starts with match (VERY IMPORTANT for UX)
        else if (name.startsWith(value) || city.startsWith(value)) {
          score = 80
        }

        // 3. word starts match (West Delhi, East Delhi case)
        else if (
          name.split(" ").some((w) => w.startsWith(value)) ||
          city.split(" ").some((w) => w.startsWith(value))
        ) {
          score = 60
        }

        // 4. includes match (fallback)
        else if (name.includes(value) || city.includes(value)) {
          score = 30
        }

        return { ...loc, score }
      })
      .filter((loc) => loc.score > 0)
      .sort((a, b) => b.score - a.score)

    setFilteredLocations(filtered)
  }

  const handleSelectLocation = (loc) => {
    setLocationQuery(loc.name)
    setSelectedLocation(loc) // NEW
    setShowLocationSuggestions(false)
  }

  // close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false)
      setShowLocationSuggestions(false)
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // handleSearchClick
  const handleSearchClick = () => {
    let hasError = false

    const isServiceInvalid =
      !selectedService || searchQuery !== selectedService.label

    const isLocationInvalid =
      !selectedLocation || locationQuery !== selectedLocation.name

    // validate service only if needed
    if (isServiceInvalid) {
      setServiceError(true)
      hasError = true
    } else {
      setServiceError(false)
    }

    // validate location only if needed
    if (isLocationInvalid) {
      setLocationError(true)
      hasError = true
    } else {
      setLocationError(false)
    }

    if (hasError) return

    const localitySlug = selectedLocation.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .trim()

    const citySlug = selectedLocation.city_name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .trim()

    const serviceSlug =
      categoryToSlug[selectedService.categoryId] || "banquet-hall"

    const params = new URLSearchParams()
    params.set("category", selectedService.categoryId)

    //  IMPORTANT: Send coordinates
    if (selectedLocation.lat && selectedLocation.lng) {
      params.set("lat", selectedLocation.lat)
      params.set("lng", selectedLocation.lng)
    }

    const cleanCities = ["delhi", "gurgaon", "gurugram"]

    const isMainCity = cleanCities.includes(citySlug)

    // detect if user selected EXACT city (not locality)
    const isExactCitySelection =
      localitySlug === citySlug ||
      selectedLocation.name.toLowerCase() ===
        selectedLocation.city?.name?.toLowerCase()

    if (isMainCity && isExactCitySelection) {
      //  Only when user selects "Delhi" itself
      navigate(`/${serviceSlug}-in-${citySlug}`)
    } else {
      //  All localities (including North Delhi, Moti Nagar, etc.)
      navigate(
        `/${serviceSlug}-in-${citySlug}/${localitySlug}?${params.toString()}`
      )
    }
  }

  return (
    <div className="w-full select-none">
      {/* SEO section */}
      <HomeSEO />

      {/*  Hero Section */}
      <div className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        <img
          src={homeWalpaper}
          alt="Wedding venue background"
          fetchpriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/*  Hero Text */}
        <div className="relative top-16 sm:top-7 z-10 text-center px-4 sm:px-6 mb-6">
          <h1
            className="text-xl sm:text-4xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-snug select-none"
            style={{
              textShadow: "2px 2px 10px rgba(0,0,0,0.8)"
            }}
          >
            Elegant Spaces Seamless Booking a Better Way to Plan Weddings
          </h1>
        </div>

        {/*  Search Bar */}
        <div className="flex items-center justify-center w-full px-6">
          <div
            className={`relative top-15 sm:top-5 flex flex-col sm:flex-row  bg-white ${serviceError || locationError ? "border-2 border-red-500" : "border border-[#b4b4be]"} rounded-md shadow-md w-[98%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] max-w-275`}
          >
            {/*  Venues & Services Input */}
            <div
              className={`relative flex items-center gap-2 w-full sm:w-[60%] py-4 px-5 text-[15px] border-b sm:border-b-0 
               ${serviceError || locationError ? "sm:border-r-2 border-red-500" : "sm:border-r border-gray-300"}`}
            >
              <IoIosSearch className="text-gray-700 text-xl cursor-default" />
              <input
                type="text"
                placeholder="Search for venues, decor, services..."
                className="w-full text-gray-700 placeholder-gray-500 outline-none cursor-pointer select-none"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  setShowSuggestions(true)
                  setShowLocationSuggestions(false)
                }}
                onClick={(e) => e.stopPropagation()}
              />

              {serviceError && (
                <p className="text-red-500 text-sm mt-1">
                  Please select a service
                </p>
              )}

              {showSuggestions && (
                <div
                  className="absolute top-full left-0 w-full bg-white border border-gray-300 max-h-56.25 sm:max-h-41.25 overflow-y-auto z-50 shadow-md rounded scrollbar-hide"
                  onClick={(e) => e.stopPropagation()}
                >
                  {filteredServices.length > 0 ? (
                    filteredServices.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectService(item)}
                        className="flex items-center px-3.5 py-3 text-gray-700 text-sm border-b border-gray-100 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="mr-3 p-2 rounded-full bg-gray-100">
                          <IoIosSearch className="text-gray-500" />
                        </div>
                        <span className="text-[#414146]">{item.label}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-400 text-sm">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/*  Location Input */}
            <div
              className={`relative flex items-center gap-1.5 w-full sm:w-[40%] py-4 px-5 text-[14px] bg-white rounded-r-xs 
  ${locationError ? "border-red-500" : "border-gray-300"}`}
            >
              <CiLocationOn className="text-gray-700 text-xl cursor-default" />
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full text-gray-700 placeholder-gray-500 outline-none cursor-pointer select-none"
                value={locationQuery}
                onChange={handleLocationChange}
                onFocus={() => {
                  setShowLocationSuggestions(true)
                  setShowSuggestions(false)
                }}
                onClick={(e) => e.stopPropagation()}
              />
              {locationError && (
                <p className="text-red-500 text-sm mt-1">
                  Please select a location
                </p>
              )}

              {showLocationSuggestions && filteredLocations.length > 0 && (
                <div
                  className="absolute top-[98%] left-0 w-full bg-white border border-gray-300 max-h-56.25 sm:max-h-42.5 overflow-y-auto z-200 shadow-lg rounded-b-sm scrollbar-hide"
                  onClick={(e) => e.stopPropagation()}
                >
                  {filteredLocations.map((loc, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectLocation(loc)}
                      className="flex items-center px-3 py-2.5 z-100 text-black text-sm outline-none border-b border-gray-100 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="mr-3 p-2 rounded-full bg-gray-100">
                        <CiLocationOn className="text-gray-500" />
                      </div>

                      <div>
                        <h5 className="text-m text-[#414146]">{loc.name}</h5>
                        {loc.city?.name && (
                          <h6 className="text-xs text-[#787887]">
                            {loc.city.name}
                          </h6>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/*  Search Button */}
            <button
              onClick={handleSearchClick}
              className="bg-[#dc2626] text-white px-7 py-4 z-0 rounded-r-md flex items-center justify-center cursor-pointer hover:bg-[#b91c1c] transition-all w-full sm:w-auto text-base font-semibold"
            >
              {/* Show icon on larger screens, text on small screens */}
              <span className="block sm:hidden">Search</span>
              <FaSearch className="hidden sm:block w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/*  Offer Banner */}
      <LazySection>
        <Suspense fallback={null}>
          <OfferBanner />
        </Suspense>
      </LazySection>

      {/*  Category section */}
      <LazySection>
        <Suspense fallback={null}>
          <Categories />
        </Suspense>
      </LazySection>

      {/*Recommended listing Section*/}
      <LazySection>
        <Suspense fallback={null}>
          <RecommendedListings />
        </Suspense>
      </LazySection>

      {/*Highly Demanded listing Section*/}
      <LazySection>
        <Suspense fallback={null}>
          <HighlyDemandedListings />
        </Suspense>
      </LazySection>

      {/* hide temp */}
      {/* Customer Review Section */}
      {/* <LazySection>
        <Suspense fallback={null}>
          <CustomerReview />
        </Suspense>
      </LazySection> */}

      {/*How It Works Section*/}
      <LazySection>
        <Suspense fallback={null}>
          <HowItWorks />
        </Suspense>
      </LazySection>

      {/*Home Blogs Section*/}
      <LazySection>
        <Suspense fallback={null}>
          <HomeBlogSection />
        </Suspense>
      </LazySection>

      {/*Home Content Section*/}
      <LazySection>
        <Suspense fallback={null}>
          <HomeContent />
        </Suspense>
      </LazySection>
    </div>
  )
}

export default Home
