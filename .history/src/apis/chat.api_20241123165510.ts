import http from '../utils/http'

interface requestChat {
  sessionId: string
}
export const responseGet = (requestChat: any) => http.post('/user/favourite', body)
