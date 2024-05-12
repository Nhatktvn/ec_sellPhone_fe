import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface AuthState {
  isAuthenticated: boolean
  roleAuthenticate: any
  user: any | null
}
const initialState: AuthState = {
  isAuthenticated: false,
  roleAuthenticate: null,
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
    },
    roleAuthen(state, action: PayloadAction<string>) {
      state.roleAuthenticate = action.payload
    }
  }
})
export const { login, logout, roleAuthen } = authSlice.actions
export default authSlice.reducer
