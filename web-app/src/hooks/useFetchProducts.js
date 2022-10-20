import { useQuery } from "@tanstack/react-query";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

export function useFetchProducts(categoryId) {
  const { data, isFetching, isError } = useQuery(["products"], () => fetch("https://aromostore.ru/yandex.xml"), {
    onSuccess: (data) => {
      const products = parser.parse(data.data).yml_catalog.shop.offers.offer;
      return products
        .sort((a, b) => b.position_global - a.position_global)
        .filter((product) => product.categoryId === categoryId);
    },
  });

  return { data, isFetching, isError };
}
