import React from "react";
import { Product } from "./Product";
import { useNavigate } from "react-router-dom";

export function Products({ data, title, onChangeCount }) {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="my-10 text-2xl text-center font-semibold">{title}</h1>
      <button onClick={() => navigate("/order")}>test</button>
      <div className="flex flex-wrap justify-center gap-y-20 gap-x-8">
        {data.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            old_price={item.oldprice}
            picture_url={item.picture}
            onClick={onChangeCount}
            count={item.count}
          />
        ))}
      </div>
    </div>
  );
}
