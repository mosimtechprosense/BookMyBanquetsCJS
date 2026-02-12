import { Link } from "react-router-dom";

const venuesDropdownData = [
  { label: "Banquet Halls", path: "/banquet-halls", categoryId: 6 },
  { label: "Banquet with Hotel Room", path: "/banquet-with-room", categoryId: 9 },
  { label: "Marriage Halls", path: "/marriage-halls", categoryId: 8 },
  { label: "Wedding Farmhouse", path: "/wedding-farmhouse", categoryId: 13 },
  { label: "Party Halls", path: "/party-halls", categoryId: 7 },
  { label: "5 Star Wedding Hotels", path: "/5-star-wedding-hotels", categoryId: 11 },
  { label: "Destination Weddings", path: "/destination-weddings", categoryId: 12 },
  { label: "Small Function Halls", path: "/small-function-halls", categoryId: 14 },
  { label: "Engagement Venue", path: "/engagement-venue", categoryId: 16 },
  { label: "Baby Shower", path: "/baby-shower", categoryId: 18 },
  { label: "Sikh Wedding", path: "/sikh-wedding", categoryId: 20 },
  { label: "Cocktail Venues", path: "/cocktail-venues", categoryId: 5 },
  { label: "Party Lawn", path: "/party-lawn", categoryId: 10 },
  { label: "Corporate Events", path: "/corporate-events", categoryId: 15 },
  { label: "Ring Ceremony", path: "/ring-ceremony", categoryId: 17 },
  { label: "Mehendi Ceremony", path: "/mehendi-ceremony", categoryId: 21 },
  { label: "Retirement Party", path: "/retirement-party", categoryId: 19 }
];


const VenuesDropdown = ({ isOpen = true, onSelect, renderAs = "link", filter }) => {

  const filteredData =
    filter === "venues"
      ? venuesDropdownData.filter(item => item.path.startsWith(""))
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
            to={`${item.path}?category=${item.categoryId}`}
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
