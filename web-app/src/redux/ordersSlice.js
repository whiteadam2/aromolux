import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => action.payload,
  },
});

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
