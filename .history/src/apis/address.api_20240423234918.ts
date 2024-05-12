// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const registerAccount = (body: dataAuth) => http.post('/registration', body)
