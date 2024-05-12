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
    countCart(state, action: PayloadAction<cartItem[]>) {
      console.log([action.payload])

      state.countCart = action.payload.length

      console.log(state.countCart)

      state.cartList = action.payload
    }
  }
})
export const { countCart } = cartSlice.actions
export default cartSlice.reducer
