import React from "react";
import { useNavigate } from "react-router-dom";

export function OrdersList({ cart }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="my-10 text-xl text-center font-medium">Ваш заказ</h1>
        <span
          className="px-4 py-2 text-gray-100 bg-amber-400 rounded-3xl cursor-pointer shadow-sm"
          onClick={() => navigate(-1)}
        >
          Изменить
        </span>
      </div>

      {cart.orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center mb-4 gap-4"
        >
          <img
            src={order.picture}
            alt=""
            className="w-16 h-16 border-solid border-2 border-amber-400 rounded-md"
          />
          <p className="text-center text-sm">{order.name}</p>
          <span className="whitespace-nowrap text-sm font-bold">
            x {order.count}
          </span>
          <span className="whitespace-nowrap text-sm font-bold">
            {order.count * order.price} руб.
          </span>
        </div>
      ))}
      <div className="text-right font-semibold">{`Итого ${cart.total} руб.`}</div>
    </>
  );
}
