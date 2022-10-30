import React, { useState } from "react";
import classNames from "classnames";

export function Sort(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const items = ["популярности", "цене", "алфавиту"];

  function handleSortClick(index) {
    setSelected(index);
    setIsVisible(false);
  }

  return (
    <div className="w-72 ml-auto mr-0 mb-8 relative">
      <span className="font-medium">Сортировать по: </span>
      <span
        onClick={() => setIsVisible(!isVisible)}
        className="text-red-500 underline underline-offset-4 decoration-dashed cursor-pointer"
      >
        {items[selected]}
      </span>
      {isVisible && (
        <ul className="bg-white rounded-md w-36 flex flex-col gap-2 p-2 shadow-md absolute top-7 right-4 z-10">
          {items.map((item, index) => (
            <li
              key="item"
              onClick={() => handleSortClick(index)}
              className={classNames("p-1", {
                "bg-blue-400 text-white": index === selected,
              })}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
