// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const getAllFavourite = () => http.get('/user/favourite')
export const addFavourite = () => http.post('/user/favourite')
