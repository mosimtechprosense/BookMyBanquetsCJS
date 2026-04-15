const API_BASE = import.meta.env.VITE_API_BASE || "https://api.bookmybanquets.in";



export const fetchListings = async (filters = {}, options = {}) => {

  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(["minBudget", "maxBudget", "skip", "take", "vegetarian", "nonVegetarian"].includes(key) && isNaN(Number(value)))
    ) {
      params.set(
        key,
        key === "locality"
          ? String(value).replace(/-/g, " ")
          : String(value)
      )
    }
  })

  const url = `${API_BASE}/api/listings?${params.toString()}`

  const res = await fetch(url, {
    signal: options.signal
  })

  if (!res.ok) throw new Error("Failed to fetch listings")
  const data = await res.json()


  if (data?.data) {
  let pinned = null

  const pinnedIndex = data.data.findIndex(
    (item) => Number(item.id) === 752
  )

  //  If already in results → move to top
  if (pinnedIndex !== -1) {
    pinned = data.data.splice(pinnedIndex, 1)[0]
  }

  //  If NOT present → fetch separately
  if (!pinned) {
    try {
      const resPinned = await fetch(`${API_BASE}/api/listings/752`)
      if (resPinned.ok) {
        const pinnedData = await resPinned.json()
        const pinnedItem = pinnedData.data || pinnedData

        //  IMPORTANT: CHECK CATEGORY MATCH
        const categoryFilter = filters.category

        const matchesCategory = categoryFilter
          ? pinnedItem.listing_categories?.some(
              (c) => Number(c.listing_category_id) === Number(categoryFilter)
            )
          : true

        //  OPTIONAL: locality/city match (if needed)
        const matchesCity = filters.city
          ? pinnedItem.city?.toLowerCase().includes(filters.city.toLowerCase())
          : true

        if (matchesCategory && matchesCity) {
          pinned = pinnedItem
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  //  Add to top only if valid
  if (pinned) {
    data.data.unshift(pinned)
  }
}

return data
}




export const fetchListingById = async (id) => {
  if (!id) throw new Error("Listing ID is required")

  const res = await fetch(`${API_BASE}/api/listings/${id}`)

  if (!res.ok) throw new Error("Failed to fetch listing")

  return res.json()
}


export const fetchSimilarListings = async (id) => {
  if (!id) throw new Error("Listing ID is required for similar listings");

  const res = await fetch(`${API_BASE}/api/listings/${id}/similar`);
  if (!res.ok) throw new Error("Failed to fetch similar listings");

  return res.json(); // returns { success, count, data: [...] }
};


export const fetchHallsByListingId = async (id) => {
  const res = await fetch(`${API_BASE}/api/listings/${id}`);
  return res.json();
};


export const fetchLocalities = async (location = "") => {
  const url = `${API_BASE}/api/locations${location ? `?location=${encodeURIComponent(location)}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json();
};


export const fetchLocalityDescription = async (slug) => {
  const res = await fetch(`${API_BASE}/api/localities/seo/locality/${slug}`)

  if (!res.ok) {
    throw new Error("Locality SEO not found")
  }

  return res.json()
}


