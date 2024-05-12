import http from '../utils/http'
interface category {
  name: string
  image: File
  description: string
}
export const getCategories = () => http.get('/categories-sort')
export const deleteCategoryById = (id: number) => http.delete(`/admin/category/${id}`)
export const addCategoryById = (data: category) => http.post('/admin/category', data)
