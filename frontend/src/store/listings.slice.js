import { createSlice } from "@reduxjs/toolkit";

const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    data: [],
    total: 0,
    filters: {},
  },
  reducers: {
    setListings(state, action) {
      state.data = action.payload.listings;
      state.total = action.payload.totalCount;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { setListings, setFilters } = listingsSlice.actions;
export default listingsSlice.reducer;
