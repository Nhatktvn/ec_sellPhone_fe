import http from '../utils/http'

export const getCategories = () => http.get('/categories-sort')
export const deleteCategoryById = (id: string) => http.get('/categories-sort')
