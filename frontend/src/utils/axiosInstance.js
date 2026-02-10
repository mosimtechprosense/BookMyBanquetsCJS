import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "node.bookmybanquets.in",
  timeout: 8000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach token for future Admin Login
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    // Handle unauthorized globally
    if (error?.response?.status === 401) {
      localStorage.removeItem("admin_token");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
