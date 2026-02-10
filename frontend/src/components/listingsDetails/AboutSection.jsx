import { useState } from "react";

export default function AboutSection({ description }) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  if (!description) return null;

  const shortDesc = description.slice(0, 300);

  return (
    <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-red-600">
        About this Banquet
      </h2>
      <div
        className="text-gray-700 text-sm sm:text-base leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: showFullDesc || description.length <= 300
            ? description
            : shortDesc + "..."
        }}
      />
      {description.length > 300 && (
        <button
          className="text-red-600 mt-2 hover:underline text-sm sm:text-base cursor-pointer"
          onClick={() => setShowFullDesc(!showFullDesc)}
        >
          {showFullDesc ? "Read Less" : "Read More"}
        </button>
      )}
    </section>
  );
}
