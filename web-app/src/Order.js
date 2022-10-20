import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TelegramMainButton } from "./components/TelegramMainButton";

export function Order() {
  const { state: cart } = useLocation();
  const tgApp = window.Telegram.WebApp;

  useEffect(() => {
    tgApp.MainButton.onClick(() => tgApp.close());
  }, []);

  return (
    <div className="mx-10 ">
      <TelegramMainButton label={"Подтвердить заказ!"} />
      <h1 className="my-10 text-2xl text-center font-semibold">Ваш заказ:</h1>
      {cart.products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center mb-4 gap-4"
        >
          <img
            src={product.picture}
            alt=""
            className="w-16 h-16 border-solid border-2 border-blue-200 rounded-md"
          />
          <p className="text-center text-sm">{product.name}</p>
          <span className="whitespace-nowrap text-sm font-medium">
            x {product.count}
          </span>
          <span className="whitespace-nowrap text-sm font-medium">
            {product.count * product.price} руб.
          </span>
        </div>
      ))}
      <div className="text-right font-semibold">Итого: {cart.total} руб.</div>
    </div>
  );
}
