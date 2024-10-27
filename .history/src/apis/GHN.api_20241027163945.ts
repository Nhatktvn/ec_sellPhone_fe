import http from '../utils/httpAddressGHN'

export const getServiceDelivery = (district_id: number) =>
  http.post('/v2/shipping-order/available-services', {
    shop_id: 192022,
    from_district: 3695,
    to_district: district_id
  })

export const getFeeDelivery = (district_id: number) =>
  http.post('/v2/shipping-order/fee', {
    from_district_id: 3695,
    from_ward_code: '21211',
    service_id: 53321,
    service_type_id: 2,
    to_district_id: 1452,
    to_ward_code: '21012',
    height: 50,
    length: 20,
    weight: 1000,
    width: 20,
    insurance_value: 3250000,
    cod_failed_amount: 2000,
    coupon: null
  })
