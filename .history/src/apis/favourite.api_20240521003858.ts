// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const getAllFavourite = () => http.get('/user/favourite')
export const addFavourite = (idProduct: FormData) => http.post('/user/favourite', idProduct)
