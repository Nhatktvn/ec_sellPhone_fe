import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface AuthState {
  isAuthenticated: boolean
  roleAuthenticate: String | null
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
    roleAuthen(state, action: PayloadAction<String>) {
      state.roleAuthenticate = action.payload
    }
  }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer
