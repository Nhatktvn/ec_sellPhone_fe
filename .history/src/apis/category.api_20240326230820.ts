import http from '../utils/http'

export const getCategories = () => http.get('/categories-sort')
