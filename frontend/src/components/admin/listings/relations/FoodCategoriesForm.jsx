export default function FoodCategoriesForm({ form, setForm }) {

const update = (key, value) => {
  setForm(prev => ({
    ...prev,
    [key]: value
  }));
};

  return (
<div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-4 shadow-sm">
  <h3 className="text-lg font-semibold text-gray-800">Food Pricing</h3>

  <div className="grid md:grid-cols-2 gap-4">

    {/* Veg Price */}
    <div className="space-y-1">
      <input
        className="input"
        placeholder="Enter veg price"
        value={form.vegPrice || ""}
        onChange={(e) => update("vegPrice", e.target.value)}
      />
    </div>

    {/* Non Veg Price */}
    <div className="space-y-1"> 
      <input
        className="input"
        placeholder="Enter non-veg price"
        value={form.nonVegPrice || ""}
        onChange={(e) => update("nonVegPrice", e.target.value)}
      />
    </div>

  </div>
</div>

  );
}