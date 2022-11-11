import React from "react";
import { useLocation } from "react-router-dom";
import { OrdersList } from "./OrdersList";
import { UserForm } from "./UserForm";

export function Cart() {
  const { state: orders } = useLocation();

  return (
    <div className="mx-10 ">
      <OrdersList orders={orders} />
      <UserForm orders={orders} />
    </div>
  );
}
