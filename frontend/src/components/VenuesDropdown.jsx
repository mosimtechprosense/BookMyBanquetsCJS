import { Link } from "react-router-dom";
import { MdVerified, MdVerifiedUser } from "react-icons/md";

const venuesDropdownData = [
  { label: "BMB Assured", path: "/bmb-assured", categoryId: 26, icon:<MdVerified />  },
  { label: "BMB Verified", path: "/bmb-verified", categoryId: 27, icon:<MdVerifiedUser /> },
  { label: "Banquet Halls", path: "/banquet-hall", categoryId: 6 },
  { label: "Marriage Halls", path: "/marriage-hall", categoryId: 8 },
  { label: "Wedding Farmhouse", path: "/wedding-farmhouse", categoryId: 13 },
  { label: "Party Halls", path: "/party-hall", categoryId: 7 },
  { label: "5 Star Wedding Hotels", path: "/5-star-wedding-hotel", categoryId: 11 },
  { label: "Destination Weddings", path: "/destination-wedding", categoryId: 12 },
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
        ${isOpen ? "opacity-100 max-h-500 visible" : "opacity-0 max-h-0 invisible"}
        overflow-y-auto
      `}
      style={{
        minWidth: "435px",
        maxHeight: "650px",
      }}
    >
      {filteredData.map((item) => {
        
             const iconColor = item.label === "BMB Assured" ? "text-blue-500" : "text-green-600";
             
        if (renderAs === "button") {
          // Render as button — no navigation, just pass item to onSelect
          return (
            <button
              key={item.categoryId}
              type="button"
              onClick={() => onSelect && onSelect(item)}
              className="text-[#09122C] text-sm py-2 px-2 hover:bg-[#f3f3f3] hover:text-[#dc2626] transition-all duration-300 rounded w-full md:w-1/2 text-left"
            >
              <span className="flex items-center gap-1 leading-none">
  {item.label}
  {item.icon && <span className={`${iconColor} text-md`}>{item.icon}</span>}
</span>
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
            <span className="flex items-center gap-1 leading-none">
  {item.label}
  {item.icon && <span className={`${iconColor} text-md`}>{item.icon}</span>}
</span>
          </Link>
        );
      })}
    </div>
  );
};

export default VenuesDropdown;
