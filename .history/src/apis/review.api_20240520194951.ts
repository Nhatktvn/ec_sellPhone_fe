import http from '../utils/http'
export const addReview = (data: FormData) =>
  http.post('/user/reviews/create-review', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
