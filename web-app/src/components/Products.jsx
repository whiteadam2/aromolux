import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setIsSortVisible } from "../redux/filterSlice";

import {
  useFetchProducts,
  usePrepareProducts,
  useOutsideClick,
} from "../hooks";

import { Product } from "./Product";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { ProductsSkeleton } from "./ProductsSkeleton";
import { MainButton } from "./MainButton";
import { Pagination } from "./Pagination";
import { TelegramWrapper } from "./TelegramWrapper";

export function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);
  const { paginatedData, pageCount, pageSize } = useSelector(
    (state) => state.filter
  );

  const { data, isFetching } = useFetchProducts();
  const sortRef = useRef();

  usePrepareProducts(data);
  useOutsideClick(sortRef, () => {
    dispatch(setIsSortVisible(false));
  });

  const total = orders.reduce(
    (acc, order) => acc + order.count * order.price,
    0
  );

  return (
    <>
      <TelegramWrapper>
        <Header sortRef={sortRef} />
      </TelegramWrapper>

      <NavBar />

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
          paginatedData.map((product) => (
            <Product key={product.id} data={product} />
          ))
        )}
      </div>

      {!isFetching && pageCount > pageSize && <Pagination />}
    </>
  );
}
