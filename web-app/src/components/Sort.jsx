import React, { useState } from "react";

export function Sort({ sortItem, onChangeSort }) {
  const [isVisible, setIsVisible] = useState(false);
  const items = ["популярности", "цене", "алфавиту"];

  const tgApp = window.Telegram.WebApp;

  function handleSortClick(index) {
    onChangeSort(index);
    setIsVisible(false);
  }

  return (
    <>
      {tgApp.platform !== "unknown" ? (
        ""
      ) : (
        <div className="w-72 mb-8 relative">
          <span className="font-medium">Сортировать по: </span>
          <span
            onClick={() => setIsVisible(!isVisible)}
            className="text-red-500 underline underline-offset-4 decoration-dashed cursor-pointer"
          >
            {items[sortItem]}
          </span>
          {isVisible && (
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
      )}
    </>
  );
}
