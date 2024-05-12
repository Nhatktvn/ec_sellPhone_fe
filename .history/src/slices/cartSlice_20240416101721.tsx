import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cartItem } from '../types/cart.type'

interface CartState {
  countCart: number
  cartItems: cartItem[] | undefined
}
const initialState: CartState = {
  countCart: 0,
  cartItems: undefined
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartList(state, action: PayloadAction<cartItem[]>) {
      state.countCart = action.payload.length
      state.cartItems = action.payload
    }
  }
})
export const { cartList } = cartSlice.actions
export default cartSlice.reducer
