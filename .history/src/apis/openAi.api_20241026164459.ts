import http from '../utils/httpOpenAI'

export const getResponseChatAI = () => http.post('/user/favourite')
