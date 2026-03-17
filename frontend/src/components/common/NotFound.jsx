import { Link } from "react-router-dom"

export default function NotFound({
  title = "404 – Page Not Found",
  message = "The page you’re looking for doesn’t exist or the URL might be incorrect.",
  showHomeButton = true
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-16">
      
      <div className="text-7xl font-extrabold text-gray-200">
        404
      </div>

      <h1 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
        {title}
      </h1>

      <p className="mt-3 text-gray-500 max-w-md">
        {message}
      </p>

      <div className="mt-6 flex gap-4">
        {showHomeButton && (
          <Link
            to="/"
            className="px-4 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
          >
            Go to Home
          </Link>
        )}

        <button
          onClick={() => window.history.back()}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}