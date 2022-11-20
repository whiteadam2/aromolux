import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import viewReducer from "./viewSlice";
import { productsApi } from "./productsAPI";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    view: viewReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
