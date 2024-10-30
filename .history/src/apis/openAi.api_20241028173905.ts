import http from '../utils/httpOpenAI'

export const getResponseChatAI = (message: string) =>
  http.post('/chat/completions', {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: `${message}. Nếu câu hỏi yêu cầu chuyển trang thì thông báo đã chuyển trang đó
      }
    ]
  })
