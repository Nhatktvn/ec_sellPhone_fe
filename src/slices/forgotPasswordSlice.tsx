import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface ForgotPasswordState {
  email: string | null
}
const initialState: ForgotPasswordState = {
  email: null
}
const fogotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    emailForgot(state, action: PayloadAction<string>) {
      state.email = action.payload
    }
  }
})
export const { emailForgot } = fogotPasswordSlice.actions
export default fogotPasswordSlice.reducer
