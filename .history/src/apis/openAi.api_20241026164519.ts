import http from '../utils/httpOpenAI'

export const getResponseChatAI = (body: any) => http.post('/chat/completions', body)
