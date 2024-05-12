// import { AuthResponse } from '../types/auth.type'
import http from '../utils/httpAddressGHN'

export const registerAccount = (body: ) => http.post('/https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', body)
