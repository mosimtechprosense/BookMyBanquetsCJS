export default function FeaturesSection({ features }) {
  if (!features) return null;

  return (
    <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-red-600">
        Features
      </h2>

      <div
        className="
          prose prose-sm sm:prose-base
          max-w-none
          text-gray-700
          prose-ul:pl-5
          prose-li:marker:text-red-600
        "
        dangerouslySetInnerHTML={{ __html: features }}
      />
    </section>
  );
}
