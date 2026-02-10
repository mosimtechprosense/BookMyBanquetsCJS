import { HiUserGroup } from "react-icons/hi2";
import FoodPrice from "./FoodPrice";

export default function Sidebar({ listing, setPopupOpen }) {
  if (!listing) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-2">Event Details</h3>
        <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            <HiUserGroup className="h-4 w-4 text-red-600" />
            {listing.min_guest} – {listing.max_guest} guests
          </span>
          <FoodPrice
            vegPrice={listing.vegPrice}
            nonVegPrice={listing.nonVegPrice}
            iconSize={14}
            gap="gap-4"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-2">Contact</h3>
        <p>Phone: {listing.phone}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setPopupOpen(true);
          }}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded cursor-pointer transition hover:bg-red-700 hover:shadow-md active:scale-[0.98]"
        >
          Enquiry Now
        </button>
      </div>
    </div>
  );
}