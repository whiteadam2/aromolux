import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IViewState } from '../@types'

const initialState: IViewState = {
  paginatedData: [],
  currentPage: 1,
  pageSize: 8,
  totalCount: 0,
  sortProp: null,
  searchValue: ''
}

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setPaginatedData: (state, action: PayloadAction<IProduct[]>) => {
      state.paginatedData = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
    setSortProp: (state, action: PayloadAction<keyof IProduct | null>) => {
      state.sortProp = action.payload
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    }
  }
})

export const {
  setPaginatedData,
  setCurrentPage,
  setPageSize,
  setTotalCount,
  setSortProp,
  setSearchValue
} = viewSlice.actions

export default viewSlice.reducer
