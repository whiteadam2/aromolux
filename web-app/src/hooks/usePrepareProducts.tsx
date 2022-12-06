import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import {
  setPaginatedData,
  setCurrentPage,
  setTotalCount
} from '../redux/viewSlice'
import { IProduct } from '../@types'

export function usePrepareProducts(data: IProduct[] | null): void {
  const dispatch = useAppDispatch()
  const { currentPage, pageSize, sortProp, searchValue } = useAppSelector(
    (state) => state.view
  )

  function paginate(data: IProduct[]): IProduct[] {
    const firstProduct = (currentPage - 1) * pageSize
    const lastProduct = firstProduct + pageSize
    return data.slice(firstProduct, lastProduct)
  }

  function sort(data: IProduct[]): IProduct[] {
    if (sortProp === null) return data
    return [...data].sort((prev, next) =>
      prev[sortProp] > next[sortProp] ? 1 : -1
    )
  }

  function search(data: IProduct[]): IProduct[] {
    return data.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }

  useEffect(() => {
    if (data != null) {
      const sortedData = sort(data)
      const searchedData = search(sortedData)
      dispatch(setTotalCount(searchedData.length))
      dispatch(setPaginatedData(paginate(searchedData)))
    }
    // eslint-disable-next-line
  }, [data, sortProp, searchValue, currentPage])

  useEffect(() => {
    dispatch(setCurrentPage(1))
    // eslint-disable-next-line
  }, [data, sortProp, searchValue])
}
