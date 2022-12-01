import React from "react";

export interface TelegramWrapperProps {
  children: React.ReactNode;
}

export function TelegramWrapper(props: TelegramWrapperProps) {
  const tgApp = window.Telegram.WebApp;
  return <>{tgApp.platform !== "unknown" ? "" : props.children}</>;
}
