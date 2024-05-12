// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const createProduct = (body: any) => http.post('/', body)
