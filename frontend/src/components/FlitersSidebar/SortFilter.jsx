import { useEffect, useRef, useState } from "react";

export default function SortFilter({ filters, setFilters }) {
const sortOptions = [
  { id: "created_at", label: "Newest" },
  { id: "min_budget", label: "Price: Low to High" },
  { id: "max_budget", label: "Price: High to Low" },
  { id: "recommended", label: "Recommended" },
  { id: "high_demand", label: "High Demand" },
];


  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

    // handle closed dropdown when click outside
    useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Filter options based on input query
  const filtered = sortOptions.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    setQuery(item.label);

    if (item.id === "recommended") {
      setFilters({ ...filters, recommended: true, skip: 0 });
    } else if (item.id === "highDemand") {
      setFilters({ ...filters, highDemand: true, skip: 0 });
    } else {
      setFilters({ ...filters, sortBy: item.id, skip: 0 });
    }
    setOpen(false);
  };


  return (
    <div ref={dropdownRef} className="relative w-full">
      <label className="font-semibold text-sm">Sort by</label>
      <div className="relative mt-2">
        <input
          value={query} // directly use query so user can clear
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Sort / Filter"
          className="w-full h-9 border border-gray-300 rounded px-3 text-sm 
            shadow-inner shadow-gray-200 focus:ring-2 focus:ring-red-400 bg-transparent outline-none"
        />
        {/* Dropdown */}
        {open && filtered.length > 0 && (
          <div className="absolute left-0 right-0 bg-white border border-gray-300
            rounded mt-1 max-h-56 overflow-y-auto shadow-lg z-[999] scrollbar-none">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex items-center text-[#09122C] text-sm py-2 px-3
                  hover:bg-[#f3f3f3] hover:text-[#e71717] rounded w-full cursor-pointer"
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
