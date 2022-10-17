import { useQuery } from "@tanstack/react-query";
import { AxiosShopApi } from "../api/AxiosProductsApi";

const api = new AxiosShopApi("https://aromostore.ru");

export function useFetchProducts() {
  const { data, isFetching, isError } = useQuery(
    ["products"],
    api.getProducts,
    {
      onSuccess: (data) => {
        return data.map((product) => ({ ...product, count: 0 }));
      },
    }
  );

  return { data, isFetching, isError };
}
