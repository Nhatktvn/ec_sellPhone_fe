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
