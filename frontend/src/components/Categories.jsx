import { useNavigate } from "react-router-dom";
import { caterers, decor, makeup, mehendi, photographers, venues } from "../assets/index.js";

const Categories = () => {
  const category = [
    {
      title: "Venues",
      des: "Banquet Halls, Marriage Gardens, Lawns...",
       path: "/venues/banquet-halls",
       categoryId: 6,
      img: venues,
      colour: "bg-[#d7e1ff]",
    },
    {
      title: "Photographers",
      des: "Wedding & Candid Photographers",
      img: photographers,
      colour: "bg-[#f6d5b0]",
    },
    {
      title: "Makeup",
      des: "Bridal Makeup Artists, Family Makeup",
      img: makeup,
      colour: "bg-[#eac1b2]",
    },
    {
      title: "Planning & Decor",
      des: "Wedding Planners, Decorators",
      img: decor,
      colour: "bg-[#f7b58c]",
    },
    {
      title: "Caterers",
      des: "Delicious Menus for Every Occasion",
      img: caterers,
      colour: "bg-[#fae3cc]",
    },
    {
      title: "Mehendi",
      des: "Bridal & Traditional Mehendi Artists",
      img: mehendi,
      colour: "bg-[#edd4c2]",
    },
  ];

    const navigate = useNavigate();
  

const handleCategory = (cat) => {
  // VENUES → show ALL venue listings
  if (cat.title === "Venues") {
    navigate("/venues/banquet-halls")
    return
  }

  // other categories (future use)
  if (cat.path && cat.categoryId) {
    navigate(`${cat.path}?category=${cat.categoryId}`)
  }
}


  return (
    <div className="w-full bg-white py-10 px-4 sm:px-8 md:px-12 lg:px-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#06002e]">
          Wedding Categories
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {category.map((cat, index) => (
          <div
          onClick={() => handleCategory(cat)}
            key={index}
            className={`flex items-center justify-between rounded-lg overflow-hidden ${cat.colour} shadow hover:shadow-lg transition-all duration-300 h-[100px] cursor-pointer`} // 👈 fixed height
          >
            {/* Left Side: Text */}
            <div className="flex flex-col justify-center px-6 py-6 w-[65%] h-full">
              <h3 className="text-xl font-semibold text-[#06002e]">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-700 mt-1">{cat.des}</p>
            </div>

            {/* Right Side: Half-Rounded Image */}
            <div className="w-[35%] h-full relative overflow-hidden">
              <div className="w-full h-full overflow-hidden rounded-l-full">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;