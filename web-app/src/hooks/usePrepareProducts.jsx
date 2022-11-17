import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setPaginatedData,
  setCurrentPage,
  setPageCount,
} from "../redux/productsSlice";

export function usePrepareProducts(data) {
  const dispatch = useDispatch();
  const { currentPage, pageSize, sortValue, searchValue } = useSelector(
    (state) => state.products
  );

  function paginate(data) {
    const firstProduct = (currentPage - 1) * pageSize;
    const lastProduct = firstProduct + pageSize;
    return data.slice(firstProduct, lastProduct);
  }

  function sort(data) {
    if (sortValue === 0) return [...data];
    if (sortValue === 1)
      return [...data].sort((prev, next) => prev.price - next.price);
    if (sortValue === 2)
      return [...data].sort((prev, next) => prev.name.localeCompare(next.name));
  }

  function search(data) {
    return data.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  useEffect(() => {
    if (data) {
      const sortedData = sort(data);
      const searchedData = search(sortedData);
      dispatch(setPageCount(searchedData.length));
      dispatch(setPaginatedData(paginate(searchedData)));
    }
    // eslint-disable-next-line
  }, [data, sortValue, searchValue, currentPage]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
    // eslint-disable-next-line
  }, [data, sortValue, searchValue]);
}
