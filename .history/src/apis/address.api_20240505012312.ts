// import { AuthResponse } from '../types/auth.type'
import http from '../utils/httpAddressGHN'

// interface dataDitrict {
//   province_id: number
// }

export const getAllProvince = () => http.get('/master-data/province')
export const getAllDitrict = (body: any) => http.post('/master-data/district', body)
export const getAllWard = (body: any) => http.post('/master-data/ward', body)
export const getFee = (body: any) => http.get('/ward', body)
