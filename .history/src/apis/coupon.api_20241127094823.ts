import http from '../utils/http'

export const addFavourite = (idProduct: FormData) => http.post('/admin/coupon')
