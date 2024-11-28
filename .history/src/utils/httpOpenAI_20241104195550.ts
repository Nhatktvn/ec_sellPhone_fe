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
