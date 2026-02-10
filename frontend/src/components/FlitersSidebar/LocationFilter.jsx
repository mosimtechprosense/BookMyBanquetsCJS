import { useState, useEffect, useRef } from "react";
import { CiLocationOn } from "react-icons/ci";

export default function LocationFilter({ setFilters, value }) {
  const [locationQuery, setLocationQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showList, setShowList] = useState(false);
  const dropdownRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    fetch(`${API_BASE}/api/locations`)
      .then((res) => res.json())
      .then((data) => {
        const locs = data.data || [];
        setLocations(locs);
        setFilteredLocations(locs);
      })
      .catch(() => {});
  }, []);

useEffect(() => {
  if (!value) {
    setLocationQuery("")
    return
  }
  setLocationQuery(value.replace(/-/g, " "))
}, [value])



  // handle closed dropdown when click outside
  useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowList(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);



  const handleChange = (e) => {
    const value = e.target.value;
    setLocationQuery(value);

    const filtered = locations.filter((loc) => {
      const nameMatch = loc.name?.toLowerCase().includes(value.toLowerCase());
      const cityMatch = loc.city?.name
        ?.toLowerCase()
        .includes(value.toLowerCase());
      return nameMatch || cityMatch;
    });

    setFilteredLocations(filtered);
  };

  const handleSelectLocation = (loc) => {
    setLocationQuery(`${loc.name} ${loc.city?.name || ""}`);
    setShowList(false);
    setFilters({
  locality: loc.slug || loc.name,
  skip: 0
});
  };



  return (
    <div ref={dropdownRef}>
      <label className="font-semibold text-sm">Location</label>

      <div className="relative mt-2">
        {/* INPUT BOX */}
        <div className="flex items-center gap-2 w-full h-9 border border-gray-300 rounded px-3 
        shadow-inner shadow-gray-200 focus-within:ring-2 focus-within:ring-red-400 bg-white">
          <CiLocationOn className="text-gray-600 text-lg" />
          <input
            value={locationQuery}
            onChange={handleChange}
            onFocus={() => setShowList(true)}
            placeholder="Enter your location"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* DROPDOWN */}
        {showList && filteredLocations.length > 0 && (
          <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 
          max-h-56 overflow-y-auto shadow-lg z-[999] scrollbar-none">
            {filteredLocations.map((loc) => (
              <div
                key={loc.id}
                onClick={() => handleSelectLocation(loc)}
                className="flex items-center text-[#09122C] text-sm py-2 px-3 
                hover:bg-[#f3f3f3] hover:text-[#e71717] rounded cursor-pointer"
              >
                <CiLocationOn className="mr-2 text-gray-500" />
                <div>
                  <h5>{loc.name}</h5>
                  {loc.city?.name && (
                    <p className="text-xs text-gray-500">{loc.city.name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
