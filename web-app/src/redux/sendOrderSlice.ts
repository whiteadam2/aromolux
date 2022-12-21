import axios, { AxiosResponse } from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import config from '../config/config.json'
import { IBotOrder, ISendOrderState } from '../@types'
import { AppDispatch } from './store'

const initialState: ISendOrderState = {
  isPending: false,
  error: null,
  success: null
}

async function sendOrderToBot(data: IBotOrder, queryId?: string): Promise<AxiosResponse> {
  return axios.post(config.tgBotWebServer, JSON.stringify({ data, queryId }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const processOrder =
  (data: IBotOrder, queryId?: string) => async (dispatch: AppDispatch) => {
    dispatch(setPendingStatus(true))
    try {
      const response = await sendOrderToBot(data, queryId)
      dispatch(setPendingStatus(false))
      dispatch(setSuccess(response))
    } catch (e) {
      dispatch(setPendingStatus(false))
      dispatch(setError(e))
    }
  }

export const sendOrderSlice = createSlice({
  name: 'botOrder',
  initialState,
  reducers: {
    setPendingStatus: (state, action) => {
      state.isPending = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    }
  }
})

export const { setPendingStatus, setSuccess, setError } = sendOrderSlice.actions

export default sendOrderSlice.reducer
