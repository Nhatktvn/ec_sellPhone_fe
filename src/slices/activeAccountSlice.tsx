import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface activeAccount {
  email: string | null
}
const initialState: activeAccount = {
  email: null
}
const activeAccountSlice = createSlice({
  name: 'activeAccount',
  initialState,
  reducers: {
    emailActive(state, action: PayloadAction<string>) {
      state.email = action.payload
    }
  }
})
export const { emailActive } = activeAccountSlice.actions
export default activeAccountSlice.reducer
