import { useEffect, useState } from "react";

import ListingBasicForm from "./relations/ListingBasicForm";
import HallCapacitiesForm from "./relations/HallCapacitiesForm";
import VenueImagesForm from "./relations/VenueImagesForm";
import FoodCategoriesForm from "./relations/FoodCategoriesForm";
import FaqsForm from "./relations/FaqsForm";
import ListingCategoriesForm from "./relations/ListingCategoriesForm";

import { createListing, updateListing } from "../../../api/admin/listings.api";

export default function ListingFormModal({ editingListing, onClose, onSaved }) {

  const [initialized, setInitialized] = useState(false);

const [form, setForm] = useState({
  // BASIC
  title: "",
  slug: "",
  excerpt: "",
  description: "",

  // PRICING
  min_budget: "",
  max_budget: "",
  min_guest: "",
  max_guest: "",

  // FOOD
  vegPrice: "",
  nonVegPrice: "",
  listing_food_categories: [],

  // LOCATION
  address: "",
  city: "",
  state: "",
  country: "",
  locality: "",
  pincode: "",
  lat: "",
  long: "",
  google_map_url: "",

  // CONTACT
  phone: "",
  email: "",

  // FLAGS
  recommended: true,
  popular: true,
  trending: false,
  high_demand: false,
  status: true,

  // EXTRA
  features: "",
  policies: "",

  // RELATIONS
  venue_images: [],
  hall_capacities: [],
  faqs: [],
  listing_categories: []
});

const stripHTML = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

useEffect(() => {
  if (editingListing && !initialized) {
    setForm(prev => ({
      ...prev,

      // BASIC
      title: editingListing.title || "",
      excerpt: stripHTML(editingListing.excerpt),
      description: editingListing.description || "",
      keywords: editingListing.keywords || "",

      // PRICING
      min_budget: editingListing.min_budget || "",
      max_budget: editingListing.max_budget || "",
      min_guest: editingListing.min_guest || "",
      max_guest: editingListing.max_guest || "",

      // FOOD
      vegPrice:
        editingListing.listing_food_categories?.find(f => f.food_category_id == 1)?.price?.toString() || "",
      nonVegPrice:
        editingListing.listing_food_categories?.find(f => f.food_category_id == 2)?.price?.toString() || "",

      // LOCATION
      address: editingListing.address || "",
      city: editingListing.city || "",
      state: editingListing.state || "",
      country: editingListing.country || "",
      locality: editingListing.locality || "",
      pincode: editingListing.pincode?.toString() || "",
      lat: editingListing.lat?.toString() || "",
      long: editingListing.long?.toString() || "",
      google_map_url: editingListing.google_map_url || "",

      // CONTACT
      phone: editingListing.phone || "",
      email: editingListing.email || "",

      // FLAGS
      recommended: editingListing.recommended ?? false,
      popular: editingListing.popular ?? false,
      trending: editingListing.trending ?? false,
      high_demand: editingListing.high_demand ?? false,
      status: editingListing.status ?? true,

      // EXTRA
      features: editingListing.features || "",
      policies: editingListing.policies || "",

      // RELATIONS
      hall_capacities: (editingListing.hall_capacities || []).map(h => ({
        ...h,
        capacity: h.capacity?.toString() || "",
        floating: h.floating?.toString() || ""
      })),

      faqs: (editingListing.faqs || []).map(f => ({
        question: f.question || "",
        answer: f.answer || ""
      })),

      listing_categories: (editingListing.listing_categories || []).map(c =>
        Number(c.listing_category_id)
      ),

      venue_images: editingListing.venue_images || []
    }));

    setInitialized(true); // ✅ prevent future overwrite
  }
}, [editingListing, initialized]);


const generateSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");



const handleSubmit = async () => {
  try {
const payload = {
  ...form, 

  slug: form.slug || generateSlug(form.title),

  min_budget: Number(form.min_budget),
  max_budget: Number(form.max_budget),
  min_guest: Number(form.min_guest),
  max_guest: Number(form.max_guest),
  lat: Number(form.lat),
  long: Number(form.long),
  pincode: Number(form.pincode),
  excerpt: stripHTML(form.excerpt),

  hall_capacities: form.hall_capacities.map(h => ({
    ...h,
    capacity: Number(h.capacity),
    floating: Number(h.floating)
  })),

  listing_food_categories: [
    ...(form.vegPrice
      ? [{ food_category_id: 1, price: Number(form.vegPrice) }]
      : []),
    ...(form.nonVegPrice
      ? [{ food_category_id: 2, price: Number(form.nonVegPrice) }]
      : [])
  ]
};

    if (editingListing) {
      await updateListing(editingListing.id, payload);
      alert("✅ Listing updated successfully");
    } else {
      await createListing(payload);
      alert("✅ Listing created successfully");
    }

    onSaved();
    onClose();
  } catch (err) {
    console.error(err);
    console.error(err.message);
     alert("❌ " + err.message);
  }
};


  return (
<div className="fixed inset-0 bg-black/50 flex justify-center items-start overflow-auto p-6">
  <div className="bg-gray-50 w-275 p-6 rounded-2xl shadow-xl space-y-6">

    {/* HEADER */}
    <div className="flex justify-between items-center border-b pb-3">
      <h2 className="text-xl font-semibold">
        {editingListing ? "Edit Listing" : "Add Listing"}
      </h2>

      <button className="cursor-pointer" onClick={onClose}>✖</button>
    </div>

    {/* GRID LAYOUT */}
    <div className="grid grid-cols-3 gap-6">

      {/* LEFT (MAIN) */}
      <div className="col-span-2 space-y-6">

        <ListingBasicForm form={form} setForm={setForm} />

        <div className="bg-white p-5 rounded-xl shadow">
          <HallCapacitiesForm form={form} setForm={setForm} />
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <FaqsForm form={form} setForm={setForm} />
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="space-y-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <VenueImagesForm form={form} setForm={setForm} formId={editingListing?.id} />
        </div>

          <FoodCategoriesForm form={form} setForm={setForm} />

        <div className="bg-white p-5 rounded-xl shadow">
          <ListingCategoriesForm form={form} setForm={setForm} />
        </div>

      </div>

    </div>

    {/* FOOTER */}
    <div className="flex justify-end gap-3 pt-4 border-t">
      <button onClick={onClose} className="px-4 py-2 border rounded">
        Cancel
      </button>

      <button
        onClick={handleSubmit}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 cursor-pointer"
      >
        Save Listing
      </button>
    </div>

  </div>
</div>
  );
}