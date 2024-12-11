// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const createProduct = (body: any) => http.post('/admin/products', body)
export const getProductByName = (body: string | undefined) => http.get(`/product?name=${body}`)
export const getProducts = () => http.get('/products/get-all')
export const getProductsByBrand = (data: string | undefined) =>
  http.get(`/products/products-by-brand?brandName=${data}`)
export const getSuggetProduct = (data: string) => http.get(`/product/suggest-products?keyName=${data}`)
export const getSearchProduct = (data: string | null) => http.get(`/products/search?searchName=${data}`)
export const deleteProductById = (data: number | null) => http.delete(`/admin/products/${data}`)
export const getProductByIds = (data: number[] | null) => http.post(`/product/by-ids`, data)
export const getProductFilter = (query: string) => http.post(`/product/filter${query}`)
export const getRecommendProduct = () => http.get(`/products/recommend`)
export const addProduct = (data: FormData) =>
  http.post('/admin/products', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
