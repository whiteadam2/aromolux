import React from "react";
import { Link, useLocation } from "react-router-dom";

export function NavBar() {
  const location = useLocation();
  const path = location.pathname + location.search;

  const categories = [
    { title: "Женские", url: "/products/?category=209" },
    { title: "Мужские", url: "/products/?category=212" },
  ];
  const activeItemStyle = "p-2 text-white bg-blue-400 p-2 rounded-3xl";
  const itemStyle = "px-4 py-2 text-gray-400 bg-custom-bg p-2 rounded-3xl";

  return (
    <ul className="my-12 flex flex-row gap-4 text-xl">
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
  );
}
