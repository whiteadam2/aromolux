import React from "react";
import { Search } from "./Search";
import { TelegramWrapper } from "./TelegramWrapper";

export function Header({ searchValue, setSearchValue }) {
  return (
    <TelegramWrapper>
      <div className="flex justify-between items-center mb-10">
        <img src="/images/logo_parfum.png" alt="Logo" className="h-20" />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
    </TelegramWrapper>
  );
}
