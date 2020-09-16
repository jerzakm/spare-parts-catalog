import * as Papa from 'papaparse'
import { productStore } from '../stores'
import type { Product } from './models'

export const loadProducts = () => {
  Papa.parse('products.csv', {
    header: true,
    download: true,
    delimiter: ';',
    complete: function (results) {
      const data: any[] = results.data
      const products: Product[] = []

      for (const e of data) {
        const product = products.find((p) => {
          return p.name == e.name
        })

        if (product) {
          product.variants.push({
            symbol: e.symbol,
            image: e.image,
          })
          if (product.manual.length < 2) {
            product.manual = e.manual
          }
        } else {
          products.push({
            name: e.name,
            manual: e.manual,
            parts: [],
            variants: [
              {
                symbol: e.symbol,
                image: e.image,
              },
            ],
          })
        }
      }

      productStore.set(products)
    },
  })
}
