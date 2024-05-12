import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cartItem } from '../types/cart.type'

interface CartState {
  countCart: number
  cartList: cartItem[] | undefined
}
const initialState: CartState = {
  countCart: 0,
  cartList: undefined
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    Cart(state, action: PayloadAction<cartItem[]>) {
      state.countCart = action.payload.length
      state.cartList = action.payload
    }
  }
})
export const { countCart } = cartSlice.actions
export default cartSlice.reducer
