import { toTitleCase } from "../../utils/formatText"
import { slugToServiceName, categoryToSlug } from "../../utils/slugMaps"

export default function ListingsHeader({ filters, totalCount, serviceFromRoute }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
<h1 className="text-2xl font-bold">
  {(() => {
    const serviceName =
      // 1. Priority → category (if exists)
      (filters.category &&
        slugToServiceName[categoryToSlug[filters.category]]) ||
      // 2. Fallback → route slug (VERY IMPORTANT FIX)
      (serviceFromRoute && slugToServiceName[serviceFromRoute]) ||
      // 3. Final fallback
      "Banquet Halls"

    const locationText = filters.locality
      ? ` in ${toTitleCase(filters.locality)}`
      : filters.city
      ? ` in ${toTitleCase(filters.city)}`
      : ""

    return `${serviceName}${locationText}`
  })()}
</h1>
      <div className="text-sm text-gray-600">
        {totalCount} results
      </div>
    </div>
  )
}