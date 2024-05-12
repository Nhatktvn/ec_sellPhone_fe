import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import loadingReducer from '../slices/loadingSlice'
import forgotPasswordReducer from '../slices/forgotPasswordSlice'
import activeAccountReducer from '../slices/activeAccountSlice'
import roleAuth from '../slices/roleAuthSlice'
const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  forgotPassword: forgotPasswordReducer,
  activeAccount: activeAccountReducer,
  roleAuth: roleAuth
  // Thêm reducers khác nếu cần
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
