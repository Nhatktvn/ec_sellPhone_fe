import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCoupon } from '../../../apis/coupon.api'

const ManageCoupon = () => {
  const [listCoupon, setListCoupon] = useState([])
  useEffect(() => {
    handleGetAllCoupon()
  }, [])
  const handleGetAllCoupon = async () => {
    try {
      const fetchDataCoupon = await getAllCoupon()
      if (fetchDataCoupon && fetchDataCoupon.status == 200) {
        console.log(fetchDataCoupon)

        setListCoupon(fetchDataCoupon.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='m-1 flex justify-end px-5'>
        <Link
          to={'/admin/manage-coupon/add-new'}
          className='bg-blue-500 text-white py-2 px-5 rounded-md font-bold text-base hover:bg-blue-700 transition duration-75'
        >
          Add new
        </Link>
      </div>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              #
            </th>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'>
              Mã coupon
            </th>
            <th scope='col' className='px-6 py-3'>
              Trị giá
            </th>
            <th scope='col' className='px-6 py-3'>
              Đơn tối thiểu
            </th>
            <th scope='col' className='px-6 py-3'>
              Số lượng
            </th>
            <th scope='col' className='px-6 py-3'>
              Bắt đầu
            </th>
            <th scope='col' className='px-6 py-3'>
              Kết thúc
            </th>
            <th scope='col' className='px-6 py-3'>
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody>
          {listCoupon &&
            listCoupon.map((c: any, idx) => {
              return (
                <tr
                  key={c.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <td className='px-6 py-4'>{idx + 1}</td>
                  <td className='px-6 py-4'>{c.}</td>
                  <td className='px-6 py-4 text-right'>
                    <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3'>Edit</button>
                    <button className='font-medium text-red-600 dark:text-blue-500 hover:underline'>Delete</button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      {/* {isModal && (
        <ModalConfirmDelete
          setShowModal={setIsModal}
          showModal={isModal}
          handleDelete={() => handleDeleteProduct(idProductDelete)}
        />
      )} */}
    </div>
  )
}

export default ManageCoupon
