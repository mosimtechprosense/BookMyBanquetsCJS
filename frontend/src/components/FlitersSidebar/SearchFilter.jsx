export default function SearchFilter({ search, setFilters }) {
  return (
    <div>
      <label className="font-semibold text-sm">Search</label>
      <input
        value={search || ""}
        onChange={(e) => setFilters({ search: e.target.value, skip: 0 })}
        className="w-full h-9 border border-gray-300 rounded px-3 text-sm shadow-inner shadow-gray-200 mt-1 focus:ring-2 focus:ring-red-400 focus:outline-none"
        placeholder="Search venues..."
      />
    </div>
  );
}
