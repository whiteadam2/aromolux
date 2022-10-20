import React, { useEffect, useState } from "react";
import { Product } from "./Product";
import { TelegramMainButton } from "./components/TelegramMainButton";
import { useFetchProducts } from "./hooks/useFetchProducts";
import { useNavigate } from "react-router-dom";

export function Products({ categoryId, title }) {
  const { data, isFetching } = useFetchProducts(categoryId);
  const [cart, setCart] = useState({ products: [], total: 0 });

  const navigate = useNavigate();

  function findCount(productId) {
    const productInCart = cart.products.find(
      (addedProducts) => addedProducts.id === productId
    );
    return productInCart ? productInCart.count : 0;
  }

  function onAddProduct(product) {
    const index = cart.products.findIndex(
      (addedProducts) => addedProducts.id === product.id
    );
    let updatedProducts = [];

    if (index < 0) {
      updatedProducts = [...cart.products, { ...product, count: 1 }];
    } else {
      updatedProducts = [...cart.products];
      updatedProducts[index].count += 1;
    }

    setCart({ products: updatedProducts, total: cart.total + product.price });
  }

  function onRemoveProduct(productId) {
    const index = cart.products.findIndex(
      (addedProducts) => addedProducts.id === productId
    );
    const updatedProducts = [...cart.products];
    const updatedTotal = cart.total - updatedProducts[index].price;

    updatedProducts[index].count -= 1;
    if (updatedProducts[index].count === 0) updatedProducts.splice(index, 1);

    setCart({ products: updatedProducts, total: updatedTotal });
  }

  return (
    <div>
      <h1 className="my-10 text-2xl text-center font-semibold">{title}</h1>
      {isFetching ? (
        <div className="flex justify-center items-center ">
          <img
            src="/images/essential-oil.png"
            alt="downloading data"
            className="animate-ping mt-40"
          />
        </div>
      ) : (
        <>
          {cart.total && (
            <TelegramMainButton
              label={"Оформить заказ: " + cart.total + " руб."}
              onClick={() => navigate("/order", { state: cart })}
            />
          )}
          <div className="flex flex-wrap justify-center gap-y-20 gap-x-8">
            {data.map((product) => (
              <Product
                key={product.id}
                data={product}
                count={findCount(product.id)}
                onAddProduct={onAddProduct}
                onRemoveProduct={onRemoveProduct}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
