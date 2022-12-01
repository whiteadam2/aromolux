import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { IProductXML, IProduct } from "../@types";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

let products: IProductXML[];

interface IState {
  entities: IProduct[] | null;
  isLoading: boolean;
  isError: boolean;
}
const initialState: IState = {
  entities: null,
  isLoading: false,
  isError: false,
};

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (categoryId: number): Promise<IProduct[]> => {
    if (!products) {
      const { data } = await axios.get<string>(
        "https://aromomama.ru/yandex.xml"
      );
      products = parser.parse(data).yml_catalog.shop.offers.offer;
    }

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
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default productsSlice.reducer;
