import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface AuthState {
  roleAuth: string | null
}
const initialState: AuthState = {
  roleAuth: null
}
const authSlice = createSlice({
  name: 'roleAuth',
  initialState,
  reducers: {
    roleAuth(state, action: PayloadAction<string>) {
      state.roleAuth = action.payload
    }
  }
})
export const { roleAuth } = authSlice.actions
export default authSlice.reducer
