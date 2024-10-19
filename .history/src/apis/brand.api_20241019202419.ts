import http from '../utils/http'
export const getBrands = () => http.get('/brands-sort')
export const deleteBrandById = (id: number | undefined) => http.delete(`/admin/brand/${id}`)
export const getBrandByCategoryName = (categoryId: number) => http.get(`/brandsByCategory?categoryId=${categoryId}`)
export const addBrand = (data: FormData) =>
  http.post('/admin/brand', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })