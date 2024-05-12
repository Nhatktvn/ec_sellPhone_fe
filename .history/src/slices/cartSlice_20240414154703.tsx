import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cartItem } from '../types/cart.type'

interface CartState {
  countCart: number
  cartList : cartItem[] | null
}
const initialState: CartState = {
  countCart: 0,
  cartList : cartItem[]
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    countCart(state, action: PayloadAction<number>) {
      state.countCart = action.payload
    }
  }
})
export const { countCart } = cartSlice.actions
export default cartSlice.reducer