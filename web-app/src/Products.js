import React, { useEffect, useState } from "react";
import { Product } from "./Product";
import { TelegramMainButton } from "./components/TelegramMainButton";
import { useFetchProducts } from "./hooks/useFetchProducts";

export function Products({ categoryId, title }) {
  const { data, isError, isFetching } = useFetchProducts(categoryId);
  const [cart, setCart] = useState({ products: [], total: 0 });

  function findCount(product) {
    const productInCart = cart.products.find((addedProducts) => addedProducts.id === product.id);
    return productInCart ? productInCart.count : 0;
  }

  function onChangeCount(productId, option = { inc: 1 }) {}

  return (
    <div>
      <h1 className="my-10 text-2xl text-center font-semibold">{title}</h1>
        {isFetching? }
      {cart.total ? <TelegramMainButton label={cart.total} /> : ""}
      <div className="flex flex-wrap justify-center gap-y-20 gap-x-8">
        {data.map((product) => (
          <Product data={product} count={findCount(product)} onClick={onChangeCount} />
        ))}
      </div>
    </div>
  );
}
