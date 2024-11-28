import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/user.type'
// interface dataUser {
//   birthDate: string | null
//   email: string | null
//   fullName: string | null
//   phone: string | null
//   urlAvatar: string | null
// }
interface AuthState {
  isAuthenticated: boolean
  user: User | null
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: null
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      console.log(action.payload)

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
