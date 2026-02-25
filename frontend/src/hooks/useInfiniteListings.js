import { useEffect, useState, useRef, useCallback } from "react"
import { fetchListings } from "../api/listingsApi"

export default function useInfiniteListings(filters) {
  const [listings, setListings] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const hasMoreRef = useRef(hasMore)
const isInitialLoadingRef = useRef(isInitialLoading)

  const batchSize = 10

  const skipRef = useRef(0)
  const observerRef = useRef(null)
  const abortRef = useRef(null)
  const isFetchingRef = useRef(false)
const isFetchingMore = loading && !isInitialLoading

useEffect(() => { hasMoreRef.current = hasMore }, [hasMore])
useEffect(() => { isInitialLoadingRef.current = isInitialLoading }, [isInitialLoading])

  //  Reset when filters change
useEffect(() => {
  skipRef.current = 0
  setListings([])
  setHasMore(true)
  setIsInitialLoading(true)

    isFetchingRef.current = false
  abortRef.current?.abort()
}, [filters])

const buildPayload = useCallback(() => {
  const cleaned = { ...filters, skip: skipRef.current, take: batchSize }

  if (filters.vegetarian && !filters.nonVegetarian) cleaned.mealType = "veg"
  if (filters.nonVegetarian && !filters.vegetarian) cleaned.mealType = "nonVeg"

  delete cleaned.vegetarian
  delete cleaned.nonVegetarian

  return cleaned
}, [filters, batchSize])



const fetchBatch = useCallback(async () => {
  if (isFetchingRef.current) return
  if (!hasMoreRef.current && skipRef.current !== 0) return


  isFetchingRef.current = true
  setLoading(true)

  if (abortRef.current) abortRef.current.abort()
  const controller = new AbortController()
  abortRef.current = controller

  try {
    const payload = buildPayload()
    const res = await fetchListings(payload, { signal: controller.signal })

    const data = res?.data || []
    const total = res?.total || 0

    setTotalCount(total)
    setListings(prev => [...prev, ...data])

    skipRef.current += batchSize
    if (skipRef.current >= total) setHasMore(false)
    if (isInitialLoadingRef.current) setIsInitialLoading(false)

  } catch (err) {
    if (err.name !== "AbortError") console.error("Fetch error:", err)
  } finally {
    isFetchingRef.current = false
    setLoading(false)
  }
}, [ batchSize,buildPayload])


  //  Initial load on filter change
useEffect(() => {
  fetchBatch()
}, [fetchBatch])

  //  Stable observer
  const lastListingRef = useCallback(
    (node) => {
      if (loading) return
      if (observerRef.current) observerRef.current.disconnect()

observerRef.current = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && hasMoreRef.current) {  // ✅ use ref
    fetchBatch()
  }
})

      if (node) observerRef.current.observe(node)
    },
    [loading, fetchBatch]
  )

  return {
    listings,
    totalCount,
    loading,
    hasMore,
    lastListingRef,
    isInitialLoading,
    isFetchingMore   
  }
}