import http from '../utils/http'
export const profileUser = () => http.get<any>('/user/identification')
