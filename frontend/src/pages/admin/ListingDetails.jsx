import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ListingDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE;
  

useEffect(() => {
  const load = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/listings/${id}/full`);
      const json = await res.json();
      setData(json.data?.data || json.data || json); // adjust here if needed
    } catch (err) {
      console.error(err);
    }
  };

  load();
}, [BASE_URL, id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">{data?.title || "No Title"}</h1>

<div
  dangerouslySetInnerHTML={{ __html: data?.description || "" }}
/>


      {/* Basic Info */}
      <div>
        <h2 className="font-semibold">Location</h2>
        <p>{data.address}, {data.locality}, {data.city}</p>
      </div>

      {/* Budget */}
      <div>
        <h2 className="font-semibold">Budget</h2>
        <p>₹{data.min_budget} - ₹{data.max_budget}</p>
      </div>

      {/* Guests */}
      <div>
        <h2 className="font-semibold">Capacity</h2>
        <p>{data.min_guest} - {data.max_guest} guests</p>
      </div>

      {/* Images */}
      <div>
        <h2 className="font-semibold">Images</h2>
        <div className="grid grid-cols-4 gap-2">
{data?.venue_images?.length > 0 ? (
  data.venue_images.map(img => <img
  key={img.id}
  src={img.image_url}
  alt=""
  className="w-full h-32 object-cover rounded"
/>)
) : (
  <p>No images</p>
)}
        </div>
      </div>

      {/* Hall Capacities */}
      <div>
        <h2 className="font-semibold">Hall Capacities</h2>
        {data.hall_capacities?.map(h => (
          <div key={h.id}>
            {h.area} - {h.capacity}
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div>
        <h2 className="font-semibold">FAQs</h2>
        {data.faqs?.map(f => (
          <div key={f.id}>
            <b>{f.question}</b>
            <p>{f.answer}</p>
          </div>
        ))}
      </div>

    </div>
  );
}