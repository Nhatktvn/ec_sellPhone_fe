import http from '../utils/http'

export const getStatistic = () => http.get('/admin/statistic')
export const getSalesByYear = () => http.get('/admin/get-sale-year?year=2024')
