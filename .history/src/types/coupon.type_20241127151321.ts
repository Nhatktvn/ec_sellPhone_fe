export interface CouponRequest {
  codeCoupon: string
  typeCoupon: string
  couponValue: number
  minimumAmount: number
  quantity: number
  startTime: any
  endTime: any
}

export interface CouponResponse {
  id: number
  codeCoupon: string
  typeCoupon: string
  couponValue: number
  minimumAmount: number
  quantity: number
  startTime: any
  endTime: any
}
