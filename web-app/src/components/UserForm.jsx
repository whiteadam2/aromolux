import React, { useState } from "react";
import { Input } from "./Input";
import { MainButton } from "./MainButton";
import { sendOrders } from "../api/sendOrders";

export function UserForm({ orders }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleMainButtonClick() {
    if (!name || !phoneNumber) return;

    const cart = orders.map((order) => ({
      productId: order.id,
      quantity: order.count,
    }));

    const tgApp = window.Telegram.WebApp;

    if (tgApp.platform !== "unknown") {
      sendOrders(cart, name, phoneNumber);
      tgApp.sendData(JSON.stringify(orders));
      tgApp.close();
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 mt-6 mb-28">
        <h2 className="text-center text-xl">Заполните свои данные:</h2>
        <Input
          isFocused={true}
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Телефон"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <MainButton
        label={"Подтвердить заказ!"}
        onClick={handleMainButtonClick}
      />
    </>
  );
}
