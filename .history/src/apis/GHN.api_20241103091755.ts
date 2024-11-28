import { cartItem } from '../types/cart.type'
import { product } from '../types/product.type'
import http from '../utils/httpAddressGHN'

export const getServiceDelivery = (district_id: number) =>
  http.post('/v2/shipping-order/available-services', {
    shop_id: 192022,
    from_district: 3695,
    to_district: district_id
  })

interface calculateFee {
  service_id: number
  service_type_id: number
  to_district_id: number
  to_ward_code: string
  insurance_value: number
}
export const getFeeDelivery = (data: calculateFee) =>
  http.post('/v2/shipping-order/fee', {
    from_district_id: 3695,
    from_ward_code: '90752',
    service_id: data.service_id,
    service_type_id: data.service_type_id,
    to_district_id: data.to_district_id,
    to_ward_code: data.to_ward_code,
    height: 50,
    length: 20,
    weight: 1000,
    width: 20,
    insurance_value: 0,
    cod_failed_amount: 2000,
    coupon: null
  })

interface createOrder {
  to_name: string
  to_phone: string
  to_address: string
  to_ward_code: string
  to_district_id: number
  service_id: number
  service_type_id: number
  cod_amount: number
  items: any[]
}
export const createOrderGHN = (data: createOrder) =>
  http.post('/v2/shipping-order/create', {
    payment_type_id: 2,
    note: 'Tintest 123',
    required_note: 'CHOXEMHANGKHONGTHU',
    from_name: 'MinhNhatPhone',
    from_phone: '0378025713',
    from_address: 'Vinhome Grand Park Quận 9, Tp.Hồ Chí Minh, Việt Nam',
    from_ward_name: 'Phường Long Thạnh Mỹ',
    from_district_name: 'Thành phố Thủ Đức',
    from_province_name: 'HCM',
    return_phone: '0378025713',
    return_address: 'Vinhome Grand Park Quận 9, Tp.Hồ Chí Minh, Việt Nam',
    return_district_id: null,
    return_ward_code: '',
    client_order_code: '',
    to_name: data.to_name,
    to_phone: data.to_phone,
    to_address: data.to_address,
    to_ward_code: data.to_ward_code,
    to_district_id: data.to_district_id,
    cod_amount: data.cod_amount,
    content: 'Theo Viet Nam Times',
    height: 50,
    length: 20,
    weight: 1000,
    width: 20,
    pick_station_id: data.to_district_id,
    deliver_station_id: null,
    insurance_value: 0,
    service_id: data.service_id,
    service_type_id: data.service_type_id,
    coupon: null,
    pick_shift: [2],
    items: data.items
  })

export const getStatusOrderGHNByCodeOrder = (data: string) => http.post('/v2/shipping-order/detail', data)
