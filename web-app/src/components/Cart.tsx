import React from "react";
import { useAppSelector } from "../hooks/redux";
import { OrdersList } from "./OrdersList";
import { UserForm } from "./UserForm";

export function Cart() {
  const cart = useAppSelector((state) => state.cart);

  return (
    <div className="mx-10 ">
      <OrdersList cart={cart} />
      <UserForm orders={cart.orders} />
    </div>
  );
}
