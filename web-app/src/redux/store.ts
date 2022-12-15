import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import viewReducer from './viewSlice'
import productsReducer from './productsSlice'
import sendOrderReducer from './sendOrderSlice'
import { saveCartToLocalStorage } from './middleware'

const rootReducer = combineReducers({
  cart: cartReducer,
  view: viewReducer,
  products: productsReducer,
  botOrder: sendOrderReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartToLocalStorage)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
