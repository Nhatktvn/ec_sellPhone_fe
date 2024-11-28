import http from '../utils/httpOpenAI'

export const getResponseChatAI = (message: string) =>
  http.post('/chat/completions', {
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `${message}. Nếu câu hỏi có nội dung muốn chuyển trang thì chỉ thông báo đã chuyển trang đó`
      }
    ]
  })
