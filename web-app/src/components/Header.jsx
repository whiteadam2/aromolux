import React from "react";
import { Sort } from "./Sort";

export function Header({
  sortItem,
  onSort,
  sortRef,
  isSortVisible,
  setIsSortVisible,
}) {
  return (
    <div className="flex flex-col gap-y-4 mb-12 sm:flex-row sm:justify-between items-center ">
      <img src="/images/logo_duh.png" alt="Logo" className="h-20" />
      <Sort
        sortItem={sortItem}
        onSort={onSort}
        sortRef={sortRef}
        isSortVisible={isSortVisible}
        setIsSortVisible={setIsSortVisible}
      />
    </div>
  );
}
