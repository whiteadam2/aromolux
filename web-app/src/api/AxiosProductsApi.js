import axios from "axios";
import { XMLParser } from "fast-xml-parser";

export class AxiosShopApi {
  #http = null;

  constructor(url) {
    this.#http = axios.create({
      baseURL: url,
      timeout: 2000,
    });
  }

  async getProducts() {
    const response = await this.#http.get("/yandex.xml");

    if (response) {
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "",
      });

      const products = parser.parse(response.data).yml_catalog.shop.offers
        .offer;

      const sortedProducts = products.sort(
        (a, b) => b.position_global - a.position_global
      );

      return sortedProducts;
    }

    return null;
  }
}
