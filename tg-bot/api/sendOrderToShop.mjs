import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const shopUrl = process.env.PASSING_ORDER_URL;

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
  console.log(shopUrl);
  console.log(order);
  return await axios.post(shopUrl, order);
}
