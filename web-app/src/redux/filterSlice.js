import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paginatedData: [],
  currentPage: 1,
  pageSize: 8,
  pageCount: 0,
  sortValue: 0,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPaginatedData: (state, action) => {
      state.paginatedData = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setPaginatedData,
  setCurrentPage,
  setPageSize,
  setPageCount,
  setSortValue,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
