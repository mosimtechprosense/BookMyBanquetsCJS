import { toTitleCase } from "../../utils/formatText"
import { slugToServiceName, categoryToSlug } from "../../utils/slugMaps"

export default function ListingsHeader({ filters, totalCount }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
<h1 className="text-2xl font-bold">
  {filters.category
    ? `${
        slugToServiceName[categoryToSlug[filters.category]] || "Service"
      }${
        filters.locality
          ? ` in ${toTitleCase(filters.locality)}`
          : filters.city
          ? ` in ${toTitleCase(filters.city)}`
          : ""
      }`
    : filters.locality
    ? `Banquet Halls in ${toTitleCase(filters.locality)}`
    : filters.city
    ? `Banquet Halls in ${toTitleCase(filters.city)}`
    : "Banquet Halls"}
</h1>
      <div className="text-sm text-gray-600">
        {totalCount} results
      </div>
    </div>
  )
}