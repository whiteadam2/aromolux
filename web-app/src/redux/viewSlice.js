import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setPaginatedData: (state, action) => {
      state.paginatedData = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
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
  setTotalCount,
  setSortValue,
  setSearchValue,
} = viewSlice.actions;

export default viewSlice.reducer;
