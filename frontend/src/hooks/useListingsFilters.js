// src/hooks/useListingsFilters.js

import { useMemo, useState, useEffect } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { categoryToSlug } from "../utils/slugMaps"
import { fetchLocalities } from "../api/listingsApi"

const CITY_LIST = [
  "delhi",
  "new-delhi",
  "gurgaon",
  "gurugram",
  "noida",
  "faridabad",
  "ghaziabad"
]

export default function useListingsFilters() {
  const { serviceSlug, placeSlug } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [localities, setLocalities] = useState([])

  // Fetch localities (same as old page)
  useEffect(() => {
    fetchLocalities()
      .then((res) => setLocalities(res?.data || []))
      .catch(() => setLocalities([]))
  }, [])

  const normalizedPlace = placeSlug
    ? decodeURIComponent(placeSlug).toLowerCase()
    : undefined

  const isCity = CITY_LIST.includes(normalizedPlace)

  const cityFromRoute = isCity
    ? normalizedPlace.replace(/-/g, " ")
    : undefined

  const localityFromRoute =
    !isCity && normalizedPlace
      ? normalizedPlace.replace(/-/g, " ")
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
    serviceSlug ||
    (filters.category && categoryToSlug[filters.category]) ||
    "banquet-hall"

  // EXACT old pushUrl behavior
  const pushUrl = (obj) => {
    const merged = {
      ...filters,
      ...obj,
      city: cityFromRoute || filters.city
    }

    if (obj.locality) {
  merged.lat = undefined
  merged.lng = undefined
  merged.radius = undefined
}

    const qs = new URLSearchParams()
    Object.entries(merged).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        qs.set(key, value)
      }
    })

    const finalCity = merged.city || cityFromRoute

let path = `/${serviceFromRoute}-in-${finalCity?.replace(/\s+/g, "-")}`

    if (merged.locality)
      path += `/${merged.locality.replace(/\s+/g, "-")}`

    navigate(`${path}?${qs.toString()}`, { replace: false })
  }

  return {
    filters,
    pushUrl,
    serviceFromRoute,
    localities
  }
}