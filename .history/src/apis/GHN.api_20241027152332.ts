import http from '../utils/httpAddressGHN'

export const getResponseChatAI = (district_id: number) =>
  http.post('/v2/shipping-order/available-services', {
    shop_id: 885,
    from_district: 1447,
    to_district: 1442
  })

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
