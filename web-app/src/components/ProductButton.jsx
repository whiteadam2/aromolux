import React from "react";

export function ProductButton({ children, onClick, classes }) {
  return (
    <div
      className={
        "px-4 py-1.5 flex justify-center items-center shadow-md cursor-pointer select-none " +
        "text-white text-xl font-normal rounded-xl " +
        "transition ease-in-out delay-450 duration-400 " +
        classes
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
}
