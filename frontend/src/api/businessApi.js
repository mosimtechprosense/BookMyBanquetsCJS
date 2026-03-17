import axios from "axios"

// store env variable once
const BASE_URL = import.meta.env.VITE_API_BASE

const API = axios.create({
  baseURL: `${BASE_URL}/api/business`
})

export const registerBusiness = (data) => {
  return API.post("/register", data)
}

export const loginBusiness = (data) => {
  return API.post("/login", data)
}

export const getBusinessProfile = () => {

  const token = localStorage.getItem("businessToken")

  return API.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}