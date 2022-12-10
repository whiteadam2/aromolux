import { TelegramWebApps } from 'telegram-webapps-types'

declare global {
  interface Window {
    Telegram: TelegramWebApps.SDK
  }
}

export interface IProduct {
  id: string
  name: string
  picture: string
  price: number
  oldprice: number
}

export interface IProductXML extends IProduct {
  position_global: number
  categoryId: number
}

export interface IOrder extends IProduct {
  count: number
}

export interface ICart {
  orders: IOrder[]
  total: number
}

export interface IBotOrder {
  cart: ICart
  user: { name: string; phoneNumber: string }
}

export interface IProductsState {
  entities: IProduct[] | null
  isLoading: boolean
  isError: boolean
}

export interface IViewState {
  paginatedData: IProduct[]
  currentPage: number
  pageSize: number
  totalCount: number
  sortProp: null | keyof IProduct
  searchValue: string
}
