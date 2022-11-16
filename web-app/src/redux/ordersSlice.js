import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      const filtered = state.filter((order) => order.id !== action.payload.id);

      if (action.payload.count > 0) {
        filtered.push(action.payload);
      }

      return filtered;
    },
  },
});

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
