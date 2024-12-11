import { toast } from 'react-toastify'
import { getListUser } from '../../../apis/profile.api'
import { deleteUser } from '../../../apis/user.api'
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete'
import { formatDateTime } from '../../../helpers/currencyFormatter'
import { User } from '../../../types/user.type'
import { useEffect, useState } from 'react'
function ManageUser() {
  const [listUser, setListUser] = useState<User[]>()
  const [isModalDelete, setIsModalDelete] = useState(false)
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [idUserChoose, setIdUserChoose] = useState(0)
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

  const handleDeleteUser = async (idUserDelete: any) => {
    try {
      const fetchDeleteUser = await deleteUser(idUserDelete)

      if (fetchDeleteUser && fetchDeleteUser.status == 200) {
        console.log(fetchDeleteUser)
        toast.success('Xóa người dùng thành công')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='p-4'>
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
                    <button
                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                      onClick={() => {
                        setIsModalEdit(!isModalEdit)
                        setIdUserChoose(p.id)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setIsModalDelete(!isModalDelete)
                        setIdUserChoose(p.id)
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
      {isModalDelete && (
        <ModalConfirmDelete
          setShowModal={setIsModalDelete}
          showModal={isModalDelete}
          handleDelete={() => handleDeleteUser(setIdUserChoose)}
        />
      )}
      {isModalDelete && (
        <ModalConfirmDelete
          setShowModal={setIsModalDelete}
          showModal={isModalDelete}
          handleDelete={() => handleDeleteUser(setIdUserChoose)}
        />
      )}
    </div>
  )
}

export default ManageUser
