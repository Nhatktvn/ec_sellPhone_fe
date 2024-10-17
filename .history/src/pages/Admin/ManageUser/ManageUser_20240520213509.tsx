import Table from 'react-bootstrap/Table'
import { getListUser } from '../../../apis/profile.api'
import { User } from '../../../types/user.type'
import { useEffect, useState } from 'react'
function ManageUser() {
  const [listUser, setListUser] = useState<User[]>()
  useEffect(() => {
    fetchGetUsers()
  }, [])
  const fetchGetUsers = async () => {
    try {
      const rsGetListUser = await getListUser()
      if (rsGetListUser && rsGetListUser.status === 200) {
        setListUser(rsGetListUser.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='p-4'>
      <table className=' mt-4 table table-hover table-bordered w-full'>
        <thead className='mt-2'>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Username</th>
            <th scope='col'>Fullname</th>
            <th scope='col'>Phone</th>
            <th scope='col'>CreatedDate</th>
            <th scope='col'>Acction</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 ? (
            listUser.map((user, idx) => {
              return (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.fullname}</td>
                  <td>{user.phone}</td>
                  <td>{user.createdDate}</td>
                  <td className='flex gap-4 justify-center'>
                    <button className='p-2 bg-gray-600 rounded-md text-white font-bold'>View</button>
                    <button className='p-2 bg-blue-600 rounded-md text-white font-bold'>Upadate</button>
                    <button className='p-2 bg-red-600 rounded-md text-white font-bold'>Delete</button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td className='text-center'>Not found user</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageUser
