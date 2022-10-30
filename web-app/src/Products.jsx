import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Product } from "./Product";
import { NavBar } from "./NavBar";
import { Sort } from "./Sort";
import { MockProduct } from "./components/MockProduct";
import { MainButton } from "./components/MainButton";
import { useFetchProducts } from "./hooks/useFetchProducts";

export function Products({ categoryId }) {
  const { data, isFetching } = useFetchProducts(categoryId);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fakeProducts = [...new Array(8)];

  const total = orders.reduce(
    (acc, order) => acc + order.count * order.price,
    0
  );

  function handleOrder(nextOrder) {
    const filtered = orders.filter((order) => order.id !== nextOrder.id);

    if (nextOrder.count > 0) {
      filtered.push(nextOrder);
    }
    setOrders(filtered);
  }

  return (
    <div>
      <NavBar />
      <Sort />
      {orders.length > 0 && (
        <MainButton
          label={`Оформить заказ: ${total} руб.`}
          onClick={() => navigate("/order", { state: orders })}
        />
      )}
      <div className="flex flex-wrap justify-center gap-y-20 gap-x-8">
        {isFetching
          ? fakeProducts.map((_, index) => <MockProduct key={index} />)
          : data.map((product) => {
              const addedProduct = orders.find(
                (order) => order.id === product.id
              );
              const count = addedProduct ? addedProduct.count : 0;
              return (
                <Product
                  key={product.id}
                  data={product}
                  count={count}
                  onOrder={handleOrder}
                />
              );
            })}
      </div>
    </div>
  );
}
