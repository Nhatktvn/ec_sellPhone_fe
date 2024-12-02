import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://14.225.203.213/:8080/api',
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem('accessToken')

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

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
