export interface product {
  category_id: number
  description: string
  discount: number
  id: number
  name: string
  rate: number | null
  urlImage: string
  variantDTOList: variant[]
  images: imageProduct[]
}

export interface imageProduct {
  id: number
  urlImage: string
}

interface variant {
  color: string
  storageCapacity: string
  price: number
  available: number
}
