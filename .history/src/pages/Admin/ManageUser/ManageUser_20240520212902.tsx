import Table from 'react-bootstrap/Table'
import { getListUser } from '../../../apis/profile.api'
import { User } from '../../../types/user.type'
import { useState } from 'react'
function ManageUser() {
  const [listUser, setListUser] = useState<User[]>()
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
    <div>
      <table className=' mt-4 table table-hover table-bordered '>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Username</th>
            <th scope='col'>Fullname</th>
            <th scope='col'>Phone</th>
            <th scope='col'>CreatedDate</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 ? (
            listUser.map((user, idx) => {
              return (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.fullname}</td>
                  <td>{user.phone}</td>
                  <td>{user.createdDate}</td>
                  <td className='d-flex gap-3'>
                    <button className='btn btn-secondary'>View</button>
                    <button className='btn btn-primary' onClick={() => handleClickUpdate(user)}>
                      Upadate
                    </button>
                    <button className='btn btn-danger' onClick={() => handleClickDelete(user)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={'4'} className='text-center'>
                Not found user
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageUser
