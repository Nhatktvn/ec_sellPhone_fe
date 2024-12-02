import http from '../utils/http'

export const loginAccount = () => http.post('/admin/statistic')
