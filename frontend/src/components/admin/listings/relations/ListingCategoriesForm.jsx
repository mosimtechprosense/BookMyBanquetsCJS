export default function ListingCategoriesForm({ form, setForm }) {

  const categoriesData = [
    { label: "BMB Assured", id: 26 },
    { label: "BMB Verified", id: 27 },
    { label: "Banquet Halls", id: 6 },
    { label: "Marriage Halls", id: 8 },
    { label: "Wedding Farmhouse", id: 13 },
    { label: "Party Halls", id: 7 },
    { label: "5 Star Wedding Hotels", id: 11 },
    { label: "Destination Weddings", id: 12 },
  ];

  const toggleCategory = (id) => {
    let updated = [...(form.listing_categories || [])];

    if (updated.includes(id)) {
      updated = updated.filter(c => c !== id);
    } else {
      updated.push(id);
    }

    setForm({ ...form, listing_categories: updated });
  };

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Categories</h3>

      <div className="flex flex-wrap gap-2">

        {categoriesData.map(cat => {
          const isActive = (form.listing_categories || []).includes(cat.id);

          return (
            <label
              key={cat.id}
              className={`px-3 py-1.5 rounded-full text-xs border cursor-pointer transition 
                ${isActive 
                  ? "bg-green-600 text-white border-green-600 shadow-sm" 
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-green-100"
                }`}
            >
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => toggleCategory(cat.id)}
                className="hidden"
              />
              {cat.label}
            </label>
          );
        })}

      </div>
    </section>
  );
}