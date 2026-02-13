import { useContext, useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HiLocationMarker, HiUserGroup } from "react-icons/hi"
import { UIContext } from "../../store/UIContext"
import Badge from "../listingsDetails/Badge"
import { FaPhoneAlt } from "react-icons/fa"
import FoodPrice from "../listingsDetails/FoodPrice"
import { categoryToSlug } from "../../utils/slugMaps"


export default function ListingCard({ item, serviceSlug }) {
  const { setPopupOpen } = useContext(UIContext)
  const [showTags, setShowTags] = useState(false)
  const tooltipRef = useRef(null)
  const scrollStartRef = useRef(0)
  const navigate = useNavigate()
  const images = item?.venue_images || []
  const [activeImage, setActiveImage] = useState(
    images?.[0]?.image_url || "/placeholder.jpg"
  )



  const rating = item.rating || 5
  const reviewsCount = item.reviews_count || 1

  // split tags
  const tags = item.display_tags || item.keywords?.split(",") || []
  const visibleTags = tags.slice(0, 3)
  const hiddenTags = tags.slice(3)


  // click outside closed
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setShowTags(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // closed when scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!showTags) return

      const scrolledDistance = Math.abs(window.scrollY - scrollStartRef.current)

      if (scrolledDistance > 100) {
        setShowTags(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showTags])

const resolvedServiceSlug = serviceSlug || categoryToSlug[item.category_id] || "banquet-hall"
const localitySlug = item.locality_slug || item.locality?.replace(/\s+/g, "-").toLowerCase()
const listingUrl = `/${resolvedServiceSlug}-in/${localitySlug}/${item.id}`




  return (
    <article
      onClick={() => navigate(listingUrl)}
      className="bg-white rounded-xl shadow-md flex flex-col md:flex-row hover:shadow-lg transition cursor-pointer"
    >
      {/* Image */}
      <div className="w-full md:w-1/3 p-4">
        {/* Main Image */}
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <img
            loading="lazy"
            src={activeImage}
            alt={item.title}
            className="w-full h-full object-cover transition"
          />
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {images.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                className={`w-15 h-11 rounded-md overflow-hidden border cursor-pointer ${
                  activeImage === img.image_url
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                onMouseEnter={() => setActiveImage(img.image_url)}
              >
                <img
                  src={img.image_url}
                  alt={`thumb-${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title + Rating */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold truncate">{item.title}</h3>

          {/* Rating top-right */}
          <div className="flex items-center gap-1 text-sm">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold">{rating.toFixed(1)}</span>
            <span className="text-gray-400">
              | ({reviewsCount}) {reviewsCount <= 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {item.excerpt}
        </p>

        {/* Location & Guests */}
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="flex items-center ">
            <HiLocationMarker className="h-4 w-4 text-red-600 translate-x-[-1px]" />
            {item.locality}, {item.city}
          </span>
          <span className="flex items-center gap-1">
            <HiUserGroup className="h-4 w-4 text-red-600" />
            {item.min_guest}-{item.max_guest} guests
          </span>
        </div>

        {/* Food Prices */}
        <FoodPrice vegPrice={item.vegPrice} nonVegPrice={item.nonVegPrice} />

        {/* Keywords with +more */}
        <div className="mt-3 flex flex-wrap gap-2 relative">
          {visibleTags.map((tag, idx) => (
            <Badge key={idx}>{tag.trim()}</Badge>
          ))}
          {hiddenTags.length > 0 && (
            <div ref={tooltipRef} className="relative">
              {/* Trigger */}
              <span
                className="text-xs text-red-600 font-medium cursor-pointer whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTags((prev) => {
                    if (!prev) {
                      scrollStartRef.current = window.scrollY
                    }
                    return !prev
                  })
                }}
              >
                +{hiddenTags.length} more
              </span>

              {/* Tooltip */}
              {showTags && (
                <div
                  className="
          absolute
          top-full mt-2
          left-1/2 -translate-x-1/2
          z-50
          w-72
          bg-gray-900 text-white text-xs
          rounded-lg shadow-xl
          p-3
        "
                >
                  <ul className="space-y-1">
                    {hiddenTags.map((tag, i) => (
                      <li key={i} className="flex gap-2 leading-snug">
                        <span className="mt-[2px]">•</span>
                        <span>{tag.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 sm:mt-auto md:mt-auto flex flex-row gap-2 justify-end flex-wrap">
          {/* Get a Quote */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setPopupOpen(true)
            }}
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-sm text-white px-4 py-2 rounded-xl transition cursor-pointer min-w-[120px]"
          >
            Get a Quote
          </button>

          {/* Call */}
          <a
            href="tel:918920597474"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-sm text-white px-3 py-2 rounded-xl transition min-w-[120px]"
            aria-label="Call now"
          >
            <FaPhoneAlt className="text-xs" />
            Call Us
          </a>
        </div>
      </div>
    </article>
  )
}