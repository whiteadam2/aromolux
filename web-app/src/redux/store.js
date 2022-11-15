import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./ordersSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: { orders: ordersReducer, filter: filterReducer },
});
