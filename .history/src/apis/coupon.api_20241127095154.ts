import http from '../utils/http'
interface dataAddCoupon {
  codeCoupon : string
  typeCoupon : string
  couponValue: number
  minimumAmount : number
  quantity : number
  startTime : any
  endTime : any
}
export const addCoupon = (data:) => http.post('/admin/coupon')
