import http from '../utils/httpOpenAI'

export const getResponseChatAI = (message: string) =>
  http.post('/chat/completions', {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: `${message}. Nếu câu hỏi trên là một yêu cầu điều hướng trang hay chuyển trang thì trả lời "Chuyển đến trang" mà người dùng yêu cầu thành công`
      }
    ]
  })
