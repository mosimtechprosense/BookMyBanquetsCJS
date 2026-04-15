export default function HallCapacitiesForm({ form, setForm }) {
  const add = () => {
setForm(prev => ({
  ...prev,
  hall_capacities: [
    ...prev.hall_capacities,
    {
      area: "",
      capacity: "",
      floating: "",
      type: "indoor",
      day_availability: "yes",
      night_availability: "yes"
    }
  ]
}));
  }

  const update = (i, key, value) => {
    const updated = [...form.hall_capacities]
    updated[i][key] = value
    setForm({ ...form, hall_capacities: updated })
  }

  const remove = (i) => {
    const updated = form.hall_capacities.filter((_, index) => index !== i)
    setForm({ ...form, hall_capacities: updated })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold tracking-tight">
          Hall Capacities
        </h3>

        <button
          type="button"
          onClick={add}
          className="px-3 py-1.5 text-xs bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          + Add Hall
        </button>
      </div>

      {/* Cards */}
      {(form.hall_capacities || []).map((hall, i) => (
        <div
          key={i}
          className="relative border border-gray-200 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          {/* Remove */}
          <button
            type="button"
            onClick={() => remove(i)}
            className="absolute top-3 right-3 text-gray-300 hover:text-red-500 text-sm cursor-pointer"
          >
            ✕
          </button>

          {/* Top Inputs */}
          <div className="grid md:grid-cols-3 gap-3">
            <input
              placeholder="Hall"
              className="border-b border-gray-200 focus:border-black outline-none text-sm p-1 bg-transparent"
              value={hall.area}
              onChange={(e) => update(i, "area", e.target.value)}
            />

            <input
              type="number"
              placeholder="Seating"
              className="border-b border-gray-200 focus:border-black outline-none text-sm p-1 bg-transparent"
              value={hall.capacity}
              onChange={(e) => update(i, "capacity", e.target.value)}
            />

            <input
              type="number"
              placeholder="Floating"
              className="border-b border-gray-200 focus:border-black outline-none text-sm p-1 bg-transparent"
              value={hall.floating}
              onChange={(e) => update(i, "floating", e.target.value)}
            />
          </div>

          {/* Type + Availability Row */}
          <div className="flex items-center gap-10 mt-8">
            {/* Type */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Type</span>

              {["indoor", "outdoor"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => update(i, "type", t)}
                  className={`px-3 py-1 text-xs rounded-full border cursor-pointer ${
                    hall.type === t
                      ? "bg-black text-white border-black"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">Availability</span>

              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hall.day_availability === "yes"}
                  onChange={(e) =>
                    update(
                      i,
                      "day_availability",
                      e.target.checked ? "yes" : "no"
                    )
                  }
                  className="w-3.5 h-3.5 accent-black cursor-pointer"
                />
                Day
              </label>

              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hall.night_availability === "yes"}
                  onChange={(e) =>
                    update(
                      i,
                      "night_availability",
                      e.target.checked ? "yes" : "no"
                    )
                  }
                  className="w-3.5 h-3.5 accent-black cursor-pointer"
                />
                Night
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
