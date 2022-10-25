import { useEffect } from "react";

const tgApp = window.Telegram.WebApp;

export function TelegramMainButton({ label, onClick }) {
  useEffect(() => {
    tgApp.MainButton.show();
    return () => tgApp.MainButton.hide();
  }, []);

  useEffect(() => {
    tgApp.MainButton.setText(label);
  }, [label]);

  useEffect(() => {
    window.Telegram.WebApp.MainButton.onClick(onClick);
  }, [onClick]);

  return null;
}
