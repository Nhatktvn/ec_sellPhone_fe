import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface AuthState {
  roleAuth: string | null
}
const initialState: AuthState = {
  roleAuth: null
}
const roleAuthSlice = createSlice({
  name: 'roleAuth',
  initialState,
  reducers: {
    roleAuth(state, action: PayloadAction<string>) {
      state.roleAuth = action.payload
    }
  }
})
export const { roleAuth } = roleAuthSlice.actions
export default roleAuthSlice.reducer
