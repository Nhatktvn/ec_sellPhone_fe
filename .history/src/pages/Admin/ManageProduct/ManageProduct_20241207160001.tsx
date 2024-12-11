import { deleteProductById, getProductFilter, getProducts } from '../../../apis/product.api'
import { useEffect, useState } from 'react'
import { product } from '../../../types/product.type'
import { toast } from 'react-toastify'
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete'
import { Link } from 'react-router-dom'
import { getAllCategories } from '../../../apis/category.api'
function ManageProduct() {
  const [listProducts, setListProducts] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [idProductDelete, setIdProductDelete] = useState(0)
  const [listCategories, setListCategories] = useState([])
  const [idCateSelect, setIdCateSelect] = useState()
  const [inputSearch, setInputSearch] = useState<string>('')
  useEffect(() => {
    // getListProduct()
    getListCategories()
    getProductByCateIdAndNameSearch()
  }, [])
  console.log(listProducts)

  // const getListProduct = async () => {
  //   try {
  //     const fetchListProduct = await getProducts()
  //     console.log(fetchListProduct)

  //     if (fetchListProduct && fetchListProduct.status == 200) {
  //       setListProducts(fetchListProduct.data)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleDeleteProduct = async (idProductDelete: number) => {
    try {
      const fecthDeleteProduct = await deleteProductById(idProductDelete)
      if (fecthDeleteProduct && fecthDeleteProduct.status == 200) {
        toast.success('Xóa sản phẩm thành công!')
        setIsModal(false)
        // getListProduct()
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
        setIdCateSelect(fetchListCate.data[0].id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getProductByCateIdAndNameSearch = async () => {
    try {
      const query = `?category=${idCateSelect}&maxPrice=50000000&search=${inputSearch}`
      const getProduct = await getProductFilter(query)
      if (getProduct && getProduct.status == 200) {
        setListProducts(getProduct.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='m-1 flex justify-end px-5'>
        <Link
          to={'/admin/manage-products/add-new'}
          className='bg-blue-500 text-white py-2 px-5 rounded-md font-bold text-base hover:bg-blue-700 transition duration-75'
        >
          Add new
        </Link>
      </div>
      <ul className='flex gap-4 m-2'>
        {listCategories &&
          listCategories.map((c: any) => {
            if (idCateSelect == c.id) {
              return (
                <li className='font-bold text-xl border-b-4 border-blue-600 text-blue-600 cursor-pointer'>{c.name}</li>
              )
            }
            return (
              <li
                onClick={() => {
                  setIdCateSelect(c.id)
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
          {listProducts &&
            listProducts.map((p: product) => {
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
      {isModal && (
        <ModalConfirmDelete
          setShowModal={setIsModal}
          showModal={isModal}
          handleDelete={() => handleDeleteProduct(idProductDelete)}
        />
      )}
    </div>
  )
}

export default ManageProduct
