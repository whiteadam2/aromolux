import React from "react";
import { Button } from "./components/Button";

export function Product({ data, count, onOrder }) {
  function handleChange(nextCount) {
    onOrder({ ...data, count: nextCount });
  }

  return (
    <div className="flex flex-col items-center w-40">
      <h2 className="h-16 text-center text-base font-normal leading-tight">
        {data.name}
      </h2>
      <div className="w-40 h-40 relative border-solid border-2 border-custom-bg rounded-md">
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
          <Button
            classes="bg-red-400 hover:scale-105 hover:bg-red-500"
            onClick={() => handleChange(count - 1)}
          >
            &minus;
          </Button>
          <Button
            classes="bg-emerald-400 hover:scale-105 hover:bg-emerald-500"
            onClick={() => handleChange(count + 1)}
          >
            +
          </Button>
        </div>
      ) : (
        <Button
          classes="bg-emerald-400 hover:scale-105 hover:bg-blue-400"
          onClick={() => handleChange(count + 1)}
        >
          В корзину
        </Button>
      )}
    </div>
  );
}
