import Table from 'react-bootstrap/esm/Table'
import { getProducts } from '../../../apis/product.api'
import { useEffect, useState } from 'react'
function ManageProduct() {
  const [listProducts, setListProducts] = useState([])
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
            <th scope='col' className='px-6 py-3'>
              Product name
            </th>
            <th scope='col' className='px-6 py-3'>
              Color
            </th>
            <th scope='col' className='px-6 py-3'>
              Category
            </th>
            <th scope='col' className='px-6 py-3'>
              Price
            </th>
            <th scope='col' className='px-6 py-3'>
              <span className='sr-only'>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
            <td className='px-6 py-4'>1</td>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
              Apple MacBook Pro 17"
            </th>
            <td className='px-6 py-4'>Silver</td>
            <td className='px-6 py-4'>Laptop</td>
            <td className='px-6 py-4'>$2999</td>
            <td className='px-6 py-4 text-right'>
              <a href='#' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ManageProduct
