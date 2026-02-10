export default function MealTypeFilter({ filters, setFilters }) {
  return (
    <div>
      <label className="font-semibold text-sm">Meal Type</label>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
<input
  type="checkbox"
  checked={filters.vegetarian === true}
  onChange={() =>
    setFilters({
      vegetarian: filters.vegetarian ? undefined : true,
      skip: 0,
    })
  }
/>
          Vegetarian
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
<input
  type="checkbox"
  checked={filters.nonVegetarian === true}
  onChange={() =>
    setFilters({
      nonVegetarian: filters.nonVegetarian ? undefined : true,
      skip: 0,
    })
  }
/>
          Non-Vegetarian
        </label>
      </div>
    </div>
  );
}