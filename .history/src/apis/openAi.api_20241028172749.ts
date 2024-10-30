import http from '../utils/httpOpenAI'

export const getResponseChatAI = (message: string) =>
  http.post('/chat/completions', {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: `${message}. Nếu người dùng hỏi câu điều hướng trang hay chuyển trang thì trả lời "Chuyển đến trang" mà người dùng yêu cầu thành công`
      }
    ]
  })
