import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../redux/cartSlice";

export function Product({ data }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart.orders);
  const product = orders.find((order) => order.id === data.id);

  const handleClickAdd = (data) => {
    dispatch(addProduct(data));
    window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
  };

  const handleClickRemove = (id) => {
    dispatch(removeProduct(id));
    window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
  };

  return (
    <div className="flex flex-col items-center w-40">
      <h2 className="h-16 text-center text-base font-normal leading-tight">
        {data.name}
      </h2>
      <div className="w-40 h-40 relative border-solid border-2 border-amber-400 rounded-md">
        <img src={data.picture} alt={data.name} className="rounded-md" />
        {product && (
          <div className="absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-red-400 flex justify-center items-center text-white shadow-md">
            {product.count}
          </div>
        )}
      </div>
      <p className="my-4 flex w-full px-1 justify-between">
        <span className="line-through">{data.oldprice} руб.</span>
        <span className="text-red-400 font-semibold">{data.price} руб.</span>
      </p>
      {product ? (
        <div className="flex justify-center gap-x-2">
          <div
            className="px-4 py-1.5 flex justify-center items-center shadow-md cursor-pointer
            select-none text-white bg-red-500 text-xl font-normal rounded-xl"
            onClick={() => handleClickRemove(data.id)}
          >
            &minus;
          </div>
          <div
            className="px-4 py-1.5 flex justify-center items-center shadow-md cursor-pointer
            select-none text-white bg-blue-500 text-xl font-normal rounded-xl"
            onClick={() => handleClickAdd(data)}
          >
            +
          </div>
        </div>
      ) : (
        <div
          className="px-4 py-1.5 flex justify-center items-center shadow-md cursor-pointer
           select-none text-white bg-blue-500 text-xl font-normal rounded-xl"
          onClick={() => handleClickAdd(data)}
        >
          В корзину
        </div>
      )}
    </div>
  );
}
