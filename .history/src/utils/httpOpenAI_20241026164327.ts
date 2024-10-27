import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

const keyAPI =
  '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'
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/api',
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
