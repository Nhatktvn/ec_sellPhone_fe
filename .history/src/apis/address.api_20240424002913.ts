// import { AuthResponse } from '../types/auth.type'
import http from '../utils/httpAddressGHN'

// interface dataDitrict {
//   province_id: number
// }

export const getAllProvince = () => http.get('/province')
export const getGetDitrict = (body: any) => http.get('/district', body)
