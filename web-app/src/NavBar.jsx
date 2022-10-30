import React from "react";
import { NavLink } from "react-router-dom";

export function NavBar() {
  const categories = [
    { title: "Женские", url: "/woman" },
    { title: "Мужские", url: "/man" },
  ];
  const activeItemStyle = "p-2 text-white bg-blue-400 p-2 rounded-3xl";
  const itemStyle = "px-4 py-2 text-black bg-yellow-dark p-2 rounded-3xl";
  return (
    <ul className="my-12 flex flex-row gap-4 text-xl ">
      {categories.map((category) => (
        <li>
          <NavLink
            to={category.url}
            className={({ isActive }) =>
              isActive ? activeItemStyle : itemStyle
            }
          >
            {category.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
