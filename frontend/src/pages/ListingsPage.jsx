import { useEffect, useMemo, useState } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import FiltersSidebar from "../components/FlitersSidebar/FiltersSidebar"
import ListingCard from "../components/ListingCards/ListingCard"
import { fetchListings, fetchLocalities } from "../api/listingsApi"
import MobileFilters from "../components/mobile/MobileFilters"
import LocalityDescription from "../components/listingsDetails/LocalityDescription"
import {
  categoryToSlug,
  slugToServiceName,
  categoryToVenuePath
} from "../utils/slugMaps"
import { ListingCardSkeleton } from "../components/common/SkeletonLoader"


export default function ListingsPage() {
  const { serviceSlug, placeSlug } = useParams()

  // Decide whether placeSlug is a city or a locality
  const CITY_LIST = [
    "delhi",
    "new-delhi",
    "gurgaon",
    "gurugram",
    "noida",
    "faridabad",
    "ghaziabad"
  ]

  const normalizedPlace = placeSlug
    ? decodeURIComponent(placeSlug).toLowerCase()
    : undefined

  const isCity = CITY_LIST.includes(normalizedPlace)

  const cityFromRoute = isCity ? normalizedPlace.replace(/-/g, " ") : undefined

  const localityFromRoute =
    !isCity && normalizedPlace ? normalizedPlace.replace(/-/g, " ") : undefined


    
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [mobilePanel, setMobilePanel] = useState(null)

  const paramsFromUrl = useMemo(() => {
    const obj = Object.fromEntries([...searchParams.entries()])
    ;[
      "skip",
      "take",
      "minBudget",
      "maxBudget",
      "minGuests",
      "maxGuests"
    ].forEach((key) => {
      if (obj[key] !== undefined) obj[key] = Number(obj[key])
    })
    ;["vegetarian", "nonVegetarian"].forEach((key) => {
      if (obj[key] === "true") obj[key] = true
      if (obj[key] === "false") obj[key] = false
    })

    return obj
  }, [searchParams])

  const initial = {
    city: cityFromRoute,
    locality: searchParams.get("locality") || localityFromRoute,

    category: paramsFromUrl.category
      ? Number(paramsFromUrl.category)
      : undefined,
    search: paramsFromUrl.search || "",
    venueType: paramsFromUrl.venueType || undefined,
    minBudget: paramsFromUrl.minBudget || undefined,
    maxBudget: paramsFromUrl.maxBudget || undefined,
    minGuests:
      paramsFromUrl.minGuests !== undefined
        ? Number(paramsFromUrl.minGuests)
        : undefined,
    maxGuests:
      paramsFromUrl.maxGuests !== undefined
        ? Number(paramsFromUrl.maxGuests)
        : undefined,
    vegetarian: paramsFromUrl.vegetarian ?? undefined,
    nonVegetarian: paramsFromUrl.nonVegetarian ?? undefined,
    sortBy: paramsFromUrl.sortBy || "created_at",
    order: paramsFromUrl.order || "desc",
    skip: paramsFromUrl.skip || 0,
    take: 10
  }

  const goPage = (pageNumber) => {
    const newSkip = (pageNumber - 1) * (filters.take || 10)
    pushUrl({ skip: newSkip })
  }

  const [filters, setFilters] = useState(initial)
  const [listings, setListings] = useState([])
  const [localities, setLocalities] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const showingFrom = totalCount === 0 ? 0 : filters.skip + 1
  const showingTo = Math.min(filters.skip + filters.take, totalCount)

  const serviceFromRoute = useMemo(() => {
    if (serviceSlug) return serviceSlug

    // fallback if route momentarily loses params
    if (filters?.category) {
      return categoryToSlug[filters.category]
    }

    return "banquet-halls" // final safety net
  }, [serviceSlug, filters?.category])

  useEffect(() => {
    const nextFilters = {
      city: cityFromRoute,
      locality: searchParams.get("locality") || localityFromRoute,

      category: searchParams.get("category")
        ? Number(searchParams.get("category"))
        : categoryToVenuePath
          ? Object.keys(categoryToSlug).find(
              (id) => categoryToSlug[id] === serviceSlug
            )
          : undefined,

      search: searchParams.get("search") || "",

      minBudget: searchParams.get("minBudget")
        ? Number(searchParams.get("minBudget"))
        : undefined,

      maxBudget: searchParams.get("maxBudget")
        ? Number(searchParams.get("maxBudget"))
        : undefined,

      minGuests: searchParams.get("minGuests")
        ? Number(searchParams.get("minGuests"))
        : undefined,

      maxGuests: searchParams.get("maxGuests")
        ? Number(searchParams.get("maxGuests"))
        : undefined,

      vegetarian: searchParams.get("vegetarian") === "true",
      nonVegetarian: searchParams.get("nonVegetarian") === "true",

      skip: searchParams.get("skip") ? Number(searchParams.get("skip")) : 0,

      take: 10,
      sortBy: "created_at",
      order: "desc"
    }

    setFilters(nextFilters)
  }, [searchParams, serviceSlug, cityFromRoute, localityFromRoute])

  useEffect(() => {
    if (filters.skip === undefined) return

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [filters.skip])

  useEffect(() => {
    fetchLocalities()
      .then((data) => setLocalities(data.data || []))
      .catch(() => setLocalities([]))
  }, [])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (value === undefined || value === null || value === "") return false
        if (
          ["minBudget", "maxBudget", "skip", "take"].includes(key) &&
          isNaN(Number(value))
        )
          return false
        return true
      })
    )

    if (cleanedFilters.minGuests === undefined) {
      cleanedFilters.minGuests = 0
    }

    if (cleanedFilters.maxGuests === undefined) {
      delete cleanedFilters.maxGuests
    }

    if (cleanedFilters.category && !cleanedFilters.search?.trim()) {
      delete cleanedFilters.search
    }

    if (
      cleanedFilters.search &&
      ["banquet hall", "banquet halls"].includes(
        cleanedFilters.search.toLowerCase().trim()
      )
    ) {
      delete cleanedFilters.search
    }

    if (cleanedFilters.city) {
      cleanedFilters.city = cleanedFilters.city.replace(/-/g, " ").toLowerCase()
    }

    if (cleanedFilters.locality) {
      // numeric locality (ID) from sidebar → ignore
      if (typeof cleanedFilters.locality === "number") {
        delete cleanedFilters.locality
      }

      // string locality (home page or URL)
      else if (typeof cleanedFilters.locality === "string") {
        cleanedFilters.locality = cleanedFilters.locality
          .replace(/-/g, " ")
          .toLowerCase()
      }

      // object locality (dropdown option)
      else if (typeof cleanedFilters.locality === "object") {
        cleanedFilters.locality =
          cleanedFilters.locality.slug ||
          cleanedFilters.locality.value ||
          cleanedFilters.locality.name

        cleanedFilters.locality = cleanedFilters.locality
          ?.replace(/-/g, " ")
          .toLowerCase()
      }
    }

    // derive mealType from filters
    if (filters.vegetarian && !filters.nonVegetarian) {
      cleanedFilters.mealType = "veg"
    }

    if (filters.nonVegetarian && !filters.vegetarian) {
      cleanedFilters.mealType = "nonVeg"
    }

    // both checked or none checked → no filtering
    delete cleanedFilters.vegetarian
    delete cleanedFilters.nonVegetarian

    fetchListings(cleanedFilters)
      .then((res) => {
        if (!mounted) return
        setListings(res.data || [])
        setTotalCount(res.total || 0)
      })
      .catch(() => {
        setListings([])
        setTotalCount(0)
      })
      .finally(() => mounted && setLoading(false))

    return () => (mounted = false)
  }, [filters])
  const pushUrl = (obj) => {
    const cityFromPath = cityFromRoute || filters.city

    const merged = {
      ...paramsFromUrl,
      ...obj,
      city: cityFromPath
    }

    // Only update locality if explicitly provided
    if (Object.prototype.hasOwnProperty.call(obj, "locality")) {
      if (!obj.locality) {
        delete merged.locality // explicit clear
      }
    } else {
      // preserve existing locality
      merged.locality = filters.locality
    }

    // Reset pagination if any filter changes (not skip itself)
    if (Object.keys(obj).some((key) => key !== "skip")) {
      merged.skip = 0
    }

    // Build query string for other filters (skip, budget, vegetarian/non-veg)
    const qs = new URLSearchParams()
    if (merged.category) qs.set("category", merged.category)
    if (merged.search) qs.set("search", merged.search)
    if (merged.skip !== undefined) qs.set("skip", merged.skip)
    if (merged.minGuests !== undefined) {
      qs.set("minGuests", merged.minGuests)
    } else {
      qs.delete("minGuests")
    }

    if (merged.maxGuests !== undefined) {
      qs.set("maxGuests", merged.maxGuests)
    } else {
      qs.delete("maxGuests")
    }

    qs.set("take", merged.take || 10)

    if (merged.vegetarian) qs.set("vegetarian", "true")
    else qs.delete("vegetarian")

    if (merged.nonVegetarian) qs.set("nonVegetarian", "true")
    else qs.delete("nonVegetarian")

    // Determine serviceSlug & localitySlug

    const categoryId = merged.category
    const resolvedServiceSlug = categoryId
      ? categoryToSlug[categoryId]
      : serviceFromRoute

    if (!resolvedServiceSlug) {
      console.warn("Missing serviceSlug, falling back to banquet-halls")
    }

    // Build base path with CITY
const citySlug = (cityFromPath || "delhi")
  .replace(/\s+/g, "-")
  .toLowerCase()

let path = `/${resolvedServiceSlug}-in-${citySlug}`

if (merged.locality && typeof merged.locality === "string") {
  const localitySlug = merged.locality
    .replace(/\s+/g, "-")
    .toLowerCase()

  path += `/${localitySlug}`
}

    if (merged.locality && typeof merged.locality === "string") {
      qs.set("locality", merged.locality.replace(/\s+/g, "-").toLowerCase())
    } else {
      qs.delete("locality")
    }

    // Navigate
    navigate(`${path}?${qs.toString()}`, { replace: false })
    setFilters(merged)
  }

  const currentPage = Math.floor((filters.skip || 0) / (filters.take || 10)) + 1
  const totalPages = Math.ceil((totalCount || 0) / (filters.take || 10)) || 1

  // PAGINATION WINDOW (max 10 buttons)
  const MAX_PAGES = 10

  const startPage = Math.floor((currentPage - 1) / MAX_PAGES) * MAX_PAGES + 1

  const endPage = Math.min(startPage + MAX_PAGES - 1, totalPages)

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  // breadcrumb logic (inline) //* seprate this as a component in future
  const venueMeta = filters.category
    ? categoryToVenuePath[filters.category]
    : null

  const localityLabel = filters.locality
    ? filters.locality.replace(/-/g, " ")
    : null

  const breadcrumbItems = [{ label: "Home", type: "home" }]

  if (venueMeta) {
    breadcrumbItems.push({
      label: venueMeta.label,
      type: "service",
      path: `${venueMeta.path}?category=${
        filters.category
      }&serviceLabel=${encodeURIComponent(venueMeta.label)}`
    })
  }

  if (venueMeta && localityLabel) {
    breadcrumbItems.push({
      label: `${venueMeta.label} in ${localityLabel}`,
      type: "current"
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="py-3 px-4 mb-3 text-sm text-red-600 "
      >
        <ol className="flex flex-wrap items-center gap-1">
          {breadcrumbItems.map((item, idx) => {
            const isLast = idx === breadcrumbItems.length - 1 // last item in array

            // Determine if breadcrumb item should be clickable
            const isClickable = () => {
              if (item.type === "home") return true
              if (item.type === "service") return !!filters.locality
              return !isLast
            }

            return (
              <li key={idx} className="flex items-center gap-1 truncate">
                <span
                  onClick={() => {
                    if (!isClickable()) return
                    if (item.type === "home") navigate("/")
                    if (item.type === "service") {
                      navigate(
                        `${venueMeta.path}?category=${filters.category}&serviceLabel=${encodeURIComponent(
                          venueMeta.label
                        )}`
                      )
                    }
                  }}
                  className={`${
                    isClickable()
                      ? "cursor-pointer font-medium text-red-600 hover:text-gray-800"
                      : "text-gray-600 cursor-default"
                  } whitespace-nowrap`}
                >
                  {item.label}
                </span>

                {/* Render slash only if not the last item */}
                {!isLast && <span className="mx-1">/</span>}
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto md:flex md:space-x-6 gap-6">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:block w-72 shrink-0">
          <FiltersSidebar
            filters={filters}
            setFilters={pushUrl}
            localities={localities}
          />
        </aside>

        {/* Listings container */}
        <main className="flex-1 space">
          {/* SCROLL TARGET */}

          {/*TOP HEADERS*/}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
              <h1 className="text-2xl font-bold">
                {filters.category
                  ? `${
                      slugToServiceName[categoryToSlug[filters.category]] ||
                      "Service"
                    }${
                      filters.locality
                        ? ` in ${filters.locality.replace(/-/g, " ")}`
                        : ""
                    }`
                  : filters.locality
                    ? `Banquet Halls in ${filters.locality.replace(/-/g, " ")}`
                    : "Banquet Halls"}
              </h1>
            </div>
            <div className="text-sm text-gray-600">{totalCount} results</div>
          </div>

          {loading ? (
  <div className="grid grid-cols-1 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <ListingCardSkeleton key={i} />
    ))}
  </div>
          ) : listings.length === 0 ? (
            <div className="p-8 bg-white rounded shadow text-center">
              No venues match your criteria- Try different{" "}
              <span className="text-red-600 font-semibold">locations.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {listings.map((l) => (
                <ListingCard
                  key={String(l.id)}
                  item={l}
                  serviceSlug={serviceSlug}
                />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-10 space-y-4">
              <p className="text-sm text-gray-500 text-center">
                Showing {showingFrom} to {showingTo} of {totalCount} results
              </p>

              <div className="flex justify-center gap-2 flex-wrap">
                {/* Prev */}
                <button
                  onClick={() => goPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-15 h-10 flex items-center justify-center rounded-lg border cursor-pointer
          text-gray-400 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>

                {/* Page Numbers */}
                {/* Page Numbers */}
                {visiblePages.map((p) => {
                  const isActive = p === currentPage

                  return (
                    <button
                      key={p}
                      onClick={() => goPage(p)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border transition cursor-pointer
        ${
          isActive
            ? "bg-red-600 text-white border-red-600"
            : "text-red-600 border-gray-300 hover:bg-gray-100"
        }`}
                    >
                      {p}
                    </button>
                  )
                })}

                {/* Next */}
                <button
                  onClick={() => goPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-15 h-10 flex items-center justify-center rounded-lg border cursor-pointer
          text-gray-400 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <LocalityDescription />

      <MobileFilters
        open={mobilePanel}
        setOpen={setMobilePanel}
        filters={filters}
        setFilters={pushUrl}
        localities={localities}
      />
    </div>
  )
}