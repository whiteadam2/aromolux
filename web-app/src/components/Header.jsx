import React from "react";
import { Search } from "./Search";
import { TelegramWrapper } from "./TelegramWrapper";

export function Header({ searchValue, setSearchValue }) {
  return (
    <TelegramWrapper>
      <div className="flex flex-col gap-y-4 mb-12 sm:flex-row sm:justify-between items-center ">
        <img src="/images/pg1.png" alt="Logo" className="h-12" />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
    </TelegramWrapper>
  );
}
