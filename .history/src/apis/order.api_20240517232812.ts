// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const orderCod = (body: any) => http.post('/order', body)

export const orderVnpay = (data: FormData, totalPrice: number | undefined) =>
  http.post(`/payment/pay?totalPrice=${totalPrice}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
