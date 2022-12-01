import React, { useEffect } from "react";
import { fetchProducts } from "../redux/productsSlice";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePrepareProducts } from "../hooks";
import { Product } from "./Product";
import { ProductsSkeleton } from "./ProductsSkeleton";
import { MainButton } from "./MainButton";
import { Pagination } from "./Pagination";
import { IProduct } from "../@types";

export function Products() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  const {
    entities: data,
    isLoading,
    isError,
  } = useAppSelector((state) => state.products);
  const paginatedData = useAppSelector((state) => state.view.paginatedData);
  const total = useAppSelector((state) => state.cart.total);

  usePrepareProducts(data);

  useEffect(() => {
    const categoryId = params.get("category");
    if (categoryId) dispatch(fetchProducts(parseInt(categoryId)));
    // eslint-disable-next-line
  }, [params]);

  return (
    <>
      {total > 0 && (
        <MainButton
          label={`Оформить заказ: ${total} руб.`}
          onClick={() => navigate("/cart")}
        />
      )}

      <div className="flex flex-wrap justify-center gap-y-20 gap-x-8 mb-20">
        {isLoading && !isError ? (
          <ProductsSkeleton amount={8} />
        ) : (
          paginatedData.map((product: IProduct) => (
            <Product key={product.id} data={product} />
          ))
        )}
        {isError && (
          <div>
            <p className="text-xl w-80 text-center mt-20">
              К сожалению произошла ошибка при загрузке данных!
            </p>
          </div>
        )}
      </div>

      {!isLoading && <Pagination />}
    </>
  );
}
