import React from "react";
import { Outlet } from "react-router-dom";
import { TelegramWrapper } from "./TelegramWrapper";
import { Header } from "./Header";
import { NavBar } from "./NavBar";

export function ContentLayout() {
  return (
    <>
      <TelegramWrapper>
        <Header />
      </TelegramWrapper>
      <NavBar />
      <Outlet />
    </>
  );
}
