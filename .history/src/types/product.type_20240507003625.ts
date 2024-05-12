export interface product {
  category_id: number
  description: string
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
  origianlPrice: number
  sellPrice: number
  available: number
}
