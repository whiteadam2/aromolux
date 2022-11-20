import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://aromostore.ru/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: "yandex.xml", responseHandler: "text" }),
      transformResponse: (data, meta, categoryId) => {
        const products = parser.parse(data).yml_catalog.shop.offers.offer;
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
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
