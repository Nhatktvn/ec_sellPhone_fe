import http from '../utils/http'
interface category {
  name: string
  image: File
}
export const getCategories = () => http.get('/categories-sort')
export const deleteCategoryById = (id: number) => http.delete(`/admin/category/${id}`)
export const addCategoryById = (data: number) => http.post(`/admin/category`)
