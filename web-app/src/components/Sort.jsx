import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortValue, setIsSortVisible } from "../redux/filterSlice";

export function Sort({ sortRef }) {
  const dispatch = useDispatch();
  const { isSortVisible, sortValue } = useSelector((state) => state.filter);

  const items = ["популярности", "цене", "алфавиту"];

  function handleSortClick(index) {
    dispatch(setSortValue(index));
    dispatch(setIsSortVisible(false));
  }

  return (
    <div ref={sortRef} className="w-72 relative text-center">
      <span className="font-medium">Сортировать по: </span>
      <span
        onClick={() => dispatch(setIsSortVisible(!isSortVisible))}
        className="text-red-500 underline underline-offset-4 decoration-dashed cursor-pointer"
      >
        {items[sortValue]}
      </span>
      {isSortVisible && (
        <ul className="bg-white rounded-md w-36 flex flex-col shadow-md absolute top-7 right-4 z-10  overflow-hidden">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSortClick(index)}
              className="p-2 hover:bg-amber-100 hover:text-amber-800 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
