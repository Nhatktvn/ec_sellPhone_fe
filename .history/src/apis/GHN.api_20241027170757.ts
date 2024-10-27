import http from '../utils/httpAddressGHN'

export const getServiceDelivery = (district_id: number) =>
  http.post('/v2/shipping-order/available-services', {
    shop_id: 192022,
    from_district: 3695,
    to_district: district_id
  })

interface calculateFee {
  service_id: number
  to_district_id: number
  to_ward_code: string
  insurance_value: number
}
export const getFeeDelivery = (data: calculateFee) =>
  http.post('/v2/shipping-order/fee', {
    from_district_id: 3695,
    from_ward_code: '90752',
    service_id: data.service_id,
    service_type_id: 2,
    to_district_id: data.to_district_id,
    to_ward_code: data.insurance_value,
    height: 50,
    length: 20,
    weight: 2000,
    width: 20,
    insurance_value: data.insurance_value,
    cod_failed_amount: 2000,
    coupon: null
  })
