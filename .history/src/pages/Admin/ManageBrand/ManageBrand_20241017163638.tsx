import React, { useState } from 'react'
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete'
import { getBrands } from '../../../apis/brand.api'

function ManageBrand() {
  const [isModal, setIsModal] = useState(false)
  const [idProductDelete, setIdProductDelete] = useState()
  const [listBrands, setListBrands] = useState([])
  const getListBrands = async () => {
    try {
      const fetchListBrand = await getBrands()
      if (fetchListBrand && fetchListBrand.status == 200) {
        console.log(fetchListBrand.data)

        setListBrands(fetchListBrand.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteProduct = async () => {
    try {
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
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
              Ngày tạo
            </th>
            <th scope='col' className='px-6 py-3'>
              Người tạo
            </th>
            <th scope='col' className='px-6 py-3'>
              <span className='sr-only'>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {listBrands &&
            listBrands.map((p: any, idx) => {
              return (
                <tr
                  key={p.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <td className='px-6 py-4'>{p.id}</td>
                  <td className='px-6 py-4'>
                    <img src={p.urlImage} className='w-[50px] h-[50px] object-cover' alt='' />
                  </td>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {p.name}
                  </th>
                  <td className='px-6 py-4'>
                    {(() => {
                      return `${p.createdDate.toString().split('T')[1].split('.')[0]} ${p.createdDate.toString().split('T')[0]}`
                    })()}
                  </td>
                  <td className='px-6 py-4'>{p.userCreated.username}</td>
                  <td className='px-6 py-4 text-right'>
                    <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3'>Edit</button>
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

export default ManageBrand
