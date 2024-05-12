import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface ForgotPasswordState {
  email: string | null
}
let initialState: ForgotPasswordState = {
  email: null
}
const fogotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    emailForgotPassword(state, action: PayloadAction<string>) {
      state.email = action.payload
    }
  }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer
