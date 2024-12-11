import http from '../utils/http'

interface dataGetAvailable {
  color: string
  ram: number | undefined
  storage: number | undefined
  productId: number | undefined
}
export const getAvailable = (data: dataGetAvailable) => http.post('/variant/get-available', data)
export const checkStock = (name: String) => http.post(`http://localhost:8080/api/variant/check-stock?name=${name}`)
