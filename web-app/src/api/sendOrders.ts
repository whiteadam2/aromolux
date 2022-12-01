import axios from "axios";
import { IOrder, IShopOrder } from "../@types";

export async function sendToShop(
  data: IShopOrder[],
  name: string,
  phoneNumber: string
) {
  return await axios.post(
    "https://aromostore.ru/telapi/?token_key=d1994656fbfdb6d627b",
    {
      data,
      user: {
        name,
        phoneNumber,
      },
    }
  );
}

export async function sendToBot(orders: IOrder[], queryId: string) {
  return await axios({
    url: "https://aromomania.ru/bot",
    method: "post",
    data: JSON.stringify({ orders, queryId }),
    headers: { "Content-Type": "application/json" },
  });
}
