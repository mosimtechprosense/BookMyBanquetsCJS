import { useState, lazy, Suspense, useEffect } from "react"
import useListingsFilters from "../hooks/useListingsFilters"
import useInfiniteListings from "../hooks/useInfiniteListings"
const ListingsBreadcrumb = lazy(
  () => import("../components/listingsDetails/ListingsBreadcrumb")
)
const ListingsHeader = lazy(
  () => import("../components/listingsDetails/ListingsHeader")
)
const ListingsGrid = lazy(
  () => import("../components/listingsDetails/ListingsGrid")
)
const FiltersSidebar = lazy(
  () => import("../components/FlitersSidebar/FiltersSidebar")
)
const MobileFilters = lazy(() => import("../components/mobile/MobileFilters"))
const LocalityDescription = lazy(
  () => import("../components/listingsDetails/LocalityDescription")
)
const ScrollToTopButton = lazy(
  () => import("../components/listingsDetails/ScrollToTopButton")
)
const ListingSEO = lazy(() => import("../components/SEO/ListingSEO"))

export default function ListingsPage() {
  const { filters, pushUrl, serviceFromRoute, localities } =
    useListingsFilters()

  const {
    listings,
    totalCount,
    loading,
    hasMore,
    lastListingRef,
    isInitialLoading,
    isFetchingMore
  } = useInfiniteListings(filters)

  const [mobilePanel, setMobilePanel] = useState(null)
  const [showBelowFold, setShowBelowFold] = useState(false)

  // delay some component that dont need to load immediately:
  useEffect(() => {
    const timer = setTimeout(() => setShowBelowFold(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Dynamic SEO */}
      <Suspense fallback={null}>
        <ListingSEO
          filters={filters}
          serviceFromRoute={serviceFromRoute}
          fallbackTitle={`${serviceFromRoute || "Services"} in ${filters.locality || "All Locations"} - BookMyBanquets`}
          fallbackDescription={`Explore ${totalCount || ""} ${serviceFromRoute || "services"} available in ${filters.locality || "your area"}.`}
        />
      </Suspense>

      <Suspense fallback={null}>
        <ListingsBreadcrumb filters={filters} />
      </Suspense>

      <div className="max-w-7xl mx-auto md:flex md:space-x-6 gap-6">
        <aside className="hidden md:block w-72">
          <Suspense fallback={null}>
            <FiltersSidebar
              filters={filters}
              setFilters={pushUrl}
              localities={localities}
            />
          </Suspense>
        </aside>

        <main className="flex-1">
          <Suspense fallback={null}>
            <ListingsHeader
              filters={filters}
              totalCount={totalCount}
              serviceFromRoute={serviceFromRoute}
            />
          </Suspense>

          <Suspense fallback={null}>
            <ListingsGrid
              listings={listings}
              loading={loading}
              isInitialLoading={isInitialLoading}
              isFetchingMore={isFetchingMore}
              lastListingRef={lastListingRef}
              serviceSlug={serviceFromRoute}
            />
          </Suspense>
        </main>
      </div>

      {!hasMore && (
        <div className="text-center py-6 text-gray-400">
          No more venues to show
        </div>
      )}

      <Suspense fallback={null}>
        <LocalityDescription />
      </Suspense>

      {showBelowFold && (
        <Suspense fallback={null}>
          <MobileFilters
            open={mobilePanel}
            setOpen={setMobilePanel}
            filters={filters}
            setFilters={pushUrl}
            localities={localities}
          />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <ScrollToTopButton />
      </Suspense>
    </div>
  )
}
