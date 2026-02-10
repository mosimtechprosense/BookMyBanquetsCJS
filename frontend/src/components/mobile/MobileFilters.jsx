import FiltersSidebar from "../FlitersSidebar/FiltersSidebar"
import SortFilter from "../FlitersSidebar/SortFilter"

export default function MobileFilters({
  open,
  setOpen,
  filters,
  setFilters,
  localities
}) {
  const isFilterOpen = open === "filter"
  const isSortOpen = open === "sort"

  return (
    <>
      {/* ───────────────── MOBILE BOTTOM BAR ───────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
        <div className="mx-3 mb-3 rounded-2xl bg-white shadow-xl flex overflow-hidden">
          <button
            onClick={() => setOpen("filter")}
            className="flex-1 py-3 flex items-center justify-center gap-2 font-medium text-gray-800 active:bg-gray-100"
          >
            Filters
          </button>

          <div className="w-px bg-gray-200" />

          <button
            onClick={() => setOpen("sort")}
            className="flex-1 py-3 flex items-center justify-center gap-2 font-medium text-gray-800 active:bg-gray-100"
          >
            Sort
          </button>
        </div>
      </div>

      {/* ───────────────── FILTER OVERLAY ───────────────── */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-1000 bg-white md:hidden flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white px-4 py-3 shadow-md flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setOpen(null)}
              className="text-2xl text-gray-500"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
            <FiltersSidebar
              filters={filters}
              setFilters={setFilters}
              localities={localities}
            />
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white px-4 py-3 shadow-[0_-4px_10px_rgba(0,0,0,0.08)] flex justify-center">
            <button
              onClick={() => setOpen(null)}
              className="w-[90%] py-2 bg-red-600 text-white rounded-xl font-semibold active:scale-[0.98]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/*SORT OVERLAY */}
      {isSortOpen && (
        <div className="fixed inset-0 z-1000 bg-white md:hidden flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white px-4 py-3 shadow-md flex items-center justify-between">
            <h2 className="text-lg font-semibold">Sort Options</h2>
            <button
              onClick={() => setOpen(null)}
              className="text-2xl text-gray-500"
            >
              ✕
            </button>
          </div>

          {/* Content: Use full SortFilter section like desktop */}
          <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
            <SortFilter filters={filters} setFilters={setFilters} />
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white px-4 py-3 shadow-[0_-4px_10px_rgba(0,0,0,0.08)] flex justify-center">
            <button
              onClick={() => setOpen(null)}
              className="w-[85%] py-2 bg-red-600 text-white rounded-xl font-semibold active:scale-[0.98]"
            >
              Apply Sort
            </button>
          </div>
        </div>
      )}
    </>
  )
}
