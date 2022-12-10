import axios, { AxiosResponse } from 'axios'
import { IBotOrder } from '../@types'
import { tgBotWebServer } from '../../config/config.json'

export async function sendOrderToBot(
  data: IBotOrder,
  queryId: string
): Promise<AxiosResponse> {
  return await axios({
    url: tgBotWebServer,
    method: 'post',
    data: JSON.stringify({ data, queryId }),
    headers: { 'Content-Type': 'application/json' }
  })
}
