import { useLocation } from "react-router-dom"
import NotFound from "../components/common/NotFound"

export default function RouteValidator({ children }) {
  const location = useLocation()
  const path = location.pathname

  const segments = path.split("/").filter(Boolean)

  // ✅ ADD THIS RIGHT AFTER segments
if (segments.length === 0) {
  return children
}

  // 🚨 1. Double slash
  if (path.includes("//")) return <NotFound />

  // 🚨 2. Too many segments
  if (segments.length > 3) return <NotFound />

  // 🚨 3. Invalid characters
  if (segments.some(seg => !/^[a-z0-9-]+$/.test(seg))) {
    return <NotFound />
  }

  // 🧠 Ignore non-service routes
  const ignorePrefixes = [
    "admin",
    "blogs",
    "blog",
    "business",
    "contact",
    "terms",
    "privacy",
    "services",
    "about",
    "why-us",
  ]

  const isIgnored = ignorePrefixes.includes(segments[0])

  if (!isIgnored) {
    const first = segments[0]

    const serviceCityPattern =
      /^[a-z0-9]+(-[a-z0-9]+)*-in-[a-z0-9]+(-[a-z0-9]+)*$/

    const serviceOnlyPattern =
      /^[a-z0-9]+(-[a-z0-9]+)*$/

    // 🟢 CASE 1: Listing Details → /service-in/city/id
    if (
      segments.length === 3 &&
      first.endsWith("-in") &&
      /^\d+$/.test(segments[2])
    ) {
      // valid ✅
    }

    // 🔵 CASE 2: Listing Page → /service-in-city/locality
    else if (
      segments.length === 2 &&
      serviceCityPattern.test(first)
    ) {
      // valid ✅
    }

    // 🟡 CASE 3: /service
    else if (
      segments.length === 1 &&
      serviceOnlyPattern.test(first)
    ) {
      // valid ✅
    }

    // ❌ EVERYTHING ELSE = INVALID
    else {
      return <NotFound />
    }
  }

  return children
}