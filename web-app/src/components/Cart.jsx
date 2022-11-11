import React, { useContext } from "react";
import { OrdersContext } from "../App";
import { useNavigate } from "react-router-dom";
import { OrdersList } from "./OrdersList";
import { UserForm } from "./UserForm";
import { TelegramWrapper } from "./TelegramWrapper";
import { BackButton } from "./BackButton";

export function Cart() {
  const { orders } = useContext(OrdersContext);
  const navigate = useNavigate();

  return (
    <div className="mx-10 ">
      <TelegramWrapper>
        <BackButton />
      </TelegramWrapper>
      <button onClick={() => navigate(-1)}>back</button>
      <OrdersList orders={orders} />
      <UserForm orders={orders} />
    </div>
  );
}
