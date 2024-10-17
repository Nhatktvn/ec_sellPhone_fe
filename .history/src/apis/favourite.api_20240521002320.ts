// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const getAllFavourite = () => http.put('user/favourite')
