import axios, { AxiosError, AxiosInstance } from 'axios'

const keyAPI =
  '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'
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.openai.com/v1',
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keyAPI}`
      }
    })
    // Add a response interceptor
    this.instance.interceptors.response.use(
      function (response) {
        // if (response.status == 401) {
        //   console.log('Hết hạn')
        // }
        return response
      },
      function (error: AxiosError) {
        // if (error.response?.status !== 422) {
        //   const data: any | undefined = error.response?.data
        //   toast.error(data)
        // }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
