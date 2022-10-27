import axios from "axios";

export async function sendOrders(cart, name, phoneNumber) {
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
