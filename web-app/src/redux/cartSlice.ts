import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, IProduct } from "../@types";

const initialState: ICart = { orders: [], total: 0 };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const order = state.orders.find(
        (order) => order.id === action.payload.id
      );

      if (order) {
        order.count++;
      } else {
        state.orders.push({ ...action.payload, count: 1 });
      }

      state.total += action.payload.price;
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload
      );
      if (index >= 0) {
        const order = state.orders[index];

        if (order.count > 0) order.count--;
        if (order.count === 0) state.orders.splice(index, 1);

        state.total -= order.price;
      }
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
