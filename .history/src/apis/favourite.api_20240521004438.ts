// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const getAllFavourite = () => http.get('/user/favourite')
export const addFavourite = (idProduct: number) => http.post('/user/favourite', { idProduct })
export const deleteFavourite = (idProduct: number) => http.delete('/user/favourite', { idProduct })
