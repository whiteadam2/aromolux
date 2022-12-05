import React, { useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { setSortValue } from '../redux/viewSlice'
import { useOutsideClick } from '../hooks'

export const Sort: React.FC = () => {
  const dispatch = useAppDispatch()

  const [isVisible, setIsVisible] = useState(false)
  const sortValue = useAppSelector((state) => state.view.sortValue)
  const items = ['популярности', 'цене', 'алфавиту']

  const sortRef = useRef<HTMLDivElement>(null)
  useOutsideClick(sortRef, () => setIsVisible(false))

  function handleSortClick (index: number): void {
    dispatch(setSortValue(index))
    setIsVisible(false)
  }

  return (
    <div ref={sortRef} className="w-72 relative text-center">
      <span className="font-medium">Сортировать по: </span>
      <span
        onClick={() => setIsVisible(!isVisible)}
        className="text-red-500 underline underline-offset-4 decoration-dashed cursor-pointer"
      >
        {items[sortValue]}
      </span>
      {isVisible && (
        <ul className="bg-white rounded-md w-36 flex flex-col shadow-md absolute top-7 right-4 z-10  overflow-hidden">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSortClick(index)}
              className="p-2 hover:bg-gray-50 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
