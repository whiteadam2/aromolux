import React from "react";
import { useGetProductsQuery } from "../redux/productsAPI";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePrepareProducts } from "../hooks";
import { Product } from "./Product";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { ProductsSkeleton } from "./ProductsSkeleton";
import { MainButton } from "./MainButton";
import { Pagination } from "./Pagination";
import { TelegramWrapper } from "./TelegramWrapper";

export function Products() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const categoryId = parseInt(params.get("category"));

  const { data, isLoading } = useGetProductsQuery(categoryId);
  const paginatedData = useSelector((state) => state.view.paginatedData);
  const total = useSelector((state) => state.cart.total);

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
        {isLoading ? (
          <ProductsSkeleton amount={8} />
        ) : (
          paginatedData.map((product) => (
            <Product key={product.id} data={product} />
          ))
        )}
      </div>

      {!isLoading && <Pagination />}
    </>
  );
}
