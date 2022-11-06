import React from "react";
import classNames from "classnames";
import PaginationRC from "rc-pagination";

export function Pagination(props) {
  return (
    <div className="flex justify-center mt-12 mb-20 ">
      <PaginationRC
        className="flex flex-wrap gap-4"
        itemRender={(page, type, element) => {
          const style = classNames(
            "h-10 w-10 rounded-full cursor-pointer flex justify-center items-center select-none",
            {
              "bg-amber-400 opacity-60 hover:opacity-100":
                page !== props.current || type === "next",
              "bg-amber-800 text-white":
                page === props.current && type !== "next",
            }
          );

          switch (type) {
            case "page":
              return <div className={style}>{page}</div>;
            case "prev":
              return <div className={style}>&lt;</div>;
            case "next":
              return <div className={style}>&gt;</div>;
            case "jump-prev":
            case "jump-next":
              return <span>...</span>;
            default:
          }
          return element;
        }}
        {...props}
      />
    </div>
  );
}
