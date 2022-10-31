import React, { useEffect } from "react";

const tgApp = window.Telegram.WebApp;

function WebMainButton({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-40 p-2 fixed top-20 right-20 z-10 opacity-70 animate-bounce bg-red-500 text-white text-md  text-center rounded-xl cursor-pointer"
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
