import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();
  const tgApp = window.Telegram.WebApp;

  useEffect(() => {
    tgApp.BackButton.show();
    tgApp.BackButton.onClick(() => navigate(-1));
    return () => tgApp.BackButton.hide();
  }, []);

  return null;
}
