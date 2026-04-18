import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import { HiUserGroup } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import FoodPrice from "../listingsDetails/FoodPrice"
import { MdVerified, MdVerifiedUser } from "react-icons/md"
import { stripHTML } from "../../utils/stripHTML.js"

const HighlyDemandedListings = () => {
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const animationRef = useRef(null)
  const isInteracting = useRef(false)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  const reorderListings = (data) => {
    const index = data.findIndex((item) => Number(item.id) === 752)

    if (index === -1) return data

    const updated = [...data]
    const [target] = updated.splice(index, 1)
    updated.splice(5, 0, target) // 4th position

    return updated
  }

  const API_BASE = import.meta.env.VITE_API_BASE

  // FETCH
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/listings/high-demand`)
        const apiData = (res.data.data || []).map((item) => ({
          ...item,
          id: Number(item.id)
        }))

        setListings(reorderListings(apiData))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [API_BASE])

  const infiniteListings = [...listings, ...listings, ...listings]

  // AUTO SCROLL
  useEffect(() => {
    const container = scrollRef.current
    if (!container || listings.length === 0) return

    const speed = 0.5

    const animate = () => {
      if (!isInteracting.current && !isDragging.current) {
        container.scrollLeft += speed
        if (container.scrollLeft >= container.scrollWidth / 3) {
          container.scrollLeft = 0
        }
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [listings])

  // MOUSE DRAG SCROLL
  const onMouseDown = (e) => {
    isDragging.current = true
    isInteracting.current = true
    startX.current = e.pageX
    scrollStart.current = scrollRef.current.scrollLeft
  }

  const onMouseMove = (e) => {
    if (!isDragging.current) return
    const walk = (e.pageX - startX.current) * 1.2
    scrollRef.current.scrollLeft = scrollStart.current - walk
  }

  const stopDragging = () => {
    isDragging.current = false
  }

  // ARROW CLICK HANDLER
  const handleArrow = (direction) => {
    isInteracting.current = true
    scrollRef.current.scrollBy({
      left: direction * 300,
      behavior: "smooth"
    })
    setTimeout(() => {
      isInteracting.current = false
    }, 800)
  }

  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-semibold text-gray-600">
        Loading highly demanded listings...
      </div>
    )
  }

  return (
    <section className="pt-8 relative">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Highly Demanded Halls
        </h2>
        <button
          onClick={() => navigate("/banquet-hall")}
          className="text-md font-semibold text-red-600 hover:text-red-700 cursor-pointer"
        >
          View All →
        </button>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={() => handleArrow(-1)}
        className="hidden sm:block absolute left-0 sm:left-10 top-1/2 -translate-y-1/2
        bg-white shadow rounded-full px-4 sm:px-5 py-4 sm:py-5 z-20
        transition duration-300 ease-in-out transform hover:scale-125 hover:text-red-600"
      >
        <LuArrowLeft className="h-6 w-6 cursor-pointer" />
      </button>

      {/* SCROLLER */}
      <div
        ref={scrollRef}
        onMouseEnter={() => {
          isInteracting.current = true
        }}
        onMouseLeave={() => {
          isInteracting.current = false
          isDragging.current = false
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onTouchStart={() => {
          isInteracting.current = true
        }}
        onTouchEnd={() => {
          isInteracting.current = false
        }}
        onTouchCancel={() => {
          isInteracting.current = false
        }}
        className="
          flex gap-6
          overflow-x-auto
          no-scrollbar
          select-none
          px-16 md:px-8 py-10
          cursor-grab active:cursor-grabbing
        "
      >
        {infiniteListings.map((item, index) => {
          const categories = Array.isArray(item.listing_categories)
            ? item.listing_categories.map((cat) =>
                Number(cat.listing_category_id)
              )
            : []

          const isAssured = categories.includes(26)
          const isVerified = categories.includes(27) && !isAssured

          return (
            <div
              key={`${item.id}-${index}`}
              className="
      min-w-[105%] sm:min-w-82.5
max-w-full sm:max-w-82.5
              p-4 bg-white rounded-xl shadow
              [0_8px_24px_rgba(0,0,0,0.1)]
              hover:shadow-[0px_6px_12px_rgba(0,0,0,0.35)]
              transition-all duration-300
              overflow-hidden group cursor-pointer shrink-0
            "
              onClick={() =>
                navigate(
                  `/banquet-hall-in/${item.locality
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}/${item.id}`
                )
              }
            >
              <div className="h-42 w-full rounded-md overflow-hidden relative">
                {/* BADGES ON IMAGE */}
                <div className="absolute top-2 left-2 z-20 flex flex-col gap-2">
                  {isAssured && (
                    <div className="flex items-center gap-1 bg-linear-to-r from-blue-600 to-cyan-500 text-white text-xs px-2 py-1 rounded-md shadow-md">
                      <MdVerified className="text-xs" />
                      <span className="font-medium">BMB Assured</span>
                    </div>
                  )}

                  {isVerified && (
                    <div className="flex items-center gap-1 bg-linear-to-r from-green-600 to-emerald-500 text-white text-xs px-2 py-1 rounded-md shadow-md">
                      <MdVerifiedUser className="text-xs" />
                      <span className="font-medium">BMB Verified</span>
                    </div>
                  )}
                </div>

                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-all duration-500"
                />
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {stripHTML(item.excerpt, 100) || "Beautiful banquet venue"}
                </p>
                <div className="mt-3 flex items-center text-sm font-medium">
                  <HiUserGroup className="h-4 w-4 mr-1" />
                  {item.capacityFrom}-{item.capacityTo} Guests
                </div>
                <div className="mt-3 ">
                  <FoodPrice
                    vegPrice={item.vegPrice}
                    nonVegPrice={item.nonVegPrice}
                  />
                </div>
                <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 cursor-pointer">
                  View Detail
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={() => handleArrow(1)}
        className="hidden sm:block absolute right-0 sm:right-10 top-1/2 -translate-y-1/2
        bg-white shadow rounded-full px-4 sm:px-5 py-4 sm:py-5 z-20
        transition duration-300 ease-in-out transform hover:scale-125 hover:text-red-600"
      >
        <LuArrowRight className="h-6 w-6 cursor-pointer" />
      </button>
    </section>
  )
}

export default HighlyDemandedListings
