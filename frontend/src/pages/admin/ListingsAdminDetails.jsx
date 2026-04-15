import { useEffect, useState, useCallback } from "react";
import {
  getListings,
  deleteListing,
  getListingById
} from "../../api/admin/listings.api.js";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import DataTable from "../../components/admin/tables/DataTable.jsx";
import ListingFormModal from "../../components/admin/listings/ListingFormModal.jsx";
import { stripHTML } from "../../utils/stripHTML.js";


export default function ListingsAdminDetails() {

  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);



const fetchListings = useCallback(async () => {
  try {
    const res = await getListings({
      page,
      limit,
      search
    });

    const data = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data?.data)
      ? res.data.data
      : [];

    setListings(data);

    const total = res.total || 0;
    setTotalPages(Math.ceil(total / limit));
  } catch (err) {
    console.error("Error fetching listings", err);
  }
}, [page, limit, search]);


  //  LOAD DATA
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  //  DELETE
  const removeListing = async (id) => {
    if (confirm("Delete listing?")) {
      await deleteListing(id);
      fetchListings();
    }
  };

  
const columns = [

  { key: "id", label: "ID" },

  {
    key: "title",
    label: "Title",
    render: (row) => (
      <div>
        <div className="font-medium">{row.title}</div>
      </div>
    )
  },

{
  key: "excerpt",
  label: "Excerpt",
  render: (row) => (
    <div className="text-xs max-w-55 line-clamp-2 text-gray-600 truncate">
      {stripHTML(row.excerpt) || "-"}
    </div>
  )
},

{
  key: "description",
  label: "Description",
  render: (row) => {
    const text = row.description
      ? row.description.replace(/<[^>]+>/g, "")
      : "-";

    return (
      <div className="text-xs max-w-62.5 line-clamp-2 text-gray-600 truncate">
        {text}
      </div>
    );
  }
},

{
  key: "keywords",
  label: "Keywords",
  render: (row) => {
    const words = row.keywords?.split(",") || [];

    return (
      <div className="max-w-55 overflow-hidden">
        <div className="flex gap-1 whitespace-nowrap">
          {words.map((k, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full shrink-0"
            >
              {k.trim()}
            </span>
          ))}
        </div>
      </div>
    );
  }
},

{
  key: "budget",
  label: "Budget",
  render: (row) => {
    const hasBudget = row.budget;

    return (
      <div
        className={`text-xs ${
          !hasBudget ? "text-center" : ""
        }`}
      >
        ₹{row.min_budget} - ₹{row.max_budget}

        <div className="text-gray-400">
          {hasBudget ? row.budget : "-"}
        </div>
      </div>
    );
  }
},

{
  key: "guests",
  label: "Guests",
  render: (row) => {
    const hasGuests = row.guests;

    return (
      <div
        className={`text-xs ${
          !hasGuests ? "text-center" : ""
        }`}
      >
        {row.min_guest} - {row.max_guest}

        <div className="text-gray-400">
          {hasGuests ? row.guests : "-"}
        </div>
      </div>
    );
  }
},

{
  key: "features",
  label: "Features",
  render: (row) => (
    <div
      className={`text-xs max-w-50 text-gray-600 truncate ${
        row.features && row.features.replace(/<[^>]+>/g, "").trim()
          ? "line-clamp-2"
          : "text-center"
      }`}
    >
      {row.features && row.features.replace(/<[^>]+>/g, "").trim()
        ? row.features.replace(/<[^>]+>/g, "")
        : "-"}
    </div>
  )
},

{
  key: "policies",
  label: "Policies",
  render: (row) => (
    <div
      className={`text-xs max-w-50 text-gray-600 truncate ${
        row.policies && row.policies.replace(/<[^>]+>/g, "").trim()
          ? "line-clamp-2"
          : "text-center"
      }`}
    >
      {row.policies && row.policies.replace(/<[^>]+>/g, "").trim()
        ? row.policies.replace(/<[^>]+>/g, "")
        : "-"}
    </div>
  )
},

{
  key: "contact",
  label: "Contact",
  render: (row) => (
    <div
      className={`text-xs ${
        !row.phone && !row.email ? "text-center" : ""
      }`}
    >
      {row.phone || row.email ? (
        <>
          <div>{row.phone || "-"}</div>
          <div className="text-gray-400">{row.email || "-"}</div>
        </>
      ) : (
        "-"
      )}
    </div>
  )
},

  {
    key: "address",
    label: "Address",
    render: (row) => (
      <div className="text-xs max-w-50 truncate">
        {row.address}
      </div>
    )
  },

  {
    key: "location",
    label: "Location",
    render: (row) => (
      <div className="text-xs">
        {row.locality || "-"}, {row.city}
        <div className="text-gray-400">
          {row.state}, {row.country} - {row.pincode}
        </div>
      </div>
    )
  },

  {
    key: "map",
    label: "Map",
    render: (row) =>
      row.google_map_url ? (
        <a
          href={row.google_map_url}
          target="_blank"
          className="text-blue-500 text-xs"
        >
          View
        </a>
      ) : "-"
  },
{
  key: "recommended",
  label: "Recommended",
  render: (row) => (
    <span
      className={`text-xs px-2 py-1 rounded text-white ${
        row.recommended ? "bg-green-600" : "bg-gray-400"
      }`}
    >
      {row.recommended ? "Yes" : "No"}
    </span>
  )
},

{
  key: "popular",
  label: "Popular",
  render: (row) => (
    <span
      className={`text-xs px-2 py-1 rounded text-white ${
        row.popular ? "bg-green-600" : "bg-gray-400"
      }`}
    >
      {row.popular ? "Yes" : "No"}
    </span>
  )
},

{
  key: "trending",
  label: "Trending",
  render: (row) => (
    <span
      className={`text-xs px-2 py-1 rounded text-white ${
        row.trending ? "bg-green-600" : "bg-gray-400"
      }`}
    >
      {row.trending ? "Yes" : "No"}
    </span>
  )
},

{
  key: "high_demand",
  label: "High Demand",
  render: (row) => (
    <div className="min-w-35 text-center">  
      <span
        className={`text-xs px-2 py-1 rounded text-white ${
          row.high_demand ? "bg-green-600" : "bg-gray-400"
        }`}
      >
        {row.high_demand ? "Yes" : "No"}
      </span>
    </div>
  )
},

{
  key: "city_id",
  label: "City",
  render: (row) => (
    <span className="text-xs px-2 py-1 bg-gray-100 rounded">
      {row.city_id || "-"}
    </span>
  )
},

  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span
        className={`text-xs px-2 py-1 rounded text-white ${
          row.status ? "bg-green-600" : "bg-gray-500"
        }`}
      >
        {row.status ? "Active" : "Inactive"}
      </span>
    )
  },

  {
    key: "created_at",
    label: "Created",
    render: (row) => (
      <div className="text-xs">
        {row.created_at
          ? new Date(row.created_at).toLocaleDateString()
          : "-"}
      </div>
    )
  }

];

  // ✅ PAGINATION CALC (LIKE LEADS)
  const visiblePages = 10;
  const startPage =
    Math.floor((page - 1) / visiblePages) * visiblePages + 1;
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

  return (
    <>

{/* Header */}
<div className="flex justify-between mr-558 items-center mb-4">
  <h1 className="text-xl font-bold">Listings</h1>

  <button
    onClick={() => {
      setEditingListing(null);
      setShowForm(true);
    }}
    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-cyan-800 cursor-pointer"
  >
    Add Listing
  </button>
</div>

{/* Controls ABOVE table */}
<div className="mb-4">
  <div className="flex justify-between items-center">

    {/* Show entries */}
    <div className="flex justify-start items-center gap-2 text-sm px-2">
      <span className="text-gray-600">Show</span>

      <div className="relative">
        <select
          value={limit}
          onChange={(e) => {
            setPage(1);
            setLimit(+e.target.value);
          }}
          className="
            appearance-none
            px-3 py-1.5 pr-8
            border border-gray-300
            rounded-md
            bg-white
            shadow-sm
            cursor-pointer
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        >
          {[10, 25, 50, 100].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <span className="text-gray-600">entries</span>
    </div>

    {/* Search */}
    <div className="flex justify-center flex-1 mr-360">
      <input
        type="text"
        placeholder="Search listings..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        className="
          w-52.5
          px-4 py-2
          border border-gray-300
          rounded-lg
          text-sm
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-500
        "
      />
    </div>

  </div>
</div>


      {/* TABLE */}
      <DataTable
        columns={columns}
        data={listings}
        actions={(row) => (
          <div className="flex gap-3">

            {/* EDIT */}
            <button
              className="text-blue-500 cursor-pointer"
onClick={async () => {
  try {
    const res = await getListingById(row.id);
    const rawListing = res.data?.data || res.data || res;

    // Force id to number and set defaults for arrays
    const fullListing = {
      ...rawListing,
      id: Number(rawListing.id), // ✅ converts "753" -> 753
      hall_capacities: rawListing.hall_capacities || [],
      faqs: rawListing.faqs || [],
      venue_images: rawListing.venue_images || [],
      listing_categories: rawListing.listing_categories || [],
      listing_food_categories: rawListing.listing_food_categories || []
    };
    setEditingListing(fullListing);
    setShowForm(true);
  } catch (err) {
    console.error("Failed to fetch listing", err);
  }
}}
            >
              <FaEdit />
            </button>

            {/* DELETE */}
            <button
              className="text-red-600"
              onClick={() => removeListing(row.id)}
            >
              <MdDeleteForever />
            </button>

          </div>
        )}
      />

      {/* Pagination */}
<div className="flex justify-start ml-50 mt-10 px-4">
  <div className="flex items-center gap-1">

    <button
      disabled={page === 1}
      onClick={() => setPage(p => p - 1)}
      className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 cursor-pointer hover:bg-gray-100"
    >
      Prev
    </button>

    {Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ).map(pageNo => (
      <button
        key={pageNo}
        onClick={() => setPage(pageNo)}
        className={`px-3 py-1 border rounded
          ${
            page === pageNo
              ? "bg-cyan-700 text-white border-cyan-700"
              : "bg-white border-gray-300 hover:bg-gray-100 cursor-pointer"
          }`}
      >
        {pageNo}
      </button>
    ))}

    <button
      disabled={page === totalPages}
      onClick={() => setPage(p => p + 1)}
      className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 cursor-pointer hover:bg-gray-100"
    >
      Next
    </button>

  </div>
</div>

      {/* MODAL */}
      {showForm && (
        <ListingFormModal
          editingListing={editingListing}
          onClose={() => {
            setShowForm(false);
            setEditingListing(null);
          }}
          onSaved={fetchListings}
        />
      )}
    </>
  );
}