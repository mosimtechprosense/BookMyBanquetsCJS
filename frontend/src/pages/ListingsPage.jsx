

import { useState } from "react"
import useListingsFilters from "../hooks/useListingsFilters"
import useInfiniteListings from "../hooks/useInfiniteListings"
import ListingsBreadcrumb from "../components/listingsDetails/ListingsBreadcrumb"
import FiltersSidebar from "../components/FlitersSidebar/FiltersSidebar"
import ListingsHeader from "../components/listingsDetails/ListingsHeader"
import ListingsGrid from "../components/listingsDetails/ListingsGrid"
import MobileFilters from "../components/mobile/MobileFilters"
import LocalityDescription from "../components/listingsDetails/LocalityDescription"
import ScrollToTopButton from "../components/listingsDetails/ScrollToTopButton"
import ListingSEO from "../components/SEO/ListingSEO"




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

  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">

{/* Dynamic SEO */}
<ListingSEO
  filters={filters}
  serviceFromRoute={serviceFromRoute}
  fallbackTitle={`${serviceFromRoute || "Services"} in ${filters.locality || "All Locations"} - BookMyBanquets`}
  fallbackDescription={`Explore ${totalCount || ""} ${serviceFromRoute || "services"} available in ${filters.locality || "your area"}.`}
/>


      <ListingsBreadcrumb filters={filters} />

      <div className="max-w-7xl mx-auto md:flex md:space-x-6 gap-6">
        <aside className="hidden md:block w-72">
          <FiltersSidebar
            filters={filters}
            setFilters={pushUrl}
             localities={localities}
          />
        </aside>

        <main className="flex-1">
          <ListingsHeader
            filters={filters}
            totalCount={totalCount}
             serviceFromRoute={serviceFromRoute}
          />

          <ListingsGrid
            listings={listings}
            loading={loading}
             isInitialLoading={isInitialLoading}
             isFetchingMore={isFetchingMore}
            lastListingRef={lastListingRef}
            serviceSlug={serviceFromRoute}
          />
        </main>
      </div>

      {!hasMore && (
        <div className="text-center py-6 text-gray-400">
          No more venues to show
        </div>
      )}

      <LocalityDescription />

      <MobileFilters
        open={mobilePanel}
        setOpen={setMobilePanel}
        filters={filters}
        setFilters={pushUrl}
        localities={localities}
      />

      <ScrollToTopButton />
    </div>
  )
}