import React, { useContext } from "react";
import { OrdersContext } from "../App";

import { OrdersList } from "./OrdersList";
import { UserForm } from "./UserForm";

export function Cart() {
  const { orders } = useContext(OrdersContext);

  return (
    <div className="mx-10 ">
      <OrdersList orders={orders} />
      <UserForm orders={orders} />
    </div>
  );
}
