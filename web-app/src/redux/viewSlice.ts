import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../@types";

interface IState {
  paginatedData: IProduct[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  sortValue: number;
  searchValue: string;
}

const initialState: IState = {
  paginatedData: [],
  currentPage: 1,
  pageSize: 8,
  totalCount: 0,
  sortValue: 0,
  searchValue: "",
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setPaginatedData: (state, action: PayloadAction<IProduct[]>) => {
      state.paginatedData = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setSortValue: (state, action: PayloadAction<number>) => {
      state.sortValue = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setPaginatedData,
  setCurrentPage,
  setPageSize,
  setTotalCount,
  setSortValue,
  setSearchValue,
} = viewSlice.actions;

export default viewSlice.reducer;
