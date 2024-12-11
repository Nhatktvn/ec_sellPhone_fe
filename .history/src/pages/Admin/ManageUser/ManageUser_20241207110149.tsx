import { getListUser } from '../../../apis/profile.api'
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete'
import { formatDateTime } from '../../../helpers/currencyFormatter'
import { User } from '../../../types/user.type'
import { useEffect, useState } from 'react'
function ManageUser() {
  const [listUser, setListUser] = useState<User[]>()
  const [isModal, setIsModal] = useState(false)
  const [idUserDelete, setIdUserDelete] = useState(0)
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

  const handleDeleteUser = (idUserDelete: any) => {}
  return (
    <div className='p-4'>
      <table className=' mt-4 table table-hover table-bordered w-full'>
        <thead>
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
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              #
            </th>
            <th scope='col' className='px-6 py-3'>
              Tài khoản
            </th>
            <th scope='col' className='px-6 py-3'>
              Tên
            </th>
            <th scope='col' className='px-6 py-3'>
              Số điện thoại
            </th>
            <th scope='col' className='px-6 py-3'>
              Ngày tạo
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.map((p: any, idx: any) => {
              return (
                <tr
                  key={p.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <td className='px-6 py-4'>{idx + 1}</td>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {p.username}
                  </th>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {p.fullname || 'Chưa cập nhật'}
                  </th>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {p.phone || 'Chưa cập nhật'}
                  </th>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {formatDateTime(p.createdDate) || 'Chưa cập nhật'}
                  </th>
                  <td className='px-6 py-4 text-right w-max flex gap-5'>
                    <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit</button>
                    <button
                      onClick={() => {
                        console.log('delete')
                        console.log(isModal)

                        setIsModal(!isModal)
                        setIdUserDelete(p.id)
                      }}
                      className='font-medium text-red-600 dark:text-blue-500 hover:underline'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      {isModal && (
        <ModalConfirmDelete
          setShowModal={setIsModal}
          showModal={isModal}
          handleDelete={() => handleDeleteUser(idUserDelete)}
        />
      )}
    </div>
  )
}

export default ManageUser
