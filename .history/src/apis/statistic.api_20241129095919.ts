import http from '../utils/http'

export const getStatistic = () => http.post('/admin/statistic')
