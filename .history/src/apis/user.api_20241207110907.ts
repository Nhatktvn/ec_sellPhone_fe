import http from '../utils/http'

export const deleteUser = (id: any) => http.delete(`/admin/user/${id}`)
