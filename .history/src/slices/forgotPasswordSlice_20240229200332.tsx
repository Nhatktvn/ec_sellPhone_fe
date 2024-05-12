import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface ForgotPasswordState {
  isAuthenticated: boolean
  user: any | null
}
let initialState: AuthState = {
  isAuthenticated: false,
  user: null
}
const authSlice = createSlice({
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
