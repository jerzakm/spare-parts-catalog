import * as Papa from 'papaparse'
import { productStore, partStore, partFitStore } from '../stores'
import type { Product, SparePart } from './models'
import { writable } from 'svelte/store'

export const loadProducts = () => {
  return new Promise((resolve, reject) => {
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
        resolve(products)
        productStore.set(products)
      },
    })
  })
}

export const loadParts = () => {
  return new Promise((resolve, reject) => {
    const partsList: SparePart[] = []

    Papa.parse('partslist.csv', {
      header: true,
      download: true,
      delimiter: ';',
      complete: function (results) {
        const data: any[] = results.data

        for (const p of data) {
          const newPart = {
            description: p.desc,
            fits: [],
            image: p.image,
            name: p.name,
            symbol: p.symbol,
            type: p.type,
          }
          if (newPart.symbol) {
            partsList.push(newPart)
          }
        }

        Papa.parse('partsfit.csv', {
          header: true,
          download: true,
          delimiter: ';',
          complete: function (results) {
            const data: any[] = results.data

            partFitStore.set(data)

            for (const p of data) {
              const part = partsList.find((a) => {
                return a.symbol == p.partSymbol
              })

              if (part) {
                if (p.productSymbol.length > 3) {
                  part.fits.push(p.productSymbol)
                } else {
                  part.fits.push(p.productName)
                }
              }
            }
            partStore.set(partsList)
            resolve(partStore)
          },
        })
      },
    })
  })
}
