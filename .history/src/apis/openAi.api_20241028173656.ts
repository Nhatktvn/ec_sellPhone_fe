import http from '../utils/httpOpenAI'

export const getResponseChatAI = (message: string) =>
  http.post('/chat/completions', {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: `${message}. Nếu câu hỏi trên là câu hỏi về công nghệ (laptop, điện thoại, phụ kiện, máy tính bảng) thì trả lời, còn không thì trả lời xin lỗi, vui lòng hỏi những câu liên quan đến công nghệ. Còn nếu câu hỏi yêu cầu chuyển trang thì thông báo chuyển trang người dùng yêu cầu thành công`
      }
    ]
  })
