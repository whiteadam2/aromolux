import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    handleOrder: (state, action) => {
      const filtered = state.filter((order) => order.id !== action.payload.id);

      if (action.payload.count > 0) {
        filtered.push(action.payload);
      }

      return filtered;
    },
  },
});

export const { handleOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
