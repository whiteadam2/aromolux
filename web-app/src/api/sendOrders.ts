import axios, { AxiosResponse } from 'axios'
import { IOrder, IShopOrder } from '../@types'

export async function sendToShop(
  data: IShopOrder[],
  name: string,
  phoneNumber: string
): Promise<AxiosResponse> {
  return await axios.post(
    'https://aromomama.ru/telapi/?token_key=d1994656fbfdb6d627b',
    {
      cart: data,
      user: {
        name,
        phoneNumber
      }
    }
  )
}

export async function sendToBot(
  orders: IOrder[],
  queryId: string
): Promise<AxiosResponse> {
  return await axios({
    url: 'https://aromomania.ru/bot',
    method: 'post',
    data: JSON.stringify({ orders, queryId }),
    headers: { 'Content-Type': 'application/json' }
  })
}
