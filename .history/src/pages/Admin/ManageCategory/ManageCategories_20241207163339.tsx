import { useEffect, useState } from 'react'
import { deleteCategoryById, getAllCategories } from '../../../apis/category.api'
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function ManageCategories() {
  const [isModal, setIsModal] = useState(false)
  const [idCateDelete, setIdCateDelete] = useState(0)
  const [listCategories, setListCategories] = useState([])
  useEffect(() => {
    getListCategories()
  }, [])
  const getListCategories = async () => {
    try {
      const fetchListBrand = await getAllCategories()
      if (fetchListBrand && fetchListBrand.status == 200) {
        console.log(fetchListBrand.data)

        setListCategories(fetchListBrand.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteCategory = async (idCateDelete: number) => {
    try {
      const fetchDeleteCate = await deleteCategoryById(idCateDelete)
      if (fetchDeleteCate && fetchDeleteCate.status == 200) {
        toast.success('Xóa danh mục thành công!')
        getListCategories()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='m-1 flex justify-end px-5'>
        <Link
          to={'/admin/manage-categories/add-new'}
          className='bg-blue-500 text-white py-2 px-5 rounded-md font-bold text-base hover:bg-blue-700 transition duration-75'
        >
          Thêm
        </Link>
      </div>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              #
            </th>
            <th scope='col' className='px-6 py-3'>
              Tên
            </th>
            <th scope='col' className='px-6 py-3'>
              Mô tả
            </th>
            <th scope='col' className='px-6 py-3'>
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody>
          {listCategories &&
            listCategories.map((p: any, idx) => {
              return (
                <tr
                  key={p.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <td className='px-6 py-4'>{idx + 1}</td>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {p.name}
                  </th>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {p.description}
                  </th>

                  <td className='px-6 py-4 text-right w-max flex gap-5'>
                    <button className='font-medium bg-gray-400 text-white active:scale-95 duration-100 border border-gray-400 py-1 px-2 rounded-md'>
                      Cập nhật
                    </button>
                    <button
                      onClick={() => {
                        console.log('delete')
                        console.log(isModal)

                        setIsModal(!isModal)
                        setIdCateDelete(p.id)
                      }}
                      className='font-medium text-white bg-red-600 py-1 px-2 rounded-md active:scale-95 duration-100'
                    >
                      Xóa
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
          handleDelete={() => handleDeleteCategory(idCateDelete)}
        />
      )}
    </div>
  )
}

export default ManageCategories
