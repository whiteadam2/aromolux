import axios from "axios";

export async function sendToShop(cart, name, phoneNumber) {
  await axios.post(
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
  await axios({
    url: "https://aromomania.ru/bot",
    method: "post",
    data: JSON.stringify({ orders, queryId }),
    headers: { "Content-Type": "application/json" },
  });
}
