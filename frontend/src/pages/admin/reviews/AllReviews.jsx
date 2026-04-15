import { useCallback, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import DataTable from "../../../components/admin/tables/DataTable";
import { fetchAllReviews, updateReviewStatus } from "../../../api/listingReviewsApi";

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRows, setExpandedRows] = useState({});


  // read full review
  const toggleExpand = (id) => {
  setExpandedRows(prev => ({
    ...prev,
    [id]: !prev[id]
  }));
};


  // 📡 Load Data (same pattern as leads)
  const loadData = useCallback(async () => {
    try {
      const res = await fetchAllReviews({ page, limit, search });

setReviews(res.data || []);
setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  }, [page, limit, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  //  Toggle Status
const handleToggle = async (id, status) => {
  try {
    console.log("Sending:", id, !status);

    const res = await updateReviewStatus(id, !status);

    console.log("Response:", res);

    loadData();
  } catch (err) {
    console.error("Toggle Error:", err.response?.data || err.message);
  }
};

  // 📊 Columns
  const columns = [
{
  key: "created_at",
  label: "Date",
  render: row => {
    if (!row.created_at) return "";

    const d = new Date(row.created_at);

    return (
      <span className="text-sm text-gray-700">
        {d.toLocaleDateString("en-GB")} {/* DD/MM/YYYY */}
      </span>
    );
  }
},
{
  key: "listing",
  label: "Listing",
  render: row => (
    <span className="text-sm font-medium text-gray-800">
      {row.listing?.title || "—"}
    </span>
  )
},
    { key: "name", label: "Name" },
{
  key: "message",
  label: "Review",
  render: row => {
    const isExpanded = expandedRows[row.id];
    const text = row.message || "";

    const short =
      text.length > 80
        ? text.slice(0, text.lastIndexOf(" ", 80)) + "..."
        : text;

    return (
      <div className="relative group max-w-[320px]">
        
        {/* TEXT */}
        <p
          onClick={() => toggleExpand(row.id)}
          className="
            text-gray-700 
            whitespace-normal 
            wrap-break-word
            pr-16   /* space for button */
            cursor-pointer
          "
        >
          {isExpanded ? text : short}
        </p>

        {/* READ MORE (inside text) */}
        {!isExpanded && text.length > 80 && (
          <span
            onClick={() => toggleExpand(row.id)}
            className="
text-blue-500 text-md mt-2
            "
          >
            Read More
          </span>
        )}

        {/* SHOW LESS */}
        {isExpanded && (
          <span
            onClick={() => toggleExpand(row.id)}
            className="
text-blue-500 text-md mt-2
            "
          >
            Show Less
          </span>
        )}
      </div>
    );
  }
},
    { key: "rating", label: "Rating" },

    {
      key: "status",
      label: "Status",
      render: row => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.status
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-white"
          }`}
        >
          {row.status ? "Active" : "InActive"}
        </span>
      )
    },
    {
      key: "action",
      label: "Action",
      render: row => (
<button
  onClick={() => handleToggle(row.id, row.status)}
  className={`
    px-3 py-1 text-xs rounded font-semibold transition cursor-pointer
    ${
      row.status
        ? "bg-red-500 hover:bg-red-600 text-white"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }
  `}
>
  {row.status ? "Disable" : "Approve"}
</button>
      )
    }
  ];

  // 📄 Pagination logic (same as yours)
  const visiblePages = 10;
  const startPage =
    Math.floor((page - 1) / visiblePages) * visiblePages + 1;
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

return (
  <>
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold">Review Management</h1>

      <div className="text-sm text-gray-500">
        Total Reviews: {reviews.length}
      </div>
    </div>

    {/* Controls */}
    <div className="mb-4">
      <div className="flex justify-between items-center">

        {/* Show entries */}
        <div className="flex items-center gap-2 text-sm px-2">
          <span className="text-gray-600">Show</span>

          <div className="relative">
            <select
              value={limit}
              onChange={e => {
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

            <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
          </div>

          <span className="text-gray-600">entries</span>
        </div>

        {/* Search */}
        <div className="flex justify-end flex-1 mr-52">
          <input
            type="text"
            placeholder="Search by name or review..."
            value={search}
            onChange={e => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="
              w-60
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

    {/* Table */}
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <DataTable columns={columns} data={reviews} />
    </div>

    {/* Pagination */}
    <div className="flex justify-start ml-50 mt-10 px-4">
      <div className="flex items-center gap-1">

        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-100 cursor-pointer"
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
          className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-100 cursor-pointer"
        >
          Next
        </button>

      </div>
    </div>
  </>
);
}