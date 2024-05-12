// import { AuthResponse } from '../types/auth.type'
import http from '../utils/httpAddressGHN'

// interface dataDitrict {
//   province_id: number
// }

export const getAllProvince = () => http.get('/province')
export const getAllDitrict = (body: any) => http.post('/district', body)
export const getAllWard = (body: any) => http.post('/district', body)
