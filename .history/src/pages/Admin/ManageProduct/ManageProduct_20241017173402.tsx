import Table from 'react-bootstrap/esm/Table'
import { deleteProductById, getProducts } from '../../../apis/product.api'
import { useEffect, useState } from 'react'
import { product } from '../../../types/product.type'
import { toast } from 'react-toastify'
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete'
function ManageProduct() {
  const [listProducts, setListProducts] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [idProductDelete, setIdProductDelete] = useState(0)
  useEffect(() => {
    getListProduct()
    console.log(listProducts)
  }, [])
  const getListProduct = async () => {
    try {
      const fetchListProduct = await getProducts()
      if (fetchListProduct && fetchListProduct.status == 200) {
        setListProducts(fetchListProduct.data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteProduct = async (idProductDelete: number) => {
    try {
      const fecthDeleteProduct = await deleteProductById(idProductDelete)
      if (fecthDeleteProduct && fecthDeleteProduct.status == 200) {
        toast.success('Xóa sản phẩm thành công!')
        setIsModal(false)
        getListProduct()
      }
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
          {listProducts &&
            listProducts.map((p: product, idx) => {
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
          handleDelete={handleDeleteProduct(idProductDelete)}
        />
      )}
    </div>
  )
}

export default ManageProduct