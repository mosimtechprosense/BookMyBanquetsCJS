import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBusinessProfile } from "../api/businessApi.js"

export default function BusinessDashboard() {

  const navigate = useNavigate()
  const [business, setBusiness] = useState(null)
  const [showNotification, setShowNotification] = useState(true)

 
  useEffect(() => {
    
  const fetchProfile = async () => {
    try {

      const token = localStorage.getItem("businessToken")

      if (!token) {
        navigate("/business/login")
        return
      }

      const res = await getBusinessProfile()

      setBusiness(res.data.business)

    } catch (error) {

      console.error(error)

      localStorage.removeItem("businessToken")
      navigate("/business/login")

    }
  }

  fetchProfile()

}, [navigate])


  if (!business) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading dashboard...</p>
    </div>
  )
}

  return (

    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, {business.businessName}!
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your business and listings
            </p>
          </div>

        </div>

        {/* Top Notification */}
{showNotification && (
  <div className="flex items-center justify-between bg-[#cff4fc] border border-blue-200 text-[#20899e] font-semibold px-5 py-3 rounded-lg mb-6">

    <p className="text-sm">
      Your business verification is pending. You can add listings once verified.
    </p>

    <button
      onClick={() => setShowNotification(false)}
      className="text-blue-500 hover:text-blue-700 text-lg leading-none cursor-pointer"
    >
      ×
    </button>

  </div>
)}

        {/* Verification Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">

          <h3 className="text-md font-semibold text-gray-700 mb-4">
            Verification Status
          </h3>

          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">

            <p className="text-sm font-semibold text-gray-900">
              Verification Pending!
            </p>

            <p className="text-sm font-se text-yellow-700 mt-1">
              Your business is under review. Our team will verify your details within 24–48 hours.
            </p>

          </div>

        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6">
{/* Business Information */}
<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

  <h3 className="text-sm font-semibold text-gray-700 mb-4">
    Business Information
  </h3>

  <div className="space-y-3 text-sm">

    <div className="flex justify-between">
      <span className="text-gray-400">Business Name:</span>
      <span className="text-black">{business.businessName}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-sm text-gray-400">Owner Name:</span>
      <span className="text-black">{business.ownerName}</span>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-gray-400">Business Type:</span>
      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md">
        {business.businessType}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">Email:</span>
      <span className="text-black">{business.email}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">Phone:</span>
      <span className="text-black">{business.phone}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">Alternate Phone:</span>
      <span className="text-black">{business.alternatePhone}</span>
    </div>

  </div>

</div>


{/* Address & Documents */}
<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

  <h3 className="text-sm font-semibold text-gray-700 mb-4">
    Address & Documents
  </h3>

  <div className="space-y-3 text-sm">

    <div className="flex justify-between">
      <span className="text-gray-400">Address:</span>
      <span className="text-black">{business.address}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">City:</span>
      <span className="text-black">{business.city}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">State:</span>
      <span className="text-black">{business.state}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">Pincode:</span>
      <span className="text-black">{business.pincode}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">GST Number:</span>
      <span className="text-black">{business.gstNumber}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">PAN Number:</span>
      <span className="text-black">{business.panNumber}</span>
    </div>

  </div>

</div>

        </div>

      </div>

    </div>
  )
}