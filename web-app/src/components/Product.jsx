import React from "react";
import { useDispatch } from "react-redux";
import { handleOrder } from "../redux/ordersSlice";

export function Product({ data, count }) {
  const dispatch = useDispatch();
  const tgApp = window.Telegram.WebApp;

  function handleChange(nextCount) {
    dispatch(handleOrder({ ...data, count: nextCount }));
    tgApp.HapticFeedback.impactOccurred("medium");
  }

  return (
    <div className="flex flex-col items-center w-40">
      <h2 className="h-16 text-center text-base font-normal leading-tight">
        {data.name}
      </h2>
      <div className="w-40 h-40 relative border-solid border-2 border-amber-400 rounded-md">
        <img src={data.picture} alt={data.name} className="rounded-md" />
        {count ? (
          <div className="absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-red-400 flex justify-center items-center text-white shadow-md">
            {count}
          </div>
        ) : (
          ""
        )}
      </div>
      <p className="my-4 flex w-full px-1 justify-between">
        <span className="line-through">{data.oldprice} руб.</span>
        <span className="text-red-400 font-semibold">{data.price} руб.</span>
      </p>
      {count ? (
        <div className="flex justify-center gap-x-2">
          <div
            className="px-4 py-1.5 flex justify-center items-center shadow-md cursor-pointer
            select-none text-white bg-red-500 text-xl font-normal rounded-xl"
            onClick={() => handleChange(count - 1)}
          >
            &minus;
          </div>
          <div
            className="px-4 py-1.5 flex justify-center items-center shadow-md cursor-pointer
            select-none text-white bg-blue-500 text-xl font-normal rounded-xl"
            onClick={() => handleChange(count + 1)}
          >
            +
          </div>
        </div>
      ) : (
        <div
          className="px-4 py-1.5 flex justify-center items-center shadow-md cursor-pointer
           select-none text-white bg-blue-500 text-xl font-normal rounded-xl"
          onClick={() => handleChange(count + 1)}
        >
          В корзину
        </div>
      )}
    </div>
  );
}
