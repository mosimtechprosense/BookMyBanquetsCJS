export default function MapSection({ lat, long }) {
  if (!lat || !long) return null;

  return (
    <section className="bg-white p-6 rounded-2xl shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-red-600 border-b-2 border-red-200 pb-2">
        Location
      </h2>
      <div className="w-full h-72 sm:h-96 rounded-lg overflow-hidden border border-red-200 shadow-sm">
        <iframe
          title="map"
          width="100%"
          height="100%"
          loading="lazy"
          className="w-full h-full object-cover"
          src={`https://www.google.com/maps?q=${lat},${long}&output=embed`}
        />
      </div>
    </section>
  );
}

