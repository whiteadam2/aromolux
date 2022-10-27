import React from "react";

export function Input({ value, onChange, placeholder, isFocused }) {
  return (
    <>
      <input
        autoFocus={isFocused}
        className="h-8 pl-2"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {!value && (
        <span className="text-red-500 font-light text-sm -mt-3">
          обязательно к заполнению!
        </span>
      )}
    </>
  );
}
