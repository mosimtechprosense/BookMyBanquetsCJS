// /src/components/listings/Badge.jsx
export default function Badge({ children }) {
  return (
    <span className="inline-block bg-gray-100 text-sm px-2 py-1 rounded shadow-sm">
      {children}
    </span>
  );
}
