export interface SparePart {
  name: string
  symbol: string
  description: string
  image: string
  type: string
  fits: string[]
}

interface PartEntry {
  part: SparePart
  qty: number
  variant?: string
}

export interface Product {
  name: string
  manual: string
  variants: ProductVariant[]
  parts: PartEntry[]
}

interface ProductVariant {
  symbol: string
  image: string
}
