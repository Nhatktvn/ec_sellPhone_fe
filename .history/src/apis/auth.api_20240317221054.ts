// import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'
interface dataAuth {
  username: string
  password: string
}
interface dataResetPassword {
  codeReset: string
  email: string | null
  password: string
}
export const registerAccount = (body: dataAuth) => http.post('/registration', body)
export const loginAccount = (body: dataAuth) => http.post('/login', body)
export const forgotPassword = (email: string) => http.post(`/forgot-password?email=${email}`)
export const resetPassword = (body: dataResetPassword) => http.post('/update-password', body)
export const sendCodeActive = (email: String) => http.post(`/send-email-active?email=${email}`)
export const activeAccount = (email: String) => http.post(`/send-email-active?email=${email}`)
