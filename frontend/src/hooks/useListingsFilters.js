// src/hooks/useListingsFilters.js

import { useMemo, useState, useEffect } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { categoryToSlug } from "../utils/slugMaps"
import { fetchLocalities } from "../api/listingsApi"


export default function useListingsFilters() {
const { serviceCity, localitySlug } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [localities, setLocalities] = useState([])

  // Fetch localities (same as old page)
  useEffect(() => {
    fetchLocalities()
      .then((res) => setLocalities(res?.data || []))
      .catch(() => setLocalities([]))
  }, [])

// Extract city from serviceSlug (banquet-hall-in-delhi)
// Split "banquet-hall-in-delhi"
let baseServiceSlug = ""
let cityFromRoute = undefined

if (serviceCity?.includes("-in-")) {
  const parts = serviceCity.split("-in-")
  baseServiceSlug = parts[0]
  cityFromRoute = parts[1]?.replace(/-/g, " ")
}

const localityFromRoute = localitySlug
  ? localitySlug.replace(/-/g, " ")
  : undefined



  const filters = useMemo(() => {
    return {
      city: cityFromRoute,
      locality: searchParams.get("locality") || localityFromRoute,
      lat: searchParams.get("lat")
  ? Number(searchParams.get("lat"))
  : undefined,

lng: searchParams.get("lng")
  ? Number(searchParams.get("lng"))
  : undefined,

radius: searchParams.get("radius")
  ? Number(searchParams.get("radius"))
  : undefined,
      category: searchParams.get("category")
        ? Number(searchParams.get("category"))
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
      vegetarian: searchParams.has("vegetarian")
        ? searchParams.get("vegetarian") === "true"
        : undefined,
      nonVegetarian: searchParams.has("nonVegetarian")
        ? searchParams.get("nonVegetarian") === "true"
        : undefined,
      sortBy: searchParams.get("sortBy") || "created_at",
      order: searchParams.get("order") || "desc"
    }
  }, [searchParams, cityFromRoute, localityFromRoute])

const serviceFromRoute =
  baseServiceSlug ||
  (filters.category && categoryToSlug[filters.category]) ||
  "banquet-hall"

  // EXACT old pushUrl behavior
  const pushUrl = (obj) => {
    const merged = {
      ...filters,
      ...obj,
    }

if (obj.locality && !obj.lat && !obj.lng) {
  merged.lat = undefined
  merged.lng = undefined
  merged.radius = undefined
}


const finalCity = merged.city || cityFromRoute
const safeCity =
  finalCity && finalCity !== "undefined" && finalCity.trim() !== ""
    ? finalCity
    : null

// preserve category from route if missing
const slugToCategory = {
  "banquet-hall": 6,
  "party-hall": 7,
  "marriage-hall": 8,
  "5-star-wedding-hotel": 11,
  "destination-wedding": 12,
  "wedding-farmhouse": 13,
  "bmb-assured": 26,
  "bmb-verified": 27
}

//  ALWAYS enforce correct category from route
if (!merged.category && serviceFromRoute && slugToCategory[serviceFromRoute]) {
  merged.category = slugToCategory[serviceFromRoute]
}

delete merged.city

    const qs = new URLSearchParams()
    Object.entries(merged).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        qs.set(key, value)
      }
    })


let path = ""

if (serviceFromRoute && safeCity) {
  path = `/${serviceFromRoute}-in-${safeCity.replace(/\s+/g, "-")}`
} else if (serviceFromRoute) {
  path = `/${serviceFromRoute}`
}

    if (merged.locality)
      path += `/${merged.locality.replace(/\s+/g, "-")}`

    const queryString = qs.toString()

navigate(
  queryString ? `${path}?${queryString}` : path,
  { replace: false }
)
  }

  return {
    filters,
    pushUrl,
    serviceFromRoute,
    localities
  }
}