import React from "react";
import { NavLink } from "react-router-dom";

export function NavBar() {
  let activeClassName = "text-white bg-blue-500 p-2 underline";
  return (
    <ul className="my-14 flex flex-row justify-around text-xl font-semibold">
      <li>
        <NavLink
          to="/woman"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          Женские духи
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/man"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          Мужские духи
        </NavLink>
      </li>
    </ul>
  );
}
