export default function PoliciesSection({ policies }) {
  if (!policies) return null;
  return (
    <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-2xl text-red-600 font-semibold mb-3">Venue Policies</h2>
      <ul
        className="list-disc ml-5 text-gray-700"
        dangerouslySetInnerHTML={{ __html: policies }}
      />
    </section>
  );
}
