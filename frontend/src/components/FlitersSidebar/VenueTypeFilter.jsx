import { useEffect, useRef, useState } from "react"

export default function VenueTypeFilter({ setFilters, value }) {
  const venueTypeOptions = [
    { label: "Banquet Halls", path: "/venues/banquet-halls", categoryId: 6 },
    {
      label: "Banquet with Hotel Room",
      path: "/venues/banquet-with-room",
      categoryId: 9
    },
    { label: "Marriage Halls", path: "/venues/marriage-halls", categoryId: 8 },
    {
      label: "Wedding Farmhouse",
      path: "/venues/wedding-farmhouse",
      categoryId: 13
    },
    { label: "Party Halls", path: "/venues/party-halls", categoryId: 7 },
    {
      label: "5 Star Wedding Hotels",
      path: "/venues/5-star-wedding-hotels",
      categoryId: 11
    },
    {
      label: "Destination Weddings",
      path: "/venues/destination-weddings",
      categoryId: 12
    },
    {
      label: "Small Function Halls",
      path: "/venues/small-function-halls",
      categoryId: 14
    },
    {
      label: "Engagement Venue",
      path: "/venues/engagement-venue",
      categoryId: 16
    },
    { label: "Baby Shower", path: "/venues/baby-shower", categoryId: 18 },
    { label: "Sikh Wedding", path: "/venues/sikh-wedding", categoryId: 20 },
    {
      label: "Cocktail Venues",
      path: "/venues/cocktail-venues",
      categoryId: 5
    },
    { label: "Party Lawn", path: "/venues/party-lawn", categoryId: 10 },
    {
      label: "Corporate Events",
      path: "/venues/corporate-events",
      categoryId: 15
    },
    { label: "Ring Ceremony", path: "/venues/ring-ceremony", categoryId: 17 },
    {
      label: "Mehendi Ceremony",
      path: "/venues/mehendi-ceremony",
      categoryId: 21
    },
    {
      label: "Retirement Party",
      path: "/venues/retirement-party",
      categoryId: 19
    }
  ]

  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (value) {
      setQuery(value)
    }
  }, [value])

  // handle closed dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filtered = venueTypeOptions.filter((v) =>
    v.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div ref={dropdownRef}>
      <label className="font-semibold text-sm">Venue Type</label>

      <div className="relative mt-2">
        {/* INPUT */}
        <div className="flex items-center w-full h-9 border border-gray-300 rounded px-3 shadow-inner shadow-gray-200 focus-within:ring-2 focus-within:ring-red-400 bg-white">
          <input
            value={query || value || ""}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            placeholder="Select venue type"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* DROPDOWN */}
        {open && filtered.length > 0 && (
          <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-56 overflow-y-auto shadow-lg z-[999] scrollbar-none">
            {filtered.map((item) => (
              <div
                key={item.categoryId}
                onClick={() => {
                  setQuery(item.label)
                  setFilters({
                    category: item.categoryId,
                    search: item.label,
                    serviceLabel: item.label,
                    skip: 0
                  })

                  setOpen(false)
                }}
                className="flex items-center text-[#09122C] text-sm py-2 px-3 hover:bg-[#f3f3f3] hover:text-[#e71717] rounded cursor-pointer"
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
