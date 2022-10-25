import React from "react";

export function WebMainButton({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-40 p-2 fixed top-20 right-20 z-10 opacity-70 animate-bounce bg-red-500 text-white text-md  text-center rounded-xl cursor-pointer"
    >
      {label}
    </div>
  );
}
