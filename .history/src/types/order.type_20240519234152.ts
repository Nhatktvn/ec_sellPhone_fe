export interface order {
  address: string
  name: string
  phone: string
  deliveryTime: Date
  totalPrice: number
  statusOrder: string
}

interface VNPayRes {
  vnpAmount: string
}
