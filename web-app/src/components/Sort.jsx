import React, { useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

export function Sort({ sortItem, onSort }) {
  const [isSortVisible, setIsSortVisible] = useState(false);
  const items = ["популярности", "цене", "алфавиту"];

  const sortRef = useRef();
  useOutsideClick(sortRef, () => {
    setIsSortVisible(false);
  });

  function handleSortClick(index) {
    onSort(index);
    setIsSortVisible(false);
  }

  return (
    <div ref={sortRef} className="w-72 relative text-center">
      <span className="font-medium">Сортировать по: </span>
      <span
        onClick={() => setIsSortVisible(!isSortVisible)}
        className="text-red-500 underline underline-offset-4 decoration-dashed cursor-pointer"
      >
        {items[sortItem]}
      </span>
      {isSortVisible && (
        <ul className="bg-white rounded-md w-36 flex flex-col shadow-md absolute top-7 right-4 z-10  overflow-hidden">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSortClick(index)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
