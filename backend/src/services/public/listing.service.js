const prisma = require("../../config/db.js")
const slugify = require("slugify")
const { mapFoodPrices } = require("../../utils/foodPriceMapper.js")

// venue images url builder function
const FRONTEND_BASE_URL =
  process.env.FRONTEND_BASE_URL || "https://www.bookmybanquets.in"

const normalize = (value) => {
  if (!value) return undefined
  return value.replace(/-/g, " ").toLowerCase()
}

const buildImageURL = (image) => `${FRONTEND_BASE_URL}/listing_image/${image}`

const formatImages = (venue_images = []) => {
  return venue_images.map((img) => ({
    ...img,
    image_url: buildImageURL(img.image)
  }))
}

// CREATE — Add new listing
const createListingDB = async (data) => {
  const slug = slugify(data.title, { lower: true }) + "-" + Date.now()
  
  console.log("🔥 FINAL DATA:", JSON.stringify(data, null, 2)); 


  const excerpt = data.description
    ? data.description.slice(0, 150)
    : "No description available"

  const listing = await prisma.listings.create({
    data: {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      city: data.city,
      state: data.state,
      country: data.country,
      locality: data.locality,
      address: data.address,
      pincode: data.pincode ? BigInt(data.pincode) : undefined,

      min_budget: Number(data.min_budget || 0),
      max_budget: Number(data.max_budget || 0),
      min_guest: Number(data.min_guest || 0),
      max_guest: Number(data.max_guest || 0),

      phone: data.phone,
      email: data.email,

      recommended: data.recommended ?? false,
      popular: data.popular ?? false,
      trending: data.trending ?? false,
      high_demand: data.high_demand ?? false,
      features: data.features,
      policies: data.policies,
      google_map_url: data.google_map_url,
      lat: data.lat ? Number(data.lat) : null,
      long: data.long ? Number(data.long) : null,
      status: Boolean(data.status),

      slug,
      excerpt,

hall_capacities: {
  create: (data.hall_capacities || []).map(h => ({
    area: h.area,
    capacity: Number(h.capacity),
    floating: Number(h.floating),
    type: h.type,
    day_availability: h.day_availability,
    night_availability: h.night_availability
  }))
},

faqs: {
  create: (data.faqs || []).map(f => ({
    question: f.question,
    answer: f.answer,
    isActive: true // ✅ ADD THIS
  }))
},

listing_categories: {
  create: (data.listing_categories || [])
.map(c => {
  if (typeof c === "number") {
    return { listing_category_id: c };
  }
  return {
    listing_category_id: Number(c.listing_category_id)
  };
})
.filter(c => !isNaN(c.listing_category_id))
},

listing_food_categories: {
  create: (data.listing_food_categories || [])
    .filter(f => 
  !isNaN(Number(f.food_category_id)) &&
  f.price !== undefined &&
  f.price !== null &&
  f.price !== ""
)
    .map(f => ({
      food_category_id: Number(f.food_category_id),
      price: String(f.price)
    }))
},

    },

include: {
  venue_images: true,
  listing_food_categories: true,
  hall_capacities: true,
  faqs: true,
  listing_categories: true
}
  })

  const { vegPrice, nonVegPrice } = mapFoodPrices(
    listing.listing_food_categories
  )

  return {
    ...listing,
    vegPrice,
    nonVegPrice,
    venue_images: formatImages(listing.venue_images)
  }
}

const getCityVariants = (city) => {
  if (!city) return []

  const normalized = city.toLowerCase()

  const cityMap = {
    delhi: [
      "delhi",
      "north delhi",
      "south delhi",
      "east delhi",
      "west delhi",
      "new delhi",
      "West Delhi",
      "South West Delhi",
      "North Delhi",
      "New Delhi",
      "Central Delhi",
      "South Delhi",
      "East Delhi",
      "North East Delhi"
    ],
    gurgaon: ["gurgaon", "gurugram"],
    gurugram: ["gurgaon", "gurugram"]
  }

  return cityMap[normalized] || [normalized]
}

// READ — Get all listings (with filters)
const getAllListingDB = async (filters = {}) => {
  const {
    mealType,
    city,
    locality,
    minGuests,
    maxGuests,
    minBudget,
    maxBudget,
    venueType,
    category,
    recommended,
    highDemand,
    search,
    sortBy = "created_at",
    order = "desc",
    lat,
    lng,
    radius
  } = filters

  const skip = Number(filters.skip) || 0
  const take = Number(filters.take) || 10

  const recommendedBool = recommended === "true" || recommended === true
  const highDemandBool = highDemand === "true" || highDemand === true

  const normalizedLocality = normalize(locality)
  const cityVariants = getCityVariants(city)

  const where = {
    AND: [
      { status: true },

      ...(search
        ? [
            {
              OR: [
                { title: { contains: search } },
                { city: { contains: search } },
                { locality: { contains: search } },
                { description: { contains: search } }
              ]
            }
          ]
        : []),

      ...(category
        ? [
            {
              listing_categories: {
                some: { listing_category_id: Number(category) }
              }
            }
          ]
        : []),

      ...(normalizedLocality && !(lat && lng)
        ? [
            {
              locality: {
                contains: normalizedLocality
              }
            }
          ]
        : []),

      ...(cityVariants.length
        ? [
            {
              OR: cityVariants.map((c) => ({
                city: { contains: c }
              }))
            }
          ]
        : []),

      ...(minGuests !== undefined || maxGuests !== undefined
        ? [
            {
              AND: [
                minGuests
                  ? { min_guest: { gte: Number(minGuests) } }
                  : undefined,
                maxGuests
                  ? { max_guest: { lte: Number(maxGuests) } }
                  : undefined
              ].filter(Boolean)
            }
          ]
        : []),

      ...(minBudget || maxBudget
        ? [
            {
              AND: [
                minBudget
                  ? { min_budget: { gte: Number(minBudget) } }
                  : undefined,
                maxBudget
                  ? { max_budget: { lte: Number(maxBudget) } }
                  : undefined
              ].filter(Boolean)
            }
          ]
        : []),

      ...(venueType
        ? [
            {
              OR: [
                { keywords: { contains: venueType } },
                { description: { contains: venueType } },
                { title: { contains: venueType } }
              ]
            }
          ]
        : []),

      ...(mealType === "veg"
        ? [
            {
              listing_food_categories: {
                none: { food_category_id: 2 }
              }
            }
          ]
        : []),

      ...(mealType === "nonVeg"
        ? [
            {
              listing_food_categories: {
                some: { food_category_id: 2 }
              }
            }
          ]
        : []),

      ...(recommendedBool ? [{ recommended: true }] : []),

      ...(highDemandBool ? [{ high_demand: true }] : [])
    ]
  }

const allowedSortFields = ["min_budget", "max_budget", "created_at"];

let orderBy = { id: "desc" }; // 🛟 safe fallback

if (allowedSortFields.includes(sortBy)) {
  orderBy = {
    [sortBy]: order === "asc" ? "asc" : "desc"
  };
}

  let listings = []
  let totalCount = 0

  // 🌍 If geo search
  if (lat && lng) {
    const maxRadius = radius || 50 // max 50 km
    const step = 2 // radius steps: 0-2 km, 2-4 km, ...

    const allGeoResults = []
    const seenIds = new Set()

    // 1️⃣ Fetch exact selected location first
    const exactLocationWhere = {
      AND: [
        { status: true },
        ...(normalizedLocality
          ? [{ locality: { contains: normalizedLocality } }]
          : []),
        ...(cityVariants.length
          ? [{ OR: cityVariants.map((c) => ({ city: { contains: c } })) }]
          : [])
      ]
    }

    const exactResults = await prisma.listings.findMany({
      where: exactLocationWhere,
      include: { 
  venue_images: true, 
  listing_food_categories: true,
  listing_categories: true   // ✅ ADD HERE ALSO
}
    })

    exactResults.forEach((r) => {
      allGeoResults.push({ id: r.id, distance: 0 }) // exact location = distance 0
      seenIds.add(r.id.toString())
    })

    // 2️⃣ Fetch nearby listings in progressive radius
    for (let start = 0; start < maxRadius; start += step) {
      const end = start + step

      const geoResults = await prisma.$queryRaw`
      SELECT id,
        (6371 * acos(
          cos(radians(${Number(lat)})) *
          cos(radians(lat)) *
          cos(radians(\`long\`) - radians(${Number(lng)})) +
          sin(radians(${Number(lat)})) *
          sin(radians(lat))
        )) AS distance
      FROM listings
      WHERE status = true
      HAVING distance > ${start} AND distance <= ${end}
      ORDER BY distance ASC
    `

      // filter duplicates
      geoResults.forEach((r) => {
        if (!seenIds.has(r.id.toString())) {
          allGeoResults.push(r)
          seenIds.add(r.id.toString())
        }
      })
    }

    const geoIds = allGeoResults.map((r) => BigInt(r.id))

    if (!geoIds.length) return { data: [], total: 0 }

    const finalWhere = {
      AND: [
        ...where.AND, // <-- apply all filters here
        { id: { in: geoIds } }
      ]
    }

    // 3 Fetch full listing details
    listings = await prisma.listings.findMany({
      where: finalWhere,
      include: { 
  venue_images: true, 
  listing_food_categories: true,
  listing_categories: true   // ✅ ADD HERE ALSO
}
    })

    // 4 Map distance
    const distanceMap = new Map()
    allGeoResults.forEach((r) =>
      distanceMap.set(BigInt(r.id), Number(r.distance))
    )
    listings = listings.map((l) => ({ ...l, distance: distanceMap.get(l.id) }))

    // 5 Sort by distance
    listings.sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999))

    totalCount = allGeoResults.length // total before slicing

    // 6 Apply pagination AFTER sorting
    listings = listings.slice(Number(skip), Number(skip) + Number(take))
  } else {
    // normal non-geo search fallback
    listings = await prisma.listings.findMany({
      where,
      skip: Number(skip),
      take: Number(take),
      orderBy,
      include: { 
  venue_images: true, 
  listing_food_categories: true,
  listing_categories: true   // ✅ ADD HERE ALSO
}
    })
    totalCount = await prisma.listings.count({ where })
  }

  const updatedListings = listings.map((listing) => {
    const { vegPrice, nonVegPrice } = mapFoodPrices(
      listing.listing_food_categories
    )

    return {
      ...listing,
      vegPrice,
      nonVegPrice,
      venue_images: formatImages(listing.venue_images)
    }
  })

  return { data: updatedListings, total: totalCount }
}

// READ — Get single listing by ID
const getListingByIdDB = async (id) => {
  const listing = await prisma.listings.findUnique({
    where: { id: BigInt(id) },
    include: {
      venue_images: true,
      hall_capacities: true,
      listing_food_categories: true,
      listing_categories: true,
      faqs: {
        where: { isActive: true },
        orderBy: { order: "asc" }
      }
    }
  })

  if (!listing) return null

  const { vegPrice, nonVegPrice } = mapFoodPrices(
    listing.listing_food_categories
  )

  return {
    ...listing,
    vegPrice,
    nonVegPrice,
    venue_images: formatImages(listing.venue_images)
  }
}

// READ — Get similar listing
const getSimilarListingsDB = async (id, skip = 0, take = 8) => {
  let listingId
  try {
    listingId = BigInt(id)
  } catch {
    console.error("Invalid listing ID:", id)
    return []
  }

  const currentListing = await getListingByIdDB(id)
  if (!currentListing) return []

  // pass skip/take inside filters
  const { data: listings } = await getAllListingDB({
    city: currentListing.city,
    skip,
    take
  })

  return listings.filter((listing) => listing.id !== listingId)
}

// UPDATE — Modify listing
const updateListingDB = async (id, data) => {
  const listing = await prisma.listings.update({
    where: { id: BigInt(id) },
    data: {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      city: data.city,
      state: data.state,
      country: data.country,
      locality: data.locality,
      address: data.address,
      pincode:
  data.pincode && !isNaN(data.pincode)
    ? BigInt(data.pincode)
    : undefined,

      min_budget: Number(data.min_budget || 0),
      max_budget: Number(data.max_budget || 0),
      min_guest: Number(data.min_guest || 0),
      max_guest: Number(data.max_guest || 0),

      phone: data.phone,
      email: data.email,

      recommended: data.recommended ?? false,
      popular: data.popular ?? false,
      trending: data.trending ?? false,
      high_demand: data.high_demand ?? false,
      features: data.features,
      policies: data.policies,
      google_map_url: data.google_map_url,
lat: data.lat && !isNaN(data.lat) ? Number(data.lat) : null,
long: data.long && !isNaN(data.long) ? Number(data.long) : null,
      status: Boolean(data.status),

hall_capacities: {
  deleteMany: {},
  create: (data.hall_capacities || []).map(h => ({
    area: h.area,
    capacity: Number(h.capacity),
    floating: Number(h.floating),
    type: h.type,
    day_availability: h.day_availability,
    night_availability: h.night_availability
  }))
},

faqs: {
  deleteMany: {},
  create: (data.faqs || []).map(f => ({
    question: f.question,
    answer: f.answer,
    isActive: true // ✅ ADD THIS
  }))
},

listing_categories: {
  deleteMany: {},
  create: (data.listing_categories || [])
    .filter(c => !isNaN(Number(c)))
    .map(c => ({
      listing_category_id: Number(c)
    }))
},
listing_food_categories: {
  deleteMany: {},
  create: (data.listing_food_categories || [])
    .filter(f => 
      !isNaN(Number(f.food_category_id)) &&
      f.price !== undefined &&
      f.price !== null &&
      f.price !== ""
    )
    .map(f => ({
      food_category_id: Number(f.food_category_id),
      price: String(f.price)
    }))
},
    },

include: {
  venue_images: true,
  listing_food_categories: true,
  hall_capacities: true,
  faqs: true,
  listing_categories: true
}
  })

  const { vegPrice, nonVegPrice } = mapFoodPrices(
    listing.listing_food_categories
  )

  return {
    ...listing,
    vegPrice,
    nonVegPrice,
    venue_images: formatImages(listing.venue_images)
  }
}

// DELETE — Soft delete
const deleteListingDB = async (id) => {
  const listing = await prisma.listings.update({
    where: { id: BigInt(id) },
    data: { status: false },
    include: { venue_images: true }
  })

  return {
    ...listing,
    venue_images: formatImages(listing.venue_images)
  }
}

// RECOMMENDED LISTINGS
const getRecommendedListingsDB = async (
  limit = 10,
  city,
  locality,
  skip = 0
) => {
  const { data } = await getAllListingDB({
    recommended: true,
    city,
    locality,
    skip,
    take: limit
  })

  const index = data.findIndex(item => Number(item.id) === 752)

  if (index !== -1) {
    const updated = [...data]
    const [target] = updated.splice(index, 1)
    updated.splice(Math.min(5, updated.length), 0, target)
    return updated
  }

  return data
}



// HIGH DEMAND LISTINGS
const getHighDemandListingsDB = async (
  limit = 10,
  city,
  locality,
  skip = 0
) => {
  const { data } = await getAllListingDB({
    highDemand: true,
    city,
    locality,
    skip,
    take: limit
  })

  const index = data.findIndex(item => Number(item.id) === 752)

  if (index !== -1) {
    const updated = [...data]
    const [target] = updated.splice(index, 1)
    updated.splice(Math.min(5, updated.length), 0, target)
    return updated
  }

  return data
}

module.exports = {
  createListingDB,
  getAllListingDB,
  getListingByIdDB,
  getSimilarListingsDB,
  updateListingDB,
  deleteListingDB,
  getRecommendedListingsDB,
  getHighDemandListingsDB
}
