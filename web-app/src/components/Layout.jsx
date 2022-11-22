import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { TelegramWrapper } from "./TelegramWrapper";
import { Header } from "./Header";
import { NavBar } from "./NavBar";

export function Layout() {
  useEffect(() => {
    window.Telegram.WebApp.ready();
  }, []);
  return (
    <div className="pt-10">
      <div className="container max-w-screen-md m-auto font-sans">
        <TelegramWrapper>
          <Header />
        </TelegramWrapper>
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}
