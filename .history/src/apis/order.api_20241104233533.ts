// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const orderCod = (body: any) => http.post('/order', body)

export const orderVnpay = (data: FormData, totalPrice: number | undefined) =>
  http.post(`/payment/pay?totalPrice=${totalPrice}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const getListOrder = () => http.get('/user/orders')
export const putCancelOrder = (id: number) => http.put(`/user/cancel-order/${id}`)
export const getDetailOrder = (id: number | undefined) => http.get(`/user/detail-order/${id}`)
export const getDetailOrderByCodeOrder = (code: string | undefined) => http.get(`/user/detail-order-code/${code}`)
export const getListOrderByAdmin = () => http.get('/admin/orders')
export const updateStatusOrderByAdmin = (data: any) => http.put('/order/update-status', data)
export const putReceivedOrder = (id: number) => http.put(`/user/received-order/${id}`)
