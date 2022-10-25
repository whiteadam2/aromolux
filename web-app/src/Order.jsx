import React from "react";
import { MainButton } from "./components/MainButton";
import { useLocation, useNavigate } from "react-router-dom";

export function Order() {
  const { state: orders } = useLocation();

  const total = orders.reduce(
    (acc, order) => acc + order.count * order.price,
    0
  );

  const navigate = useNavigate();

  return (
    <div className="mx-10 ">
      <MainButton
        label={"Подтвердить заказ!"}
        onClick={() => navigate("/man")}
      />
      <h1 className="my-10 text-2xl text-center font-semibold">Ваш заказ:</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center mb-4 gap-4"
        >
          <img
            src={order.picture}
            alt=""
            className="w-16 h-16 border-solid border-2 border-blue-200 rounded-md"
          />
          <p className="text-center text-sm">{order.name}</p>
          <span className="whitespace-nowrap text-sm font-medium">
            x {order.count}
          </span>
          <span className="whitespace-nowrap text-sm font-medium">
            {order.count * order.price} руб.
          </span>
        </div>
      ))}
      <div className="text-right font-semibold">{`Итого: ${total} руб.`}</div>
    </div>
  );
}
