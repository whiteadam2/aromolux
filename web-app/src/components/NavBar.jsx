import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sort } from "./Sort";

export function NavBar({ sortItem, onSort }) {
  const location = useLocation();
  const path = location.pathname + location.search;

  const categories = [
    { title: "Женские", url: "/products/?category=209" },
    { title: "Мужские", url: "/products/?category=212" },
  ];
  const activeItemStyle = "px-4 py-2 text-white bg-amber-800 rounded-3xl";
  const itemStyle = "px-4 py-2 text-gray-100 bg-amber-400 rounded-3xl";

  return (
    <div className="flex justify-between flex-col gap-y-4 sm:flex-row  items-center mb-10 mx-4">
      <ul className="flex gap-4 text-xl ">
        {categories.map((category) => (
          <li key={category.url}>
            <Link
              to={category.url}
              className={path === category.url ? activeItemStyle : itemStyle}
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
      <Sort sortItem={sortItem} onSort={onSort} />
    </div>
  );
}
