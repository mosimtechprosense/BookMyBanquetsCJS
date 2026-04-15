import { useEffect, useState } from "react";
import { getReviewsByListing } from "../../../api/listingReviewsApi";
import { MdVerified } from "react-icons/md";


// time ago 
const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const weeks = Math.floor(diffInSeconds / 604800);
  const months = Math.floor(diffInSeconds / 2592000);
  const years = Math.floor(diffInSeconds / 31536000);

  if (diffInSeconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${years} year${years > 1 ? "s" : ""} ago`;
};



// Truncate text at word boundary
const truncate = (text, length = 100) => {
  if (text.length <= length) return text;
  const truncated = text.slice(0, length);
  return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
};

// Render stars (full, half, empty)
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <>
      {"★".repeat(fullStars)}
      {halfStar ? "★" : ""}
      {"☆".repeat(emptyStars)}
    </>
  );
};

export default function ListingReviewsSection({ listingId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState({}); 
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [listingId]);

  const fetchReviews = async () => {
    try {
      const res = await getReviewsByListing(listingId);
      const allReviews = res.data || res || [];
      const activeReviews = allReviews.filter((rev) => rev.status === true);
      setReviews(activeReviews);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (index) => {
    setExpandedReviews((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (loading) return <p>Loading reviews...</p>;

  if (reviews.length === 0)
    return (
      <div>
        <h2 className="text-2xl font-semibold text-red-600">
          Customer Reviews
        </h2>
        <p className="text-gray-500">No reviews yet. Be the first to share your genuine  experience!</p>
      </div>
    );

  // Overall rating
  const overallRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    // total review 
    const visibleReviews = showAll ? reviews : reviews.slice(0, 4);


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-red-600">Customer Reviews</h2>

      {/* Overall rating & reviews */}
    <div className="flex justify-between items-start">

  {/* LEFT SIDE */}
{/* LEFT SIDE */}

<div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
  <div className="text-xl text-yellow-500"> {renderStars(overallRating)}</div>
  <div className="flex items-center gap-2 text-sm md:text-base">
    <span className="text-gray-600 font-semibold">
      {overallRating.toFixed(1)} / 5
    </span>
    <span className="text-gray-500 font-semibold">
      ({reviews.length} {reviews.length <= 1 ? "Review" : "Reviews"})
    </span>
  </div>
</div>

  {/* RIGHT SIDE BUTTON */}
  {reviews.length > 4 && (
    <button
      onClick={() => setShowAll(!showAll)}
      className="text-red-600 font-semibold text-sm md:text-md cursor-pointer hover:underline transition whitespace-nowrap"
    >
      {showAll ? (
        "Read Less"
      ) : (
        <>
          <span className="md:hidden">Read All</span>
          <span className="hidden md:inline">Read All Verified Reviews</span>
        </>
      )}
    </button>
  )}

</div>

      

      {/* Reviews layout */}
      <div className="columns-1 md:columns-2 gap-4 space-y-4">
  {visibleReviews.map((rev, i) => (
    <div
      key={i}
      className="bg-white px-4 py-3 rounded-xl shadow break-inside-avoid transition-all duration-300 h-full min-h-27"
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-1">
        <h3 className="font-semibold">{rev.name}</h3>
        <span className="text-md text-blue-500"><MdVerified /></span>
        </div>
        <div className="text-xl text-yellow-500">{renderStars(rev.rating)}</div>
      </div>
      <p
        className="text-gray-600 transition-all duration-300"
        style={{
          maxHeight:
            expandedReviews[i] || rev.message.length <= 50
              ? "1000px"
              : "4rem",
          overflow: "hidden",
        }}
      >
        {expandedReviews[i] || rev.message.length <= 50
          ? rev.message
          : truncate(rev.message, 50)}
      </p>

    {(rev.message.length <= 50 || expandedReviews[i]) && (
  <div className="mt-3 text-xs text-gray-400">
    {timeAgo(rev.created_at)}
  </div>
)}

      {rev.message.length > 50 && (
        <button
          onClick={() => toggleExpand(i)}
          className="mt-2 text-sm text-blue-500 font-semibold cursor-pointer"
        >
          {expandedReviews[i] ? "Read Less" : "Read More"}
        </button>
      )}

    </div>
  ))}
</div>

    </div>
  );
}