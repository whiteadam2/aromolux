/**
 * @typedef {Object} WebAppData
 * @property {Object} cart
 * @property {
 * {id: string, name: string, picture: string, price: number, oldprice: number, count:number}[]
 * } cart.orders
 * @property {number} cart.total
 * @property {Object} user
 * @property {string} user.name
 * @property {string} user.phoneNumber
 */

/**
 *
 * @param {WebAppData} data
 * @returns {string}
 */

export function messageFromData(data) {
  const products = data.cart.orders;
  return `Ваш заказ:\n\n${products
    .map((product) => `${product.name} - ${product.count} шт.`)
    .join("\n")}\n\nИтого: ${products.reduce(
    (acc, order) => acc + order.price,
    0
  )} рублей!\n\nОжидайте, с Вами свяжется менеджер!`;
}

/**
 *
 * @param {WebAppData} data
 * @returns {{user, products: {quantity: *, productId: *}[]}}
 */

export function orderFromData(data) {
  const products = data.cart.orders.map((order) => ({
    productId: order.id,
    quantity: order.count,
  }));
  return {
    products,
    user: data.user,
  };
}
