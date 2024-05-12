import http from '../utils/http'
interface dataAddToCart {
  quantity: number
  idProduct: number
  color: string
  storage: string
}
export const addToCart = (body: dataAddToCart) => http.post('/cart/add-cart', body)
export const getListCart = () => http.get('/user/get-cart')
export const deleteCartItem = (idCartItem: string) => http.get(`/cart/delete-items/${idCartItem}`)
