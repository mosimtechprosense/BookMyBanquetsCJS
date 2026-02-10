import { useEffect, useRef } from "react"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import { HiUserGroup } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import FoodPrice from "../listingsDetails/FoodPrice"

export default function SimilarListingsSection({ listings }) {
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const animationRef = useRef(null)
  const isInteracting = useRef(false)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

 

  const infiniteListings = [...listings, ...listings, ...listings]

  // AUTO SCROLL
  useEffect(() => {
     if (!Array.isArray(listings) || listings.length === 0) return null
     
    const container = scrollRef.current
    if (!container) return

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

  // MOUSE DRAG
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

  // ARROW SCROLL
  const handleArrow = (direction) => {
    isInteracting.current = true
    scrollRef.current.scrollBy({
      left: direction * 300,
      behavior: "smooth"
    })
    setTimeout(() => (isInteracting.current = false), 800)
  }

  return (
    <section className="w-full pt-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center md:px-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Similar Banquet Halls
        </h2>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={() => handleArrow(-1)}
        className="hidden sm:block absolute left-6 top-1/2 -translate-y-1/2 bg-white shadow rounded-full px-5 py-5 z-20 hover:scale-110 transition cursor-pointer"
      >
        <LuArrowLeft className="h-6 w-6" />
      </button>

      {/* SCROLL CONTAINER */}
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
        className="flex gap-6 overflow-x-auto no-scrollbar select-none px-16 md:px-8 py-10 cursor-grab active:cursor-grabbing"
      >
        {infiniteListings.map((item, index) => (
          <div
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/banquet-hall-in/${item.locality}/${item.id}`)
            }}
            key={`${item.id}-${index}`}
            className="min-w-[105%] sm:min-w-[330px] max-w-full sm:max-w-[330px] p-4 bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:shadow-[0px_6px_12px_rgba(0,0,0,0.35)] transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Image */}
            <div className="h-42 w-full rounded-md overflow-hidden">
              <img
                src={item.venue_images?.[0]?.image_url || "/placeholder.jpg"}
                alt={item.title}
                className="h-full w-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="pt-4 space-y-2">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.excerpt || "Beautiful banquet venue"}
              </p>
              <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
                <HiUserGroup className="h-4 w-4 text-red-600" />
                {item.min_guest} – {item.max_guest} guests
              </div>
              <FoodPrice
                vegPrice={item.vegPrice}
                nonVegPrice={item.nonVegPrice}
                iconSize={14}
                gap="gap-3"
              />

              {/* VIEW DETAIL BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/banquet-hall-in/${item.locality}/${item.id}`)
                }}
                className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                View Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={() => handleArrow(1)}
        className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 bg-white shadow rounded-full px-5 py-5 z-20 hover:scale-110 transition cursor-pointer"
      >
        <LuArrowRight className="h-6 w-6" />
      </button>
    </section>
  )
}