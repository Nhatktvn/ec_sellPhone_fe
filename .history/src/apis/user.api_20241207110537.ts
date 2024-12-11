import http from '../utils/http'

export const deleteUser = (id: any) => http.post(`/admin/user/${id}`)
