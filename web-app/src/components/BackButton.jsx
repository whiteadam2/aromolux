import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function BackButton(props) {
  const navigate = useNavigate();
  const tgApp = window.Telegram.WebApp;

  useEffect(() => {
    const onClick = () => navigate(-1);
    tgApp.BackButton.show();
    tgApp.BackButton.onClick(onClick);
    return () => {
      tgApp.BackButton.hide();
      tgApp.BackButton.offClick(onClick);
    };
    // eslint-disable-next-line
  }, []);
  return null;
}
