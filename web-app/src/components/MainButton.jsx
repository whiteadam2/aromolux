import React from "react";
import { TelegramMainButton } from "./TelegramMainButton";
import { WebMainButton } from "./WebMainButton";

const tgApp = window.Telegram.WebApp;

export function MainButton(props) {
  return (
    <>
      {tgApp.platform !== "unknown" ? (
        <TelegramMainButton {...props} />
      ) : (
        <WebMainButton {...props} />
      )}
    </>
  );
}
