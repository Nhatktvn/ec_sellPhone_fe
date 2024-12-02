import { dataAddCoupon } from '../types/coupon.type'
import http from '../utils/http'
export const addCoupon = (data: dataAddCoupon) => http.post('/admin/coupon', data)

export const getCouponByUser = (idUser: number, idCoupon: number) =>
  http.post(`/admin/coupon?idUser=${idUser}&idCoupon=${idCoupon}`)