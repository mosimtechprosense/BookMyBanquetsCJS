import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListingCard from "../../components/listings/ListingCard";
import { fetchListingsByLocation } from "../../services/listings.service";

export default function LocationListings() {
  const { location } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [location]);

  const fetchData = async () => {
    const res = await fetchListingsByLocation(location);
    setData(res.listings);
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">
        Banquet Halls in {location}
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {data.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
