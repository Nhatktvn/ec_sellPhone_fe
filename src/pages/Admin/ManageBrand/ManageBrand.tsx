import React, { useEffect, useState } from 'react'
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete'
import { deleteBrandById, getBrandByCategoryName, getBrands } from '../../../apis/brand.api'
import { getAllCategories } from '../../../apis/category.api'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

function ManageBrand() {
  const dispatch = useDispatch()
  const [isModal, setIsModal] = useState(false)
  const [listCategories, setListCategories] = useState([])
  const [idBrandDelete, setIdBrandDelete] = useState()
  const [nameCateSelect, setNameCateSelect] = useState('')
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

  const handleDeleteBrand = async (idBrandDelete: number | undefined) => {
    try {
      const fetchDeleteBrand = await deleteBrandById(idBrandDelete)
      if (fetchDeleteBrand && fetchDeleteBrand.status == 200) {
        toast.success('Xóa Brand thành công!')
        getListBrandByCate(nameCateSelect)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getListBrandByCate = async (name: string) => {
    try {
      console.log('get brand by cate')

      const fecthListBrandByCate = await getBrandByCategoryName(name)
      if (fecthListBrandByCate && fecthListBrandByCate.status == 200) {
        setListBrands(fecthListBrandByCate.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getListCategories = async () => {
    try {
      const fetchListCate = await getAllCategories()
      if (fetchListCate && fetchListCate.status == 200) {
        setListCategories(fetchListCate.data)
        setNameCateSelect(fetchListCate.data[0].name)
        getListBrandByCate(fetchListCate.data[0].name)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='m-1 flex justify-end px-5'>
        <Link
          to={'/admin/manage-brand/add-new'}
          className='bg-blue-500 text-white py-2 px-5 rounded-md font-bold text-base hover:bg-blue-700 transition duration-75'
        >
          Add new
        </Link>
      </div>
      <ul className='flex gap-4 m-2'>
        {listCategories &&
          listCategories.map((c: any, idx) => {
            if (nameCateSelect == c.name) {
              return (
                <li className='font-bold text-xl border-b-4 border-blue-600 text-blue-600 cursor-pointer'>{c.name}</li>
              )
            }
            return (
              <li
                onClick={() => {
                  setNameCateSelect(c.name)
                  getListBrandByCate(c.name)
                }}
                className='font-bold text-xl cursor-pointer'
              >
                {c.name}
              </li>
            )
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
          {listBrands && listBrands.length > 0 ? (
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
                        setIdBrandDelete(p.id)
                      }}
                      className='font-medium text-red-600 dark:text-blue-500 hover:underline'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <h3 className=' m-3'>Không có dữ liệu</h3>
          )}
        </tbody>
      </table>
      {isModal && (
        <ModalConfirmDelete
          setShowModal={setIsModal}
          showModal={isModal}
          handleDelete={() => handleDeleteBrand(idBrandDelete)}
        />
      )}
    </div>
  )
}

export default ManageBrand
