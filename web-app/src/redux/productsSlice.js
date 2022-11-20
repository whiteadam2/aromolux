import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const initialState = { entities: null, isLoading: false };

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (categoryId) => {
    const data = await axios.get("https://aromostore.ru/yandex.xml");
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
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

//export const {} = productsSlice.actions;

export default productsSlice.reducer;
