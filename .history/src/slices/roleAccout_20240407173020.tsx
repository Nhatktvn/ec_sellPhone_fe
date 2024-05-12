import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface roleState {
  roleLogin: String
}
const initialState: roleState = {
  roleLogin: ''
}
const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    roleLogin(state, action: PayloadAction<String>) {
      state.roleLogin = action.payload
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
    }
  }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer
