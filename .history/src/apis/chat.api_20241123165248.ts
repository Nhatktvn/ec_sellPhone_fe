import http from '../utils/http'

export const responseGet = (idProduct: FormData) =>
  http.post('/user/favourite', idProduct, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
