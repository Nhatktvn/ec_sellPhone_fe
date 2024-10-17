import http from '../utils/http'
export const getProfile = () => http.get('/user/identification')
export const getListUser = () => http.get('/admin/get-users')
