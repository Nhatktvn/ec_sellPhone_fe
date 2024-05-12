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
  sizeScreen: 6.7
  screenTechnology: 'Super Retina XDR OLED'
  cameraRear: '-Camera chính: 48MP, 24 mm, ƒ/1.78 -Camera góc siêu rộng: 12 MP, 13 mm, ƒ/2.2 -Camera tele: Camera Tele: 12 MP'
  cameraFront: '12MP, ƒ/1.9'
  chipset: 'Apple A17 Pro 6 nhân'
  ram: '8GB'
  rom: '256GB'
  battery: 4422
  screenResolution: '2796 x 1290 pixel'
  operaSystem: 'iOS 17'
}
