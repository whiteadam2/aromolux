import axios from "axios";

export async function sendToShop(cart, name, phoneNumber) {
  return await axios.post(
    "https://aromostore.ru/telapi/?token_key=d1994656fbfdb6d627b",
    {
      cart,
      user: {
        name,
        phoneNumber,
      },
    }
  );
}

export async function sendToBot(orders, queryId) {
  return await axios({
    url: "https://aromomania.ru/bot",
    method: "post",
    data: JSON.stringify({ orders, queryId }),
    headers: { "Content-Type": "application/json" },
  });
}
