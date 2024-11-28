import http from '../utils/http'

interface requestChat {
  sessionId: string
  message: string
}
export const responseGet = (requestChat: requestChat) => http.post('/user/favourite', requestChat)
