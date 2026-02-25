import { useNavigate } from "react-router-dom"
import { categoryToVenuePath } from "../../utils/slugMaps"

export default function ListingsBreadcrumb({ filters }) {
  const navigate = useNavigate()

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
      path: `${venueMeta.path}?category=${filters.category}&serviceLabel=${encodeURIComponent(
        venueMeta.label
      )}`
    })
  }

  if (venueMeta && localityLabel) {
    breadcrumbItems.push({
      label: `${venueMeta.label} in ${localityLabel}`,
      type: "current"
    })
  }

  return (
    <nav
      aria-label="Breadcrumb"
       className="py-3 px-4 mb-3 text-sm text-red-600 "    >
      <ol className="flex flex-wrap items-center gap-1">
        {breadcrumbItems.map((item, idx) => {
          const isLast = idx === breadcrumbItems.length - 1

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
                    navigate(item.path)
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

              {!isLast && <span className="mx-1">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}