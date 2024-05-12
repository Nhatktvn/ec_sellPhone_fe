import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface CartState {
  isAuthenticated: boolean
  user: any | null
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: null
}
const cartSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<object>) {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
    }
  }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer
