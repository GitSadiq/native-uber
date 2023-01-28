import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    pickUp: null,
    Destination: null,
  },
  reducers: {
    PickupLocation: (state, action) => {
      state.pickUp = action.payload;
    },
    DestinationLocation: (state, action) => {
      state.Destination = action.payload;
    },
  },
});

export const { PickupLocation, DestinationLocation } = locationSlice.actions;
export default locationSlice.reducer;
