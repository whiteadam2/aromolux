import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchProducts, usePrepareProducts } from "../hooks";
import { Product } from "./Product";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { ProductsSkeleton } from "./ProductsSkeleton";
import { MainButton } from "./MainButton";
import { Pagination } from "./Pagination";
import { TelegramWrapper } from "./TelegramWrapper";

export function Products() {
  const navigate = useNavigate();

  const total = useSelector((state) => state.cart.total);
  const { paginatedData, pageCount, pageSize } = useSelector(
    (state) => state.view
  );

  const { data, isFetching } = useFetchProducts();
  usePrepareProducts(data);

  return (
    <>
      <TelegramWrapper>
        <Header />
      </TelegramWrapper>

      <NavBar />

      {total > 0 && (
        <MainButton
          label={`Оформить заказ: ${total} руб.`}
          onClick={() => navigate("/cart")}
        />
      )}

      <div className="flex flex-wrap justify-center gap-y-20 gap-x-8 mb-20">
        {isFetching ? (
          <ProductsSkeleton amount={8} />
        ) : (
          paginatedData.map((product) => (
            <Product key={product.id} data={product} />
          ))
        )}
      </div>

      {!isFetching && pageCount > pageSize && <Pagination />}
    </>
  );
}
