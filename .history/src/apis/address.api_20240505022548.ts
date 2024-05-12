// import { AuthResponse } from '../types/auth.type'
import http from '../utils/httpAddressGHN'

// interface dataDitrict {
//   province_id: number
// }

export const getAllProvince = () => http.get('/master-data/province')
export const getAllDitrict = (body: any) => http.post('/master-data/district', body)
export const getAllWard = (body: any) => http.post('/master-data/ward', body)
export const getFee = () =>
  http.get('/v2/shipping-order/fee', {
    from_district_id: 1454,
    from_ward_code: '21211',
    service_id: 53320,
    service_type_id: null,
    to_district_id: 1452,
    to_ward_code: '21012',
    height: 20,
    length: 20,
    weight: 2000,
    width: 20,
    insurance_value: 0,
    cod_failed_amount: 2000,
    coupon: null
  })
