import React, { useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { setSortProp } from '../redux/viewSlice'
import { useOutsideClick } from '../hooks'
import { IProduct } from '../@types'

export const Sort: React.FC = () => {
  const dispatch = useAppDispatch()

  const [isVisible, setIsVisible] = useState(false)
  const sortProp = useAppSelector((state) => state.view.sortProp)
  const sortTitles = [
    { prop: null, title: 'популярности' },
    { prop: 'price', title: 'цене' },
    { prop: 'name', title: 'алфавиту' }
  ]
  const selectedSortTitle = sortTitles.find(
    (obj) => obj.prop === sortProp
  )?.title

  const sortRef = useRef<HTMLDivElement>(null)
  useOutsideClick(sortRef, () => setIsVisible(false))

  function handleSortClick(prop: keyof IProduct | null): void {
    dispatch(setSortProp(prop))
    setIsVisible(false)
  }

  return (
    <div ref={sortRef} className="w-72 relative text-center">
      <span className="font-medium">Сортировать по: </span>
      <span
        onClick={() => setIsVisible(!isVisible)}
        className="text-red-500 underline underline-offset-4 decoration-dashed cursor-pointer"
      >
        {selectedSortTitle}
      </span>
      {isVisible && (
        <ul className="bg-white rounded-md w-36 flex flex-col shadow-md absolute top-7 right-4 z-10  overflow-hidden">
          {sortTitles.map((obj, index) => (
            <li
              key={index}
              onClick={() => handleSortClick(obj.prop as keyof IProduct | null)}
              className="p-2 hover:bg-gray-50 cursor-pointer"
            >
              {obj.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
