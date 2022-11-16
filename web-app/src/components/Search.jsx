import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../redux/filterSlice";

export function Search() {
  const [immediateSearchValue, setImmediateSearchValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const handler = () => dispatch(setSearchValue(immediateSearchValue));
    const timeout = setTimeout(handler, 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [immediateSearchValue]);

  function clearSearchValue() {
    setImmediateSearchValue("");
  }

  return (
    <div className="relative">
      <input
        className="h-8 pl-10 rounded-2xl w-48 outline-0"
        type="text"
        name="search"
        value={immediateSearchValue}
        onChange={(e) => setImmediateSearchValue(e.target.value)}
      />
      <img
        src="/images/search.svg"
        alt="Search"
        className="w-5 h-5 absolute top-2 left-2"
      />
      <img
        src="/images/search_clear.svg"
        alt="Clean up search!"
        className="w-4 h-4 absolute top-2 right-2 cursor-pointer opacity-30 hover:opacity-100"
        onClick={() => setImmediateSearchValue("")}
      />
    </div>
  );
}
