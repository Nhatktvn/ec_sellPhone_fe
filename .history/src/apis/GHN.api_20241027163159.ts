import http from '../utils/httpAddressGHN'

export const getServiceDelivery = (district_id: number) =>
  http.post('/v2/shipping-order/available-services', {
    shop_id: 192022,
    from_district: 3695,
    to_district: district_id
  })
