import React, { useContext } from "react";
import { OrdersContext } from "../App";
import { useNavigate } from "react-router-dom";

import { useFetchProducts } from "../hooks/useFetchProducts";
import { usePrepareProducts } from "../hooks/usePrepareProducts";

import { Product } from "./Product";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { ProductsSkeleton } from "./ProductsSkeleton";
import { MainButton } from "./MainButton";
import { Pagination } from "./Pagination";
import { TelegramWrapper } from "./TelegramWrapper";

export function Products() {
  const navigate = useNavigate();
  const { orders, setOrders } = useContext(OrdersContext);

  const { data, isFetching } = useFetchProducts();
  const {
    sortValue,
    setSortValue,
    searchValue,
    setSearchValue,
    currentPage,
    setCurrentPage,
    pageSize,
    pageCount,
    paginatedData,
  } = usePrepareProducts(data);

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
    <>
      <TelegramWrapper>
        <Header sortItem={sortValue} onSort={(id) => setSortValue(id)} />
      </TelegramWrapper>

      <NavBar searchValue={searchValue} setSearchValue={setSearchValue} />

      {orders.length > 0 && (
        <MainButton
          label={`Оформить заказ: ${total} руб.`}
          onClick={() => navigate("/cart")}
        />
      )}

      <div className="flex flex-wrap justify-center gap-y-20 gap-x-8 mb-20">
        {isFetching ? (
          <ProductsSkeleton amount={8} />
        ) : (
          paginatedData.map((product) => {
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

      {!isFetching && pageCount > pageSize && (
        <Pagination
          pageSize={pageSize}
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
          total={pageCount}
        />
      )}
    </>
  );
}
