import http from '../utils/http'

export const deleteUser = (id: any) => http.delete(`/admin/user/${id}`)

export const updateUser = (data: any, id: number) => http.put(`/admin/user/${id}`)
