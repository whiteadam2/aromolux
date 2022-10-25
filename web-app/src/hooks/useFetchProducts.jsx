import { useQuery } from "@tanstack/react-query";
import { XMLParser } from "fast-xml-parser";
import axios from "axios";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

export function useFetchProducts(categoryId) {
  const { data, isFetching, isError } = useQuery(
    ["products", categoryId],
    () => axios.get("https://aromostore.ru/yandex.xml"),
    {
      select: (data) => {
        const products = parser.parse(data.data).yml_catalog.shop.offers.offer;
        return products
          .sort((a, b) => b.position_global - a.position_global)
          .filter((product) => product.categoryId === categoryId);
      },
    }
  );

  return { data, isFetching, isError };
}
