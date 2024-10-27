import http from '../utils/httpOpenAI'

export const getResponseChatAI = (body: any) =>
  http.post('/chat/completions', {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content:
          'Trên thế giới có bao nhiêu nước. Nếu đây là câu hỏi về công nghệ (điện thoại, laptop, máy tính bảng, phụ kiện) thì trả lời, còn không thì trả lwoif rằng: xin lỗi đây không phải câu hỏi liên quan về công nghệ'
      }
    ]
  })
