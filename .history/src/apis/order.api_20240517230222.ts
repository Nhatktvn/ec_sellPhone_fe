// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const orderCod = (body: FormData) =>
  http.post('/order', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const orderVnpay = (data: FormData, totalPrice: number) =>
  http.get(`/payment/pay?totalPrice=${totalPrice}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
