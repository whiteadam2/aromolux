import { RootState } from './store'
import { Middleware } from '@reduxjs/toolkit'
import { cartActionTypes } from './cartSlice'

export const saveCartToLocalStorage: Middleware<{}, RootState> =
  (storeApi) => (next) => (action) => {
    next(action)
    if (cartActionTypes.includes(action.type)) {
      const state = storeApi.getState()
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  }