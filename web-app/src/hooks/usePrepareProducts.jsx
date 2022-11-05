import { useEffect, useState } from "react";

export function usePrepareProducts(data) {
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  const [sortValue, setSortValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");

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
      setPageCount(searchedData.length);
      setPaginatedData(paginate(searchedData));
    }
    // eslint-disable-next-line
  }, [data, sortValue, searchValue, currentPage]);

  return {
    sortValue,
    setSortValue,
    searchValue,
    setSearchValue,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    pageCount,
    paginatedData,
  };
}
