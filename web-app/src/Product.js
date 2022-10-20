import React from "react";

export function Product({ data, count, onRemoveProduct, onAddProduct }) {
  return (
    <div className="flex flex-col items-center w-40">
      <h2 className="h-16 text-center text-base font-normal leading-tight">{data.name}</h2>
      <div className="w-40 h-40 relative border-solid border-2 border-blue-200 rounded-md">
        <img src={data.picture} alt={data.name} className="rounded-md" />
        {count ? (
          <div className="absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-red-400 flex justify-center items-center text-white shadow-md">
            {count}
          </div>
        ) : (
          ""
        )}
      </div>
      <p className="mt-4 flex w-full px-1 justify-between">
        <span className="line-through">{data.oldprice} руб.</span>
        <span className="text-red-400 font-semibold">{data.price} руб.</span>
      </p>
      {count ? (
        <div className="mt-4 flex justify-center w-full">
          <div
            className="w-12 h-10 mx-1 flex justify-center items-center text-white text-4xl font-normal bg-red-400 rounded-xl cursor-pointer
            transition ease-in-out delay-450 hover:scale-105 hover:bg-red-500 duration-400 shadow-md"
            onClick={() => onRemoveProduct(data.id)}
          >
            &minus;
          </div>
          <div
            className="w-12 h-10 mx-1 flex justify-center items-center text-white text-4xl font-normal bg-emerald-400 rounded-xl cursor-pointer
            transition ease-in-out delay-450 hover:scale-105 hover:bg-emerald-500 duration-400 shadow-md"
            onClick={() => onAddProduct(data)}
          >
            +
          </div>
        </div>
      ) : (
        <div
          className="mt-4 rounded-xl bg-emerald-400 text-white px-4 h-10 flex justify-center items-center cursor-pointer
          transition ease-in-out delay-450 hover:scale-105 hover:bg-blue-400 duration-400 shadow-md"
          onClick={() => onAddProduct(data)}
        >
          В корзину
        </div>
      )}
    </div>
  );
}
