import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Product } from "./Product";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { ProductsSkeleton } from "./ProductsSkeleton";
import { MainButton } from "./MainButton";
import { useFetchProducts } from "../hooks/useFetchProducts";

export function Products() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [sortItem, setSortItem] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const [params] = useSearchParams();
  const categoryId = parseInt(params.get("category"));
  let { data, isFetching } = useFetchProducts(categoryId);

  if (!isFetching) {
    switch (sortItem) {
      case 1:
        data.sort((prev, next) => prev.price - next.price);
        break;
      case 2:
        data.sort((prev, next) => prev.name.localeCompare(next.name));
        break;
      default:
    }

    data = data.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

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
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <NavBar sortItem={sortItem} onSort={(id) => setSortItem(id)} />
      <div className="flex justify-between mx-8"></div>
      {orders.length > 0 && (
        <MainButton
          label={`Оформить заказ: ${total} руб.`}
          onClick={() => navigate("/order", { state: orders })}
        />
      )}
      <div className="flex flex-wrap justify-center gap-y-20 gap-x-8">
        {isFetching ? (
          <ProductsSkeleton amount={8} />
        ) : (
          data.map((product) => {
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
          })
        )}
      </div>
    </div>
  );
}
