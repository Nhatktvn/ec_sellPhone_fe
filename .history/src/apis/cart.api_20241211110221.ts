import http from '../utils/http'

interface dataUpdateQuantity {
  idCartItem: number
  quantity: number
}
export const addToCart = (body: any) => http.post('/cart/add-cart', body)
export const getListCart = () => http.get('/cart/get-cart')
export const deleteCartItem = (idCartItem: number) => http.delete(`/cart/delete-items/${idCartItem}`)
export const updateQuantityCartItem = (body: dataUpdateQuantity) => http.put('/cart/set-quantity', body)
export const checkOutStockItem = () => http.get('/cart/check-available')
