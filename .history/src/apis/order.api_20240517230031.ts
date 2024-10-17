// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const orderCod = (body: any) => http.post('/order', body)
export const orderVnpay = (data: FormData, totalPrice: number) =>
  http.post(`/product?name=${body}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
export const getProducts = () => http.get('/products')
export const getProductsByCate = (data: string | undefined) => http.get(`/products/products-by-cate?cateName=${data}`)
export const getSuggetProduct = (data: string) => http.get(`/product/suggest-products?keyName=${data}`)
export const getSearchProduct = (data: string | null) => http.get(`/products/search?searchName=${data}`)
