// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const orderCod = (body: any) => http.post('/admin/products', body)
export const orderVnpay = (body: string, totalPrice: number) => http.get(`/product?name=${body}`)
export const getProducts = () => http.get('/products')
export const getProductsByCate = (data: string | undefined) => http.get(`/products/products-by-cate?cateName=${data}`)
export const getSuggetProduct = (data: string) => http.get(`/product/suggest-products?keyName=${data}`)
export const getSearchProduct = (data: string | null) => http.get(`/products/search?searchName=${data}`)
