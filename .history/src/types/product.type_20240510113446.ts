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
  originalPrice: number
  sellPrice: number
  available: number
}

interface specificationDTO {
  sizeScreen: number
  screenTechnology: string
  cameraRear: string
  cameraFront: string
  chipset: string
  ram: string
  rom: string
  battery: number
  screenResolution: string
  operaSystem: string
}
