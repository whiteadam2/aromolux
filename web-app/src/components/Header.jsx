import React from "react";
import { Sort } from "./Sort";

export function Header({ sortItem, onSort }) {
  return (
    <div className="flex flex-col gap-y-4 mb-12 sm:flex-row sm:justify-between items-center ">
      <img src="/images/pg1.png" alt="Logo" className="h-12" />
      <Sort sortItem={sortItem} onSort={onSort} />
    </div>
  );
}
