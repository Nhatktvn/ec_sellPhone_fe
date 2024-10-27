import http from '../utils/httpAddressGHN'

export const getResponseChatAI = (district_id: number) => http.post()

export const getResponseChatAI = (message: string) =>
  http.post('/chat/completions', {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: message
      }
    ]
  })
