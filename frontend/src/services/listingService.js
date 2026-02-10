import api from "../utils/axiosInstance";

//* Get all listings
export const getAllListings = () => 
  api.get("/listings");


//* Get listing by ID
export const getListingById = (id) =>
  api.get(`/listings/${id}`);


//* Get listings with filters
export const getFilteredListings = (params = {}) =>
  api.get("/listings", { params });


//* Get listings by location
export const getListingsByLocation = (location, params = {}) =>
  api.get(`/listings/location/${location}`, { params });


//* Create a new listing
export const createListing = (data) =>
  api.post("/listings", data);


//? Update existing listing
export const updateListing = (id, data) =>
  api.put(`/listings/${id}`, data);


//! Delete listing
export const deleteListing = (id) =>
  api.delete(`/listings/${id}`);