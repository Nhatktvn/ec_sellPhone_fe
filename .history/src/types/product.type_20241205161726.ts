export interface product {
  category_id: number
  category_name: string
  description: string
  id: number
  name: string
  rate: number
  urlImage: string
  variantDTOList: variant[]
  images: imageProduct[]
  specificationDTO: any
  reviews: reviews[]
  createdDate: Date
  userCreated: any
}

export interface reviews {
  id: number
  rate: number
  name: string
  username: string
  contentReviews: string
  urlImage: string
  createdDate: string
}

export interface imageProduct {
  id: number
  urlImage: string
}

interface variant {
  color: string
  storageCapacity: number
  ram: numner
  originalPrice: number
  sellPrice: number
  available: number
}

// interface specificationDTO {
//   sizeScreen: number
//   screenTechnology: string
//   cameraRear: string
//   cameraFront: string
//   chipset: string
//   ram: string
//   rom: string
//   battery: number
//   screenResolution: string
//   operaSystem: string
// }

// interface laptopSpecificationDTO {
//   screen: string
//   cpu: string
//   gpu: string
//   ram: string
//   rom: string
//   battery: string
//   operaSystem: string
//   weight: string
//   ports: string
//   additionalFeatures: string
// }
