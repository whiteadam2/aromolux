import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { IProductXML, IProduct, IProductsState } from '../@types'
import config from '../config/config.json'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: ''
})

let products: IProductXML[] = []

const initialState: IProductsState = {
  entities: null,
  isLoading: false,
  isError: false
}

export const fetchProducts = createAsyncThunk(
  'fetchProducts',
  async (categoryId: number): Promise<IProduct[]> => {
    if (products.length === 0) {
      const { data } = await axios.get<string>(config.feedURL)
      products = parser.parse(data).yml_catalog.shop.offers.offer
    }

    return products
      .sort((a, b) => b.position_global - a.position_global)
      .reduce((result: IProduct[], product: IProductXML): IProduct[] => {
        if (product.categoryId === categoryId) {
          result.push({
            id: product.id,
            name: product.name,
            picture: product.picture,
            price: product.price,
            oldprice: product.oldprice
          })
        }
        return result
      }, [])
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    })

    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
  }
})

export default productsSlice.reducer
