import { useParams, useLocation } from "react-router-dom"
import ListingsPage from "../pages/ListingsPage"
import NotFound from "../components/common/NotFound"

const allowedServices = [
  "banquet-hall",
  "marriage-hall",
  "wedding-farmhouse",
  "party-hall",
  "5-star-wedding-hotel",
  "destination-wedding",
  "bmb-assured",
  "bmb-verified",
]

const allowedCities = [
  "delhi",
  "gurgaon"
]

const allowedLocalities = [
  "moti-nagar",
  "kirti-nagar",
  "uttam-nagar",
  "punjabi-bagh",
  "hari-nagar",
  "ramesh-nagar",
  "loha-mandi",
  "malviya-nagar",
  "mahipalpur",
  "mayapuri",
  "janakpuri",
  "dabri",
  "udyog-nagar",
  "paschim-vihar",
  "pitampura",
  "britannia-chowk",
  "karol-bagh",
  "east-of-kailash",
  "peeragarhi",
  "subhash-nagar",
  "tilak-nagar",
  "najafgarh",
  "bijwasan",
  "lawrence-road",
  "mehrauli",
  "gk-1",
  "saket",
  "wazirpur",
  "dwarka",
  "rajouri-garden",
  "vikaspuri",
  "naraina",
  "patel-nagar",
  "rajendra-nagar",
  "chhatarpur",
  "gt-karnal-road",
  "sector-14",
  "sohna-road",
  "sector-24",
  "manesar",
  "najafgarh-road-industrial-area",
  "west-delhi",
  "east-delhi",
  "north-delhi",
  "south-delhi"
]

export default function ServiceRouteGuard() {
  const { serviceCity, localitySlug } = useParams()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const categoryId = params.get("category")

  // 🟢 CASE 1: URL like /banquet-hall?category=6
  if (!serviceCity.includes("-in-")) {
    // validate slug
    if (!allowedServices.includes(serviceCity)) {
      return <NotFound />
    }

    // validate category query
    if (categoryId && !/^\d+$/.test(categoryId)) {
      return <NotFound />
    }

    return <ListingsPage />
  }

  // 🔵 CASE 2: URL like /banquet-hall-in-delhi
  const [serviceSlug, citySlug] = serviceCity.split("-in-")

  if (!allowedServices.includes(serviceSlug)) {
    return <NotFound />
  }

  if (!allowedCities.includes(citySlug)) {
    return <NotFound />
  }

  if (localitySlug && !allowedLocalities.includes(localitySlug)) {
    return <NotFound />
  }
  
  const allowedParams = [
    "locality",
    "lat",
    "lng",
    "radius",
    "category",
    "search",
    "minBudget",
    "maxBudget",
    "minGuests",
    "maxGuests",
    "vegetarian",
    "nonVegetarian",
    "sortBy",
    "order",
    "skip"
  ]

  for (const key of params.keys()) {
    if (!allowedParams.includes(key)) {
      return <NotFound />
    }
  }

  return <ListingsPage />
}