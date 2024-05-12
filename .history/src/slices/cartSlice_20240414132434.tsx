import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface CartState {
  countCart: number
}
const initialState: CartState = {
  countCart: 0
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
