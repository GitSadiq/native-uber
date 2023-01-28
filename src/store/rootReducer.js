import { combineReducers } from "@reduxjs/toolkit";
import locationSlice from "./slice/locationSlice";

const rootReducer = combineReducers({
  locationSlice,
});

export default rootReducer;
