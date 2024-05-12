// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const createProduct = (body: any) => http.post('/admin/products', body)
export const getProductByName = (body: string | null) => http.get(`/product?name=${body}`)
