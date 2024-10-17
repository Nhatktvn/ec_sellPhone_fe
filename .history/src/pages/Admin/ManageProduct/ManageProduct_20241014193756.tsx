import Table from 'react-bootstrap/esm/Table'
import { getProducts } from '../../../apis/product.api'
import { useEffect, useState } from 'react'
import { product } from '../../../types/product.type'
function ManageProduct() {
  const [listProducts, setListProducts] = useState([])
  const [isModal, setIsModal] = useState(false)
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
                      onClick={() => setIsModal(!isModal)}
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
      <div
        id='popup-modal'
        tabIndex={-1}
        className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
      >
        <div className='relative p-4 w-full max-w-md max-h-full'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <button
              type='button'
              className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-hide='popup-modal'
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span onClick={() => setIsModal(false)} className='sr-only'>
                Close modal
              </span>
            </button>
            <div className='p-4 md:p-5 text-center'>
              <svg
                className='mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this product?
              </h3>
              <button
                data-modal-hide='popup-modal'
                type='button'
                className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide='popup-modal'
                type='button'
                className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageProduct
