import { useEffect, useState } from "react"
import { createReview } from "../../../api/listingReviewsApi"
import { FaStar, FaUserAlt, FaPhoneAlt } from "react-icons/fa"
import { MdOutlineRateReview } from "react-icons/md"

const ratingLabels = {
  1: "😞 Poor",
  2: "😐 Okay",
  3: "🙂 Good",
  4: "😄 Very Good",
  5: "🤩 Excellent"
}

export default function ListingReviewForm({ listingId }) {
  const [showForm, setShowForm] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [touched, setTouched] = useState(false)

  const [form, setForm] = useState({
    name: "",
    phone: "",
    rating: 0,
    message: ""
  })

  const [hoverRating, setHoverRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

if (!form.name || !form.phone || !form.message || !form.rating) {
  setError("Please fill all details and select a rating")
  setTouched(true)
  return
}

    setError("")
    setLoading(true)

    try {
      await createReview({
        ...form,
        listing_id: listingId
      })

      setSuccess(true)
      setForm({
        name: "",
        phone: "",
        rating: 0,
        message: ""
      })
    } catch (err) {
      console.error(err)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }



  // remove success msg after review submission
useEffect(() => {
  if (success) {
    setFadeOut(false)

    const fadeTimer = setTimeout(() => {
      setFadeOut(true) // start fading
    }, 4000) // start fade at 4s

    const removeTimer = setTimeout(() => {
      setSuccess(false) // remove after fade
    }, 5000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }
}, [success])



  // CTA BAR
  if (!showForm) {
    return (
      <div className="bg-gray-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-gray-700 font-medium">
          How was your event at this venue?
        </p>

        <button
          onClick={() => setShowForm(true)}
          className="border border-red-500 text-red-600 px-5 py-2 rounded-xl cursor-pointer hover:bg-red-150 transition"
        >
          Write a review
        </button>
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xl font-semibold text-red-600">
          <MdOutlineRateReview />
          <span>Write a Review</span>
        </div>

        <button
          onClick={() => setShowForm(false)}
          className="text-gray-400 hover:text-red-600 text-sm cursor-pointer"
        >
          ✕
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Share your experience to help others choose better
      </p>

{success && (
  <p
    className={`mb-3 transition-all duration-700 ${
      fadeOut ? "opacity-0 translate-y-2" : "opacity-100"
    } text-green-600`}
  >
    ✅ Thanks! Your review has been submitted successfully!
  </p>
)}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-3">

          {/* Name */}
          <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 flex-1 
  ${touched && !form.name ? "border-red-500" : "border-gray-300"} 
  focus-within:border-red-600`}>
            <FaUserAlt className="text-gray-400" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full text-sm focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 flex-1 
  ${touched && !form.phone ? "border-red-500" : "border-gray-300"} 
  focus-within:border-red-600`}>
            <FaPhoneAlt className="text-gray-400" />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Your Number"
              className="w-full text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* ⭐ Rating */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </p>

          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map((star) => {
              const active = (hoverRating || form.rating) >= star

              return (
                <FaStar
                  key={star}
                  onClick={() => setForm({ ...form, rating: star })}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`text-3xl cursor-pointer transition ${
                    active
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300"
                  }`}
                />
              )
            })}
          </div>

          <p className="mt-1 text-sm text-gray-500 min-h-4.5">
            {(hoverRating || form.rating)
              ? ratingLabels[hoverRating || form.rating]
              : "Tap to rate"}
          </p>
        </div>

        {/* Message */}
        <div className={`border rounded-xl px-4 py-3 
  ${touched && !form.message ? "border-red-500" : "border-gray-300"} 
  focus-within:border-red-600`}>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your experience..."
            className="w-full text-sm focus:outline-none resize-none"
            rows={3}
          />
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-2 gap-2 flex-col md:flex-row">
          <p className="hidden md:block text-sm text-gray-500">
            Your review helps others make better decisions
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`text-white font-semibold px-6 py-2 rounded-xl cursor-pointer shadow w-full md:w-auto
              ${loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"}
            `}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        {error && (
          <p className="text-md text-red-600 font-medium">{error}</p>
        )}
      </form>
    </div>
  )
}