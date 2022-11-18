import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortValue } from "../redux/viewSlice";
import { useOutsideClick } from "../hooks";

export function Sort() {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const { sortValue } = useSelector((state) => state.view);

  const items = ["популярности", "цене", "алфавиту"];

  const sortRef = useRef();
  useOutsideClick(sortRef, () => setIsVisible(false));

  function handleSortClick(index) {
    dispatch(setSortValue(index));
    setIsVisible(false);
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
  );
}
