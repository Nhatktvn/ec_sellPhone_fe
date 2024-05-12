import http from '../utils/http'

export const getCategories = () => http.post('/categories')
