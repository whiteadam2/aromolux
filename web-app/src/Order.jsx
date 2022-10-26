import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MainButton } from "./components/MainButton";
import { Cart } from "./Cart";
import axios from "axios";

export function Order() {
  const { state: orders } = useLocation();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  async function sendOrders() {
    const cart = orders.map((order) => ({
      productId: order.id,
      quantity: order.count,
    }));

    await axios.post(
      "https://aromostore.ru/telapi/?token_key=d1994656fbfdb6d627b",
      {
        cart,
        user: {
          name,
          phoneNumber,
        },
      }
    );
  }

  function handleMainButtonClick() {
    const tgApp = window.Telegram.WebApp;

    return tgApp.platform !== "unknown"
      ? async () => {
          await sendOrders();
          tgApp.sendData(JSON.stringify(orders));
          tgApp.close();
        }
      : async () => {
          await sendOrders();
          console.log("Main button clicked!");
        };
  }

  return (
    <div className="mx-10 ">
      <MainButton
        label={"Подтвердить заказ!"}
        onClick={handleMainButtonClick()}
      />
      <Cart orders={orders} />
      <div className="flex flex-col gap-4 mt-6">
        <h2 className="text-center text-xl">Заполните свои данные:</h2>
        <input
          className="h-8 pl-2"
          type="text"
          autoFocus={true}
          placeholder="Ваше Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="h-8 pl-2"
          type="text"
          placeholder="Телефон"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
    </div>
  );
}
