// import { AuthResponse } from '../types/auth.type'
import http from '../utils/httpAddressGHN'

export const getAllProvince = () => http.get('/province')
