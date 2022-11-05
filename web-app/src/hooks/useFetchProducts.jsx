import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

export function useFetchProducts() {
  const [params] = useSearchParams();
  const categoryId = parseInt(params.get("category"));

  const { data, isFetching, isError } = useQuery(
    ["products"],
    () => axios.get("https://aromostore.ru/yandex.xml"),
    {
      select: (data) => {
        const products = parser.parse(data.data).yml_catalog.shop.offers.offer;
        return products
          .sort((a, b) => b.position_global - a.position_global)
          .filter((product) => product.categoryId === categoryId)
          .map((product) => ({
            id: product.id,
            name: product.name,
            picture: product.picture,
            price: product.price,
            oldprice: product.oldprice,
          }));
      },
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  return { data, isFetching, isError };
}
