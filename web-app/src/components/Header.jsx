import React from "react";
import { Search } from "./Search";
import { TelegramWrapper } from "./TelegramWrapper";

export function Header({ searchValue, setSearchValue }) {
  return (
    <TelegramWrapper>
      <div className="flex justify-between items-center mb-12">
        <img src="/images/pg1.png" alt="Logo" className="h-12" />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
    </TelegramWrapper>
  );
}
