export default function StatCard({ title, value, color }) {
  return (
    <div className={`p-4 rounded text-white ${color}`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
