// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const createProduct = (body: any) => http.post('/admin/products', body)
export const getProductByName = (body: string | undefined) => http.get(`/product?name=${body}`)
export const getProducts = () => http.get('/products')
export const getProductsByCate = (data: string) => http.get(`/products/products-by-cate?cateName=${data}`)

http://localhost:8080/api/products/products-by-cate?cateName=samsung