import React, { useEffect } from "react";

const tgApp = window.Telegram.WebApp;

function WebMainButton({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="fixed w-1/2 py-2 bottom-8 left-1/4 z-10 opacity-80 animate-bounce bg-green-500 text-white text-md  text-center rounded-xl cursor-pointer"
    >
      {label}
    </div>
  );
}

function TelegramMainButton({ label, onClick }) {
  useEffect(() => {
    tgApp.MainButton.show();
    return () => tgApp.MainButton.hide();
  }, []);

  useEffect(() => {
    tgApp.MainButton.setText(label);
  }, [label]);

  useEffect(() => {
    window.Telegram.WebApp.MainButton.onClick(onClick);
    return () => window.Telegram.WebApp.MainButton.offClick(onClick);
  }, [onClick]);

  return null;
}

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
