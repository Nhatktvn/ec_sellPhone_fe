import { Coupon } from '../types/coupon.type'
import http from '../utils/http'
export const addCoupon = (data: Coupon) => http.post('/admin/coupon', data)
export const getAllCoupon = () => http.get('/coupons')
export const getCouponByUser = (idUser: number, idCoupon: number) =>
  http.post(`/user/get-coupon?idUser=${idUser}&idCoupon=${idCoupon}`)

export const getCouponForUser = (userId: number) => http.get(`/user-coupons?userId=${userId}`)
export const getListCouponUserReceived = (userId: number) => http.get(`/user/coupons-received?userId=${userId}`)
export const updateCoupon = (id: number, data: Coupon) => http.put(`/admin/coupon/${id}`, data)
export const deleteCoupon = (id: number) => http.delete(`/admin/coupon/${id}`)
