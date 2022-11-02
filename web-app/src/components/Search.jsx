import React from "react";

export function Search({ searchValue, setSearchValue }) {
  const tgApp = window.Telegram.WebApp;

  return (
    <>
      {tgApp.platform !== "unknown" ? (
        ""
      ) : (
        <div className="relative">
          <input
            className="h-8 pl-10 rounded-2xl w-48 outline-0"
            type="text"
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
            onClick={() => setSearchValue("")}
          />
        </div>
      )}
    </>
  );
}
