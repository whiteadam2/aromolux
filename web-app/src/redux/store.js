import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import viewReducer from "./viewSlice";

export const store = configureStore({
  reducer: { cart: cartReducer, view: viewReducer },
});
