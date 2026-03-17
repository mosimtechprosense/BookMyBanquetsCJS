import { Link } from "react-router-dom"

export default function RegistrationSuccess() {

  return (
    <div className="text-center">

      <h2 className="text-3xl font-bold mb-4">
        Thank You for Registering!
      </h2>

      <p className="text-gray-500 mb-6">
        Your business registration has been submitted successfully.
      </p>

      <div className="bg-[#cff4fc] border border-blue-200 p-6 rounded-lg text-left max-w-xl mx-auto mb-8">

        <p className="font-semibold mb-3">What Happens Next?</p>

        <ul className="text-md font-semibold text-[#20899e] space-y-2">
          <li>Our team will review your business details</li>
          <li>Verification usually takes 24–48 hours</li>
          <li>You will receive an email once verified</li>
          <li>Then you can login and add listings</li>
        </ul>

      </div>

      <div className="flex justify-center gap-4">

        <Link
          to="/"
          className="border border-red-500 text-red-500 px-6 py-2 rounded-lg"
        >
          Go to Homepage
        </Link>

        <Link
          to="/business/login"
          className="bg-red-600 text-white px-6 py-2 rounded-lg"
        >
          Login to Dashboard
        </Link>

      </div>

    </div>
  )
}