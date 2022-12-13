import axios from "axios";
import * as ConfigContainer from "../config/index.cjs";

const shopUrl = ConfigContainer.config.ordersProcessing.baseUrl;
const token = ConfigContainer.config.ordersProcessing.token;

/**
 *
 * @param {Object} order - Data that will be sent to the e-Shop
 * @param {{productId:string, quantity:number}[]} order.cart - Data that represents products user bought
 * @param {Object} order.user - Data that represents user who placed the order
 * @param {string} order.user.name - Name of user
 * @param {string} order.user.phoneNumber - User's phone number
 * @returns {Promise<AxiosResponse>}
 */

export async function sendOrderToShop(order) {
  throw new Error("@@@@@");
  return await axios.post(shopUrl, order, {
    headers: {
      "Content-Type": "application/json",
    },
    params: { token_key: token },
  });
}
