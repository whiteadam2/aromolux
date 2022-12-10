import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const token = process.env.SHOP_TOKEN;
const shopUrl = process.env.SHOP_URL;

/**
 *
 * @param {Object} order - Data that will be sent to the e-Shop
 * @param {Object} order.products - Data that represents products user bought
 * @param {string} order.products.productId - Product identifier in the e-Shop
 * @param {number} order.products.quantity - Amount of product
 * @param {Object} order.user - Data that represents user who placed the order
 * @param {string} order.user.name - Name of user
 * @param {string} order.user.phoneNumber - User's phone number
 * @returns {Promise<AxiosResponse>}
 */

export async function sendOrderToShop(order) {
  return await axios.post(`${shopUrl}/?token_key=${token}`, order);
}
