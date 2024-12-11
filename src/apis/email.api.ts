import http from '../utils/http'

export const sendMailConfirm = () => http.post('/user/sendMailConfirm')
