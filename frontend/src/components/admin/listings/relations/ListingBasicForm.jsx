import { useEffect } from "react";
import RichTextEditor from "../../../common/RichTextEditor";
import "../../../../style/listingAdmin.css"



export default function ListingBasicForm({ form, setForm }) {

const numberFields = [
  "min_budget",
  "max_budget",
  "min_guest",
  "max_guest",
  "pincode",
  "lat",
  "long"
];


const stripHTML = (html) => {
  if (!html) return "";

  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

console.log("FINAL PAYLOAD EXCERPT:", form.excerpt);

const update = (key, value) => {
  let finalValue =
    value && value.target ? value.target.value : value;

  // clean excerpt
  if (key === "excerpt") {
     console.log("RAW:", finalValue);
    finalValue = stripHTML(finalValue);
    console.log("CLEAN:", finalValue);
  }

  // handle numbers
  if (numberFields.includes(key)) {
    if (finalValue === "" || finalValue === null) {
      finalValue = "";
    } else {
      const parsed = Number(finalValue);
      finalValue = isNaN(parsed) ? "" : parsed;
    }
  }
  setForm((prev) => ({
    ...prev,
    [key]: finalValue,
  }));
};





useEffect(() => {
  const toSlug = (str) =>
    String(str || "") // 
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const parts = [form.title, form.locality, form.city, form.state].filter(Boolean);

  if (parts.length) {
    const newSlug = parts.map(toSlug).join("-");

    if (newSlug !== form.slug) {
      setForm(prev => ({
        ...prev,
        slug: newSlug
      }));
    }
  }

}, [form.title, form.locality, form.city, form.state, form.slug, setForm]);



return (
  <div className="max-w-6xl mx-auto space-y-8">

    {/* 🟦 BASIC */}
    <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Basic Info</h3>




<input
  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black transition"
  placeholder="Title"
  value={form.title || ""}
  onChange={(e) => update("title", e.target.value)} 
/>
  

      <input
        className="mt-2 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black transition"
        placeholder="Enter short excerpt..."
        value={form.excerpt || ""}
        onChange={(e) => update("excerpt", e.target.value)}
      />

      <RichTextEditor
        className="mt-2"
        placeholder="Enter full description..."
        value={form.description || ""}
         onChange={(val) => update("description", val)} 
      />

      <input
        className="mt-2 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black transition"
        placeholder="Enter keywords (comma separated)..."
        value={form.keywords || ""}
        onChange={(e) => update("keywords", e.target.value)}
      />
    </section>

    {/* 💰 PRICING */}
    <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Pricing & Guests</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input className="input" placeholder="Min Budget" value={form.min_budget || ""} onChange={(e) => update("min_budget", e.target.value)} />
        <input className="input" placeholder="Max Budget" value={form.max_budget || ""} onChange={(e) => update("max_budget", e.target.value)} />
        <input className="input" placeholder="Min Guests" value={form.min_guest || ""} onChange={(e) => update("min_guest", e.target.value)} />
        <input className="input" placeholder="Max Guests" value={form.max_guest || ""} onChange={(e) => update("max_guest", e.target.value)} />
      </div>
    </section>

    {/* 📍 LOCATION */}
    <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Location</h3>

      <input
        className="mt-2 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black transition"
        placeholder="Enter full address..."
        value={form.address || ""}
        onChange={(e) => update("address", e.target.value)}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <input className="input" placeholder="City" value={form.city || ""} onChange={(e) => update("city", e.target.value)} />
        <input className="input" placeholder="State" value={form.state || ""} onChange={(e) => update("state", e.target.value)} />
        <input className="input" placeholder="Country" value={form.country || ""} onChange={(e) => update("country", e.target.value)} />
        <input className="input" placeholder="Locality" value={form.locality || ""} onChange={(e) => update("locality", e.target.value)} />
        <input className="input" placeholder="Pincode" value={form.pincode || ""} onChange={(e) => update("pincode", e.target.value)} />
        <input className="input" placeholder="Google Map URL" value={form.google_map_url || ""} onChange={(e) => update("google_map_url", e.target.value)} />
        <input className="input" placeholder="Latitude" value={form.lat || ""} onChange={(e) => update("lat", e.target.value)} />
        <input className="input" placeholder="Longitude" value={form.long || ""} onChange={(e) => update("long", e.target.value)} />
      </div>
    </section>

    {/* CONTACT */}
    <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Contact</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input className="input" placeholder="Phone" value={form.phone || ""} onChange={(e) => update("phone", e.target.value)} />
        <input className="input" placeholder="Email" value={form.email || ""} onChange={(e) => update("email", e.target.value)} />
      </div>
    </section>

{/* FLAGS */}
<section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
  <h3 className="text-lg font-semibold text-gray-800">Flags</h3>

  <div className="flex flex-wrap gap-2">
    {[
      "recommended",
      "popular",
      "trending",
      "high_demand",
      "status"
    ].map(flag => {
      const isActive = !!form[flag];

      return (
        <label
          key={flag}
          className={`px-3 py-1.5 rounded-full text-xs border cursor-pointer transition
            ${isActive
              ? "bg-green-600 text-white border-green-600 shadow-sm"
              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-green-100"
            }`}
        >
          <input
            type="checkbox"
            className="hidden"
            checked={isActive}
            onChange={(e) => update(flag, e.target.checked)}
          />
          {flag.replace("_", " ")}
        </label>
      );
    })}
  </div>
</section>

    {/* 📝 EXTRA */}
    <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Extra Content</h3>

      <RichTextEditor
        className="mt-2"
        placeholder="List features..."
        value={form.features || ""}
        onChange={(val) => update("features", val)}
      />

      <RichTextEditor
        className="mt-2"
        placeholder="List policies..."
        value={form.policies || ""}
        onChange={(val) => update("policies", val)}
      />
    </section>

  </div>
);
}