import { Link } from "react-router-dom";

const venuesDropdownData = [
  { label: "Banquet Halls", path: "/venues/banquet-halls", categoryId: 6 },
  { label: "Banquet with Hotel Room", path: "/venues/banquet-with-room", categoryId: 9 },
  { label: "Marriage Halls", path: "/venues/marriage-halls", categoryId: 8 },
  { label: "Wedding Farmhouse", path: "/venues/wedding-farmhouse", categoryId: 13 },
  { label: "Party Halls", path: "/venues/party-halls", categoryId: 7 },
  { label: "5 Star Wedding Hotels", path: "/venues/5-star-wedding-hotels", categoryId: 11 },
  { label: "Destination Weddings", path: "/venues/destination-weddings", categoryId: 12 },
  { label: "Small Function Halls", path: "/venues/small-function-halls", categoryId: 14 },
  { label: "Engagement Venue", path: "/venues/engagement-venue", categoryId: 16 },
  { label: "Baby Shower", path: "/venues/baby-shower", categoryId: 18 },
  { label: "Sikh Wedding", path: "/venues/sikh-wedding", categoryId: 20 },
  { label: "Cocktail Venues", path: "/venues/cocktail-venues", categoryId: 5 },
  { label: "Party Lawn", path: "/venues/party-lawn", categoryId: 10 },
  { label: "Corporate Events", path: "/venues/corporate-events", categoryId: 15 },
  { label: "Ring Ceremony", path: "/venues/ring-ceremony", categoryId: 17 },
  { label: "Mehendi Ceremony", path: "/venues/mehendi-ceremony", categoryId: 21 },
  { label: "Retirement Party", path: "/venues/retirement-party", categoryId: 19 }
];


const VenuesDropdown = ({ isOpen = true, onSelect, renderAs = "link", filter }) => {

  const filteredData =
    filter === "venues"
      ? venuesDropdownData.filter(item => item.path.startsWith("/venues"))
      : venuesDropdownData;

  return (
    <div
      className={`
        flex flex-col md:flex-row md:flex-wrap
        transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 max-h-[2000px] visible" : "opacity-0 max-h-0 invisible"}
        overflow-y-auto
      `}
      style={{
        minWidth: "435px",
        maxHeight: "650px",
      }}
    >
      {filteredData.map((item) => {
        if (renderAs === "button") {
          // Render as button — no navigation, just pass item to onSelect
          return (
            <button
              key={item.categoryId}
              type="button"
              onClick={() => onSelect && onSelect(item)}
              className="text-[#09122C] text-sm py-2 px-2 hover:bg-[#f3f3f3] hover:text-[#dc2626] transition-all duration-300 rounded w-full md:w-1/2 text-left"
            >
              {item.label}
            </button>
          );
        }

        // Default: render as Link and also call onSelect(item) before navigating
        return (
          <Link
            key={item.categoryId}
            to={`${item.path}?category=${item.categoryId}&serviceLabel=${encodeURIComponent(item.label)}`}
            onClick={() => onSelect && onSelect(item)}
            className="text-[#09122C] text-sm py-2 px-2 hover:bg-[#f3f3f3] hover:text-[#dc2626] transition-all duration-300 rounded w-full md:w-1/2"
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default VenuesDropdown;
