import http from '../utils/http'

export const getStatistic = () => http.get('/admin/statistic')
export const getSalesByYear = (year: any) => http.get(`/admin/get-sale-year?year=${year}`)
export const getOrderByYear = (year: any) => http.get(`/admin/get-order-year?year=${year}`)
