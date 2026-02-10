const VegIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 18 18">
    <rect
      x="1"
      y="1"
      width="16"
      height="16"
      rx="2"
      ry="2"
      fill="none"
      stroke="#166534"
      strokeWidth="2"
    />
    <circle cx="9" cy="9" r="4" fill="#166534" />
  </svg>
);

const NonVegIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 18 18">
    <rect
      x="1"
      y="1"
      width="16"
      height="16"
      rx="2"
      ry="2"
      fill="none"
      stroke="#7f1d1d"

      
      strokeWidth="2"
    />
    <polygon points="9,4 14,13 4,13" fill="#7f1d1d" />
  </svg>
);

const FoodPrice = ({ vegPrice, nonVegPrice }) => {
  if (!vegPrice && !nonVegPrice) return null;

  const isPureVeg = vegPrice && !nonVegPrice;

  return (
    <div className="md:mt-0 lg:mt-2 mt-2 flex items-center gap-3 text-sm text-gray-800 flex-wrap">
      {/* Veg / Pure Veg */}
      {vegPrice && (
        <div className="flex items-center justify-center gap-1 md:ml-2 lg:ml-0 sm:ml-2 ml-0  whitespace-nowrap">
          <VegIcon />
          <span className={isPureVeg ? `font-medium text-[#2a8f51]` : `font-medium`}>
            {isPureVeg ? "Veg" : "Veg"}
          </span>
          <span className="font-medium">
            <span className="line-through">₹{vegPrice}</span>
            <span className="text-sm text-gray-600">/Plate</span>
          </span>
        </div>
      )}

      {/* Non-Veg */}
{nonVegPrice ? (
  <div className="flex items-center gap-1 whitespace-nowrap">
    <NonVegIcon />
    <span className="font-medium text-red-700">Non-Veg</span>
    <span className="font-medium">
      <span className="line-through">₹{nonVegPrice}</span>
      <span className="ml-0.5 text-sm text-gray-600">/Plate</span>
    </span>
  </div>
) : (
<div className="flex items-center gap-1 text-sm font-medium text-green-700">
  @Pure Veg Only
</div>

)}

    </div>
  );
};

export default FoodPrice;