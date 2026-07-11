import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import buyersReducer from "./slices/BuyerSlice";
import generateBillReducer from "./slices/GenerateBillSlice";
import productsReducer from "./slices/productSlice";
import buyerProductPriceReducer from "./slices/buyerProductPriceSlice";

export const store = configureStore({
  reducer: {
    buyers: buyersReducer,
    dashboard: dashboardReducer,
    generateBill: generateBillReducer,
    products: productsReducer,
    buyerProductPrices: buyerProductPriceReducer,

  },
});