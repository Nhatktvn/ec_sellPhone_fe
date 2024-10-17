import React, { useEffect, useState } from 'react'
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete'
import { getBrandByCategoryName, getBrands } from '../../../apis/brand.api'
import { getAllCategories } from '../../../apis/category.api'

function ManageBrand() {
  const [isModal, setIsModal] = useState(false)
  const [listCategories, setListCategories] = useState([])
  const [idProductDelete, setIdProductDelete] = useState()
  const [listBrands, setListBrands] = useState([])
  useEffect(() => {
    getListBrands()
    getListCategories()
  }, [])
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

  const handleDeleteBrand = async () => {
    try {
      console.log('okoko')
    } catch (error) {
      console.log(error)
    }
  }

  const getListBrandByCate = async () => {
    try {
    } catch (error) {
      console.log(error)
    }
  }
  const getListCategories = async () => {
    try {
      const fetchListCate = await getAllCategories()
      if (fetchListCate && fetchListCate.status == 200) {
        setListCategories(fetchListCate.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <ul className='flex gap-4 m-2'>
        {listCategories &&
          listCategories.map((c: any, idx) => {
            return <li className='font-bold text-xl border-b-2'>{c.name}</li>
          })}
      </ul>
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
          {listBrands &&
            listBrands.map((p: any, idx) => {
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
      {isModal && <ModalConfirmDelete setShowModal={setIsModal} showModal={isModal} handleDelete={handleDeleteBrand} />}
    </div>
  )
}

export default ManageBrand
