import { useNavigate, useParams, useLocation, Navigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { fetchListingById, fetchSimilarListings } from "../api/listingsApi"
import { LuArrowLeft, LuArrowRight, LuX } from "react-icons/lu"
import { MdVerified, MdVerifiedUser } from "react-icons/md"
import { UIContext } from "../store/UIContext"
import SimilarListingsSection from "../components/ListingCards/SimilarListing"
import HallCapacities from "../components/listingsDetails/HallCapacities"
import AboutSection from "../components/listingsDetails/AboutSection"
import FeaturesSection from "../components/listingsDetails/FeaturesSection"
import PoliciesSection from "../components/listingsDetails/PoliciesSection"
import FaqSection from "../components/ListingCards/FaqSection"
import CheckDiscountPrice from "../components/listingsDetails/CheckDiscountPrice"
import ScheduleVisit from "../components/listingsDetails/ScheduleVisit"
import ListingDetailsSidebar from "../components/listingsDetails/ListingDetailsSidebar"
import { categoryToSlug, categoryToVenuePath } from "../utils/slugMaps"
import { DetailsPageSkeleton } from "../components/common/SkeletonLoader"
import ListingBottomActions from "../components/listingsDetails/ListingBottomActions"
import ListingDetailsSEO from "../components/SEO/ListingDetailsSEO"
import ListingReviewsSection from "../components/reviews/ListingReview/ListingReviewsSection"
import ListingReviewForm from "../components/reviews/ListingReview/ListingReviewForm"



export default function ListingDetailsDynamic() {
  const { id, serviceSlug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [listing, setListing] = useState(null)
  const [similarListings, setSimilarListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAllKeywords, setShowAllKeywords] = useState(false)
  const { setPopupOpen } = useContext(UIContext)

  // Image modal
  const [activeImageIndex, setActiveImageIndex] = useState(null)
  const [fullImage, setFullImage] = useState(null)
  const images = listing?.venue_images ?? []
  const [validLocalities, setValidLocalities] = useState(new Set())
  const [liveViewCount, setLiveViewCount] = useState(0)

  // metch locations for brudcrumbs
  useEffect(() => {
    fetch("https://api.bookmybanquets.in/api/locations")
      .then((res) => res.json())
      .then((res) => {
        const data = res.data || []

        const set = new Set(
          data.map((loc) => loc.name?.toLowerCase().replace(/\s+/g, "-"))
        )

        setValidLocalities(set)
      })
  }, [])


  // shows the live count
useEffect(() => {
  // initial base (10–20 feels more believable than jumping to 25 instantly)
  const base = Math.floor(Math.random() * 11) + 10
  setLiveViewCount(base)

  const interval = setInterval(() => {
setLiveViewCount((prev) => {
  const change = Math.floor(Math.random() * 4) + 2

  let increaseChance = 0.7

  // reduce growth chance near max
  if (prev > 25) increaseChance = 0.3

  const increase = Math.random() < increaseChance

  let next = increase ? prev + change : prev - change

  if (next < 2) next = 2
  if (next > 30) next = 30

  return next
})
  }, 8000)

  return () => clearInterval(interval)
}, [id])

  useEffect(() => {
    //  STOP invalid cases BEFORE API calls
    if (location.pathname.startsWith("/admin") || !id || isNaN(Number(id))) {
      setLoading(false)
      return
    }

    let isMounted = true
    setLoading(true)

    Promise.all([fetchListingById(id), fetchSimilarListings(id)])
      .then(([listingRes, similarRes]) => {
        if (!isMounted) return

        const listingData = listingRes?.data?.data || listingRes?.data || null

        setListing(listingData)
        setSimilarListings(similarRes?.data || [])
      })
      .catch(() => {
        setListing(null)
        setSimilarListings([])
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [id, location.pathname])

  // load image only when click on view gallery
  useEffect(() => {
    if (
      activeImageIndex !== null &&
      listing?.venue_images?.[activeImageIndex]
    ) {
      setFullImage(null)

      const img = new Image()
      img.src = listing.venue_images[activeImageIndex].image_url

      img.onload = () => {
        setFullImage(img.src)
      }
    }
  }, [activeImageIndex, listing])

  if (loading) return <DetailsPageSkeleton />

  if (location.pathname.startsWith("/admin") || !id || isNaN(Number(id))) {
    return null
  }

  // flag logic
  const categories = Array.isArray(listing.listing_categories)
    ? listing.listing_categories.map((cat) => Number(cat.listing_category_id))
    : []

const isAssured = categories.includes(26)
const isVerified = categories.includes(27) && !isAssured

  if (!listing) {
    return (
      <div className="py-20 text-center">
        <Navigate to="/404" replace />
      </div>
    )
  }

  const keywordsArray = listing.keywords?.split(",") ?? []
  const desc = listing.description ?? ""
  const faqs = Array.isArray(listing?.faqs) ? listing.faqs : []
  const hallCapacities = Array.isArray(listing?.hall_capacities)
    ? listing.hall_capacities
    : []

  // breadcrumb logic (inline) //* seprate this as a component in future
  const serviceSlugResolved =
    serviceSlug || categoryToSlug[listing.category_id] || "banquet-hall"
  const categoryId = listing.category_id || 6
  const venueMeta = categoryToVenuePath[categoryId]

  // Breadcrumbs
  const breadcrumbItems = [
    { label: "Home", type: "home", path: "/" },
    {
      label: venueMeta?.label || "Banquet Halls",
      type: "service",
      path: `/banquet-hall?category=${categoryId}&serviceLabel=${encodeURIComponent(
        venueMeta?.label || "Banquet Halls"
      )}`
    }
  ]

  if (listing.city) {
    const localitySlug = listing.locality?.replace(/\s+/g, "-").toLowerCase()

    let cityName = listing.city?.toLowerCase()

    // normalize Delhi zones → Delhi
    if (cityName?.includes("delhi")) {
      cityName = "delhi"
    }

    const citySlug = cityName.replace(/\s+/g, "-")

    //  check if locality exists in API
    const isValidLocality = localitySlug && validLocalities.has(localitySlug)

    breadcrumbItems.push({
      label: isValidLocality
        ? `${venueMeta?.label || "Banquet Halls"} in ${listing.locality}`
        : `${venueMeta?.label || "Banquet Halls"} in ${cityName}`,
      type: "locality",
      path: isValidLocality
        ? `/${serviceSlugResolved}-in-${citySlug}/${localitySlug}`
        : `/${serviceSlugResolved}-in-${citySlug}`
    })
  }

  breadcrumbItems.push({
    label: listing.title,
    type: "current"
  })



  return (
    <div className="container mx-auto px-4 py-8 pb-28">
      {/* ListingPage SEO */}
      <ListingDetailsSEO listing={listing} />

      {/* Breadcrumb */}
<nav
  aria-label="Breadcrumb"
  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 px-4 mb-3 text-sm text-red-600"
>
  {/* LEFT: Breadcrumb */}
  <ol className="flex flex-wrap items-center gap-1 w-full sm:w-auto">
    {breadcrumbItems.map((item, idx) => {
      const isLast = item.type === "current"
      return (
        <li key={idx} className="flex items-center gap-1 truncate max-w-full">
          {!isLast ? (
            <>
              <span
                className="cursor-pointer font-medium hover:text-gray-800 whitespace-nowrap"
                onClick={() => {
                  if (!item.path) return
                  navigate(item.path)
                }}
              >
                {item.label}
              </span>

              <span className="mx-1">/</span>
            </>
          ) : (
            <span className="text-gray-600 truncate max-w-45 sm:max-w-none">
              {item.label}
            </span>
          )}
        </li>
      )
    })}
  </ol>

  {/* RIGHT: Live viewers */}
  <div className="text-green-600 font-medium flex items-center gap-2 self-start sm:self-auto">
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 border border-white"></span>
    </span>

    <span className="transition-all duration-500 text-sm">
      {liveViewCount} Viewing Now
    </span>
  </div>
</nav>

      {/* ================= IMAGE GALLERY (RECOMMENDED STYLE) ================= */}
      <div key={id} className="relative mb-12">
        {Array.isArray(images) && images.length > 1 && (
          <button
            onClick={() =>
              document
                .getElementById("imageScroll")
                ?.scrollBy({ left: -400, behavior: "smooth" })
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-5 z-20 cursor-pointer transition duration-300 ease-in-out transform hover:scale-125"
          >
            <LuArrowLeft className="h-6 w-6 cursor-pointer text-red-600" />
          </button>
        )}

        <div
          id="imageScroll"
          className="flex gap-4 overflow-x-hidden scroll-smooth no-scrollbar"
        >
          {images.map((img, i) => (
            <div
              key={img.id}
              onClick={() => setActiveImageIndex(i)}
              className="relative min-w-150 h-75 rounded-md overflow-hidden shadow cursor-pointer group"
            >
              {/* BADGES ON IMAGE */}
              <div className="absolute bottom-2 left-3 z-20 flex flex-col gap-2">
                {isAssured && (
                  <div className="flex items-center gap-1 bg-linear-to-r from-blue-600 to-cyan-500 text-white text-xs px-2 py-1 rounded-lg shadow-md backdrop-blur-sm">
                    <MdVerified className="text-sm" />
                    <span className="font-medium">BMB Assured</span>
                  </div>
                )}

                {isVerified && (
                  <div className="flex items-center gap-1 bg-linear-to-r from-green-600 to-emerald-500 text-white text-xs px-2 py-1 rounded-lg shadow-md backdrop-blur-sm">
                    <MdVerifiedUser className="text-sm" />
                    <span className="font-medium">BMB Verified</span>
                  </div>
                )}
              </div>

              <img
                src={img.image_url.replace(".avif", "_600.avif")}
                alt={listing.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover hover:scale-110 transition duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 opacity-100">
                <span className="text-black text-sm font-semibold tracking-wide bg-white/70 px-4 py-2 rounded-full">
                  View Gallery
                </span>
              </div>
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <button
            onClick={() =>
              document
                .getElementById("imageScroll")
                ?.scrollBy({ left: 400, behavior: "smooth" })
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-5 z-20 cursor-pointer transition duration-300 ease-in-out transform hover:scale-125"
          >
            <LuArrowRight className="h-6 w-6 cursor-pointer text-red-600" />
          </button>
        )}
      </div>

      {/* ================= IMAGE MODAL ================= */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-1100 flex items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white text-3xl cursor-pointer"
            onClick={() => {
              setActiveImageIndex(null)
              setFullImage(null)
            }}
          >
            <LuX />
          </button>

          <button
            className="absolute left-6 bg-white text-3xl shadow rounded-full p-5 z-20 cursor-pointer hover:text-red-600 transition duration-300 ease-in-out transform hover:scale-125"
            onClick={() =>
              setActiveImageIndex(
                activeImageIndex === 0
                  ? images.length - 1
                  : activeImageIndex - 1
              )
            }
          >
            <LuArrowLeft className="h-6 w-6" />
          </button>

          <img
            src={
              fullImage ||
              images[activeImageIndex].image_url.replace(".avif", "_600.avif")
            }
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
          />

          <button
            className="absolute right-6 bg-white text-3xl shadow rounded-full p-5 z-20 cursor-pointer hover:text-red-600 transition duration-300 ease-in-out transform hover:scale-125"
            onClick={() =>
              setActiveImageIndex(
                activeImageIndex === images.length - 1
                  ? 0
                  : activeImageIndex + 1
              )
            }
          >
            <LuArrowRight className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* ================= TITLE ================= */}
      <h1 className="text-3xl font-bold mb-2">
        {listing.title}, {listing.locality}, {listing.city}
      </h1>
      <p className="text-gray-600 mb-4">
        {listing.address},{listing.locality}, {listing.city}, {listing.state}
      </p>

      {/* ================= TAGS ================= */}
      <div className="flex flex-wrap gap-2 mb-8">
        {keywordsArray
          .slice(0, showAllKeywords ? undefined : 5)
          .map((tag, i) => (
            <span key={i} className="bg-gray-200 px-3 py-1 rounded text-sm">
              {tag.trim()}
            </span>
          ))}
        {keywordsArray.length > 5 && (
          <button
            className="text-blue-600"
            onClick={() => setShowAllKeywords(!showAllKeywords)}
          >
            {showAllKeywords ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* ===== SIDEBAR (MOBILE ONLY) ===== */}
      <div className="block lg:hidden mb-10">
        <ListingDetailsSidebar listing={listing} setPopupOpen={setPopupOpen} />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* ABOUT */}
          <AboutSection description={desc} />

          {/* HALL CAPACITY */}
          <HallCapacities hallCapacities={hallCapacities} />

          {/* CHECK DISCOUNT PRICES */}
          <CheckDiscountPrice />

          {/* FEATURES */}
          <FeaturesSection features={listing.features} />

          {/* POLICIES */}
          <PoliciesSection policies={listing.policies} />

          {/* POLICIES */}
          <ScheduleVisit policies={listing.policies} />

          {/* MAP */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Location</h2>
            <iframe
              title="map"
              width="100%"
              height="350"
              loading="lazy"
              className="rounded-lg shadow"
              src={`https://www.google.com/maps?q=${listing.lat},${listing.long}&output=embed`}
            />
          </section>

          {/* REVIEWS */}
        <ListingReviewsSection listingId={id} />

        {/* WRITE REVIEW */}
        <ListingReviewForm listingId={id} />

          {/* FAQ */}
          <FaqSection faqs={faqs} />
        </div>

        {/* RIGHT SIDEBAR (DESKTOP ONLY) */}
        <div className="hidden lg:block">
          <ListingDetailsSidebar
            listing={listing}
            setPopupOpen={setPopupOpen}
          />
        </div>
      </div>

      {/* SIMILAR LISTINGS */}
      <SimilarListingsSection listings={similarListings} />

      {/* Listing Bottom Actions  */}
      <ListingBottomActions setPopupOpen={setPopupOpen} />
    </div>
  )
}
