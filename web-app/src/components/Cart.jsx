import React from "react";
import { useSelector } from "react-redux";

import { OrdersList } from "./OrdersList";
import { UserForm } from "./UserForm";

export function Cart() {
  const orders = useSelector((state) => state.orders);

  return (
    <div className="mx-10 ">
      <OrdersList orders={orders} />
      <UserForm orders={orders} />
    </div>
  );
}
