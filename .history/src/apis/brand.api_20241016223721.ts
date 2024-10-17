import http from '../utils/http'
export const getBrands = () => http.get('/brands-sort')
export const deleteCategoryById = () => http.delete(`/admin/brand`)
export const getBrandByCategoryName = (categoryName: string) =>
  http.get(`/brandsByCategoryName?categoryName=${categoryName}`)
export const addBrand = (data: FormData) =>
  http.post('/admin/brand', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
