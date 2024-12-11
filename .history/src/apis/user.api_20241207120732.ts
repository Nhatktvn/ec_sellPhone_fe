import http from '../utils/http'

export const deleteUser = (id: any) => http.delete(`/admin/user/${id}`)

export const updateUser = (data: any) => http.put(`/admin/user/${id}`)
