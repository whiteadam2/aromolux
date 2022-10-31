import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Product } from "./Product";
import { NavBar } from "./NavBar";
import { MockProduct } from "./MockProduct";
import { MainButton } from "./MainButton";
import { useFetchProducts } from "../hooks/useFetchProducts";

export function Products() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const [search] = useSearchParams();
  const categoryId = parseInt(search.get("category"));
  const { data, isFetching } = useFetchProducts(categoryId);

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
              return (
                <Product
                  key={product.id}
                  data={product}
                  count={addedProduct ? addedProduct.count : 0}
                  onOrder={handleOrder}
                />
              );
            })}
      </div>
    </div>
  );
}
