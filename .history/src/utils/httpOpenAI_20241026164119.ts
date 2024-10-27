import axios, { AxiosError, AxiosInstance } from 'axios'

class HttpAddress {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://dev-online-gateway.ghn.vn/shiip/public-api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        token: 'b02b4d89-018f-11ef-a6e6-e60958111f48',
        shopId: '192022'
      }
    })
    this.instance.interceptors.request.use(
      function (config) {
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
const httpAddress = new HttpAddress().instance
export default httpAddress
