import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { profileUser } from '../apis/profile.api'
import { useEffect, useState } from 'react'

interface AuthState {
  isAuthenticated: boolean
  user: any | null
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: null
}
// const getProfileUser = async () => {
//   try {
//     const getProfileUser = await profileUser()
//     if (getProfileUser && getProfileUser.status == 200) {
//       initialState.user(getProfileUser.data.data)
//       initialState.isAuthenticated = true
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// useEffect(() => {
//   if (localStorage.getItem('accessToken')) {
//     getProfileUser()
//   }
// }, [])
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
