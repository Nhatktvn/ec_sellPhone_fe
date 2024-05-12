import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { profileUser } from '../apis/profile.api'
import { useState } from 'react'

const [dataUser, setDataUser] = useState(null)
const getProfileUser = async () => {
  try {
    const getProfileUser = await profileUser()
    if (getProfileUser && getProfileUser.status == 200) {
      setDataUser(getProfileUser.data.data)
    }
  } catch (error) {
    throw error
  }
}
interface AuthState {
  isAuthenticated: boolean
  user: any | null
}
const initialState: AuthState = {
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
