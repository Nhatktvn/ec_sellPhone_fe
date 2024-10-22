import http from '../utils/http'

interface dataGetAvailable {
  color: string
  storage: string
  productId: number
}
export const getAvailable = (data: dataGetAvailable) => http.post('/variant/get-available', data)
