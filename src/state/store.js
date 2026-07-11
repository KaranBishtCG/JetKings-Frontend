import { configureStore } from "@reduxjs/toolkit";
import buyersReducer from "./slices/BuyerSlice";

export const store = configureStore({
  reducer: {
    buyers: buyersReducer,
  },
});