import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecentSearches = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]); // full list from API

  const API_BASE = import.meta.env.VITE_API_BASE;
  
    // fetch locations form API
    useEffect(() => {
      fetch(`${API_BASE}/api/locations`)
      .then((res) => res.json())
      .then((data) =>{
        setLocations(data.data || [])
      })
      .catch((err) => {
      console.error("Error fetching locations:", err);
      setLocations([]);
      })
    }, [])

const handleClick = (location) => {
  if (!location) return;

  const locationSlug = location
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const queryParams = new URLSearchParams({
    search: "Banquet Halls",
    locality: location,
  }).toString();

  navigate(`/banquet-hall-in/${locationSlug}?${queryParams}`);
};


  return (
    <section className="bg-[#dc2626] text-white py-6 px-6 text-center relative overflow-hidden select-none">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#b91c1c] to-[#ef4444] opacity-90"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">
          Recent Searches
        </h2>
        <p className="text-white/80 text-sm sm:text-base mb-10">
          Explore the most popular banquet hall locations near you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-6 text-left">
          {locations.map((loc, i) => (
            <button
              key={i}
              onClick={() => handleClick(loc.name)}
              className="relative group text-left text-white/90 font-medium hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span className="relative inline-block">
                Banquet Hall in {loc.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentSearches;
