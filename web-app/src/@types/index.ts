import { TelegramWebApps } from "telegram-webapps-types";

declare global {
  interface Window {
    Telegram: TelegramWebApps.SDK;
  }
}

export interface IProduct {
  id: string;
  name: string;
  picture: string;
  price: number;
  oldprice: number;
}

export interface IProductXML extends IProduct {
  position_global: number;
  categoryId: number;
}

export interface IOrder extends IProduct {
  count: number;
}

export interface ICart {
  orders: IOrder[];
  total: number;
}

export interface IShopOrder {
  productId: string;
  quantity: number;
}
