// import { AuthResponse } from '../types/auth.type'
import http from '../utils/httpAddressGHN'

// interface dataDitrict {
//   province_id: number
// }

interface dataGetFee {
  from_district_id: number
  from_ward_code: string
  service_id: number
  service_type_id: null
  to_district_id: number
  to_ward_code: string
  height: number
  length: number
  weight: number
  width: number
  insurance_value: number
  cod_failed_amount: number
  coupon: null
}

export const getAllProvince = () => http.get('/master-data/province')
export const getAllDitrict = (body: any) => http.post('/master-data/district', body)
export const getAllWard = (body: any) => http.post('/master-data/ward', body)
export const getFee = (body: dataGetFee) => http.post('/v2/shipping-order/fee', body)
