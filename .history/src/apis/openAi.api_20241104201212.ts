import http from '../utils/httpOpenAI'

export const getResponseChatAI = (message: string) =>
  http.post('/chat/completions', {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: `${message}. Nếu câu hỏi có nội dung muốn chuyển trang hoặc chuyển đến thì chỉ thông báo đã chuyển trang đó`
      }
    ]
  })
