import ListingCard from "../ListingCards/ListingCard"
import { ListingCardSkeleton } from "../common/SkeletonLoader"


export default function ListingsGrid({
  listings,
  isInitialLoading,
  isFetchingMore,
  lastListingRef,
  serviceSlug
}) {
  return (
    <div className="grid grid-cols-1 gap-4"> 
      {/* Initial skeleton */}
      {isInitialLoading && (
        Array.from({ length: 10 }).map((_, i) => (
          <ListingCardSkeleton key={`init-${i}`} />
        ))
      )}

      {/* Real listings */}
      {listings.map((l, index) => {
        const isLast = index === listings.length - 1
        const content = <ListingCard item={l} serviceSlug={serviceSlug} />

        return isLast ? (
          <div ref={lastListingRef} key={l.id}>{content}</div>
        ) : (
          <div key={l.id}>{content}</div>
        )
      })}

      {/* Bottom skeleton for infinite scroll */}
      {isFetchingMore && (
        Array.from({ length: 3 }).map((_, i) => (
          <ListingCardSkeleton key={`load-${i}`} />
        ))
      )}

      {/* No results message */}
      {!isInitialLoading && listings.length === 0 && (
        <div className="text-center py-6 text-gray-400">
            No venues match your criteria. Try adjusting your filters or location.
        </div>
      )}
    </div>
  )
}