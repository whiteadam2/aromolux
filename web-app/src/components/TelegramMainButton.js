import React, { useEffect } from "react";

const tgApp = window.Telegram.WebApp;

export function TelegramMainButton({ label }) {
  useEffect(() => {
    tgApp.MainButton.show();
    return () => tgApp.MainButton.hide();
  }, []);

  useEffect(() => {
    tgApp.MainButton.setText(label);
  }, [label]);

  return null;
}
