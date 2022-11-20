import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import viewReducer from "./viewSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: { cart: cartReducer, view: viewReducer, products: productsReducer },
});
