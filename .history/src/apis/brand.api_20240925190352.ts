import http from '../utils/http'
export const getCategories = () => http.get('/brands-sort')
export const deleteCategoryById = (id: number) => http.delete(`/admin/category/${id}`)
export const getBrandByCategoryName = () => http.get('/brands-sort')
export const addCategory = (data: FormData) =>
  http.post('/admin/category', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })