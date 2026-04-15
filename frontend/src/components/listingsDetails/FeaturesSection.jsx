import DOMPurify from "dompurify"
import "../../style/ContentHTML.css"

export default function FeaturesSection({ features }) {
  if (!features) return null;

  const cleanHTML = DOMPurify.sanitize(features, {
    FORBID_ATTR: ["style"],
  });

  return (
    <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-red-600">
        Features
      </h2>

      <div
        className="content-html max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />
    </section>
  );
}