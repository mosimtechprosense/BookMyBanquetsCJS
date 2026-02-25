import { slugToServiceName, categoryToSlug } from "../../utils/slugMaps"

export default function ListingsHeader({ filters, totalCount }) {
  return (
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

      <div className="text-sm text-gray-600">
        {totalCount} results
      </div>
    </div>
  )
}