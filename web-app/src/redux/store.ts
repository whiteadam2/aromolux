import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import viewReducer from './viewSlice'
import productsReducer from './productsSlice'
import sendOrderReducer from './sendOrderSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    view: viewReducer,
    products: productsReducer,
    botOrder: sendOrderReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
