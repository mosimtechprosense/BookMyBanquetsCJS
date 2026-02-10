import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ListingCard from "../../components/listings/ListingCard";
import Filters from "../../components/listings/Filters";
import Pagination from "../../components/listings/Pagination";
import { fetchListings } from "../../services/listings.service";

export default function AllListings() {
  const [searchParams] = useSearchParams();

  // Read query params from URL
  const initialCity = searchParams.get("city") || "";
  const initialService = searchParams.get("service") || "";

  // Initial filters (VERY IMPORTANT)
  const [filters, setFilters] = useState({
    city: initialCity,
    venueType: initialService, // backend expects venueType
  });

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch Listings
  useEffect(() => {
    loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page]);

  const loadData = async () => {
    try {
      const res = await fetchListings({
        ...filters,
        skip: (page - 1) * limit,
        take: limit,
      });

      setData(res?.listings || []);
      setTotal(res?.totalCount || 0);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setData([]);
      setTotal(0);
    }
  };

  // Update any filter
  const updateFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1); // reset pagination
  };

  return (
    <div className="flex gap-6 container mx-auto py-10">
      <Filters filters={filters} onFilter={updateFilter} />

      <div className="grid grid-cols-3 gap-6 flex-1">
        {data.length > 0 ? (
          data.map((item) => <ListingCard key={item.id} item={item} />)
        ) : (
          <p className="col-span-3 text-center text-gray-500">No listings found.</p>
        )}
      </div>

      <Pagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
}
