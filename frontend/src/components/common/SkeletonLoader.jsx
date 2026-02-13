export const ListingCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden">
      {/* Image */}
      <div className="w-full md:w-1/3 p-4">
        <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>

        <div className="flex gap-4 mt-3">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>

        <div className="h-10 bg-gray-300 rounded w-40 mt-4"></div>
      </div>
    </div>
  )
}

export const DetailsPageSkeleton = () => {
  return (
    <div className="animate-pulse container mx-auto px-4 py-8 space-y-6">
      <div className="h-80 bg-gray-300 rounded-lg"></div>

      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>

      <div className="h-32 bg-gray-300 rounded"></div>
      <div className="h-40 bg-gray-300 rounded"></div>
    </div>
  )
}
