import { HiUserGroup } from "react-icons/hi"
import FoodPrice from "../../components/listingsDetails/FoodPrice"
import sidebarImg from "../../assets/sidebarimage.avif"


export default function ListingDetailsSidebar({ listing, setPopupOpen  }) {
  return (
    <aside className="mt-4 lg:mt-0 lg:sticky lg:top-0 self-start">
 <div
        className="
          relative
          rounded-2xl
          overflow-hidden
          bg-white
          shadow-2xl
          pb-75 lg:pb-97.5
        "
      >
        {/* ===== FLOATING CONTENT ===== */}
        <div className="relative z-10 p-3 lg:p-4 space-y-4 lg:space-y-6">
          {/* Event Details */}
          <div className="bg-white rounded-xl shadow p-3 lg:p-4">
            <h3 className="text-base lg:text-lg font-semibold mb-0.5 lg:mb-1">
              Event Details
            </h3>

            <div className="flex flex-wrap items-center text-xs lg:text-sm text-gray-700">
              <span className="flex items-center gap-1">
                <HiUserGroup className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-red-600" />
                {listing.min_guest} – {listing.max_guest} guests
              </span>

              <FoodPrice
                vegPrice={listing.vegPrice}
                nonVegPrice={listing.nonVegPrice}
                iconSize={12} 
                gap="gap-3 lg:gap-4"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center justify-between bg-white rounded-xl shadow-xl p-3 lg:p-4">
            <div>
            <h3 className="text-base lg:text-sm font-semibold ">
              {listing.title}
            </h3>

            <p className="text-xs lg:text-sm text-gray-700">
              Phone: <span className="font-medium">+91-8920597474</span>
            </p>
            </div>
<div>
      <button
      id="enquiry-now-btn"
  onClick={(e) => {
    e.stopPropagation()
    setPopupOpen(true)
  }}
  className="
    flex items-center justify-center gap-1
    mt-3 lg:mt-4 w-full
    bg-red-600 text-white
    py-1.5 lg:py-1.5 px-4
    text-sm lg:text-base
    rounded-xl
    font-semibold
    hover:bg-red-700 transition cursor-pointer
    active:scale-[0.98]
  "
>
  Enquiry Now
</button>
            </div>
          </div>
        </div>

        {/* ===== IMAGE AT BOTTOM ===== */}
<div
  onClick={(e) => {
    e.stopPropagation()
    setPopupOpen(true)
  }}
  className="absolute bottom-0 left-0 w-full h-78 sm:h-90 md:h-95 lg:h-100 z-20 cursor-pointer"
>
          <img
            src={sidebarImg}
            alt="bookmybanquets"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </aside>
  )
}
