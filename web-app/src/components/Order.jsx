import React from "react";
import { useLocation } from "react-router-dom";

import { OrdersList } from "./OrdersList";
import { UserForm } from "./UserForm";
import { TelegramWrapper } from "./TelegramWrapper";
import { BackButton } from "./BackButton";

export function Order() {
  const { state: orders } = useLocation();

  return (
    <div className="mx-10 ">
      <TelegramWrapper>
        <BackButton />
      </TelegramWrapper>
      <OrdersList orders={orders} />
      <UserForm orders={orders} />
    </div>
  );
}
