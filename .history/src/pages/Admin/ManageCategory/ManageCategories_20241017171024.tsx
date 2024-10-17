import { useEffect, useState } from 'react'
import { getAllCategories } from '../../../apis/category.api'
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete'

function ManageCategories() {
  const [isModal, setIsModal] = useState(false)
  const [idProductDelete, setIdProductDelete] = useState()
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

  const handleDeleteProduct = async (idProductDelete: number | undefined) => {
    try {
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='m-1 flex justify-end px-5'>
        <button className='bg-blue-500 text-white py-2 px-5 rounded-md font-bold text-base hover:bg-blue-700 transition-all duration-1000'>
          Add new
        </button>
      </div>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              #
            </th>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'>
              Tên
            </th>
            <th scope='col' className='px-6 py-3'>
              Mô tả
            </th>
            <th scope='col' className='px-6 py-3'></th>
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
                  <td className='px-6 py-4'>
                    <img src={p.urlImage} className='w-[50px] h-[30px] object-fill block' alt='' />
                  </td>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {p.name}
                  </th>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {p.description}
                  </th>

                  <td className='px-6 py-4 text-right w-max flex gap-5'>
                    <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit</button>
                    <button
                      onClick={() => {
                        setIsModal(!isModal)
                        setIdProductDelete(p.id)
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
      {isModal && <ModalConfirmDelete setShowModal={setIsModal} handleDelete={handleDeleteProduct(idProductDelete)} />}
    </div>
  )
}

export default ManageCategories
