import React, { useContext } from "react";
import { AppContext } from "../context";

import { OrdersList } from "./OrdersList";
import { UserForm } from "./UserForm";

export function Cart() {
  const { orders } = useContext(AppContext);

  return (
    <div className="mx-10 ">
      <OrdersList orders={orders} />
      <UserForm orders={orders} />
    </div>
  );
}
