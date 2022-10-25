import React, { useState } from "react";
import { Product } from "./Product";
import { MockProduct } from "./components/MockProduct";
import { MainButton } from "./components/MainButton";
import { useFetchProducts } from "./hooks/useFetchProducts";
import { useNavigate } from "react-router-dom";

export function Products({ categoryId, title }) {
  const { data, isFetching } = useFetchProducts(categoryId);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  function handleOrder(nextOrder) {
    const filtered = orders.filter((order) => order.id !== nextOrder.id);

    if (nextOrder.count > 0) {
      filtered.push(nextOrder);
    }
    setOrders(filtered);
  }

  return (
    <div className="relative">
      <h1 className="my-10 text-2xl text-center font-semibold">{title}</h1>
      {isFetching ? (
        <MockProduct />
      ) : (
        <>
          {orders.length > 0 && (
            <MainButton
              label={`Оформить заказ: ${orders.reduce(
                (acc, order) => acc + order.count * order.price,
                0
              )} руб.`}
              onClick={() => navigate("/order", { state: orders })}
            />
          )}
          <div className="flex flex-wrap justify-center gap-y-20 gap-x-8">
            {data.map((product) => (
              <Product key={product.id} data={product} onOrder={handleOrder} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
