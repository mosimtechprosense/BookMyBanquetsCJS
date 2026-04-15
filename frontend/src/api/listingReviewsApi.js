import axios from "axios"

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://api.bookmybanquets.in"

//  Create instance
const API = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    "Content-Type": "application/json"
  }
})

//  Add this interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


//  Create Review
export const createReview = async (data) => {
  try {
    const res = await API.post("/reviews", data)
    return res.data
  } catch (error) {
    console.error(
      "❌ Create Review Error:",
      error.response?.data || error.message
    )
    throw error
  }
}

//  Get Reviews by Listing
export const getReviewsByListing = async (listingId) => {
  try {
    const res = await API.get(`/reviews/listing/${listingId}`)
    return res.data
  } catch (error) {
    console.error(
      "❌ Fetch Reviews Error:",
      error.response?.data || error.message
    )
    throw error
  }
}

//  Get ALL Reviews (Admin)
export const fetchAllReviews = async (params) => {
  try {
    const res = await API.get("/reviews", { params });
    return res.data;
  } catch (error) {
    console.error(
      "❌ Fetch All Reviews Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  Update Review Status
export const updateReviewStatus = async (id, status) => {
  try {
    const res = await API.patch(`/reviews/${id}`, { status });
    return res.data;
  } catch (error) {
    console.error(
      "❌ Update Review Status Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};