import React from "react";

export function TelegramWrapper({ children }) {
  const tgApp = window.Telegram.WebApp;
  return <>{tgApp.platform !== "unknown" ? "" : children}</>;
}
