import http from '../utils/http'
// export const deleteCategoryById = (id: number) => http.delete(`/admin/category/${id}`)
export const getAllCategories = () => http.get(`/categories`)
export const addCategory = (data: FormData) => http.post('/admin/category', data)
export const deleteCategoryById = (id: number) => http.delete(`/admin/category/${id}`)
export const updateCategoryById = (data: any) => http.delete(`/admin/category/`)
