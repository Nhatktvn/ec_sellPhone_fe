import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCoupon, getAllCoupon } from '../../../apis/coupon.api'
import formatToVND, { formatDateTime } from '../../../helpers/currencyFormatter'
import ModalUpdateCoupon from '../../../components/Modal/ModalUpdateCoupon'
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete'
import { toast } from 'react-toastify'

const ManageCoupon = () => {
  const [listCoupon, setListCoupon] = useState([])
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
  const [dataCouponChoose, setDataCouponChoose] = useState<any>()
  useEffect(() => {
    handleGetAllCoupon()
  }, [])
  const handleDeleteCoupon = async (idNumber: number) => {
    try {
      const fetchDeleteCoupon = await deleteCoupon(idNumber)
      if (fetchDeleteCoupon && fetchDeleteCoupon.status == 200) {
        toast.success('Xóa coupon thành công')
      }
      handleGetAllCoupon()
      setShowModalUpdate(false)
    } catch (error) {
      console.log(error)
      toast.error('Xóa coupon không thành công')
      setShowModalUpdate(false)
    }
  }
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
      <div className='m-1 flex justify-end px-5 mb-3'>
        <Link
          to={'/admin/manage-coupon/add-new'}
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
                  <td className='px-6 py-4'>{c.codeCoupon}</td>
                  <td className='px-6 py-4'>{formatToVND(c.couponValue)}</td>
                  <td className='px-6 py-4'>{formatToVND(c.minimumAmount)}</td>
                  <td className='px-6 py-4'>{c.quantity}</td>
                  <td className='px-6 py-4'>{formatDateTime(c.startTime)}</td>
                  <td className='px-6 py-4'>{formatDateTime(c.endTime)}</td>
                  <td className='px-6 py-4 flex gap-2'>
                    <button
                      onClick={() => {
                        setShowModalUpdate(!showModalUpdate)
                        setDataCouponChoose(c)
                      }}
                      className='font-medium bg-gray-400 text-white active:scale-95 duration-100 border border-gray-400 py-1 px-2 rounded-md'
                    >
                      Cập nhật
                    </button>
                    <button
                      onClick={() => setShowModalDelete(true)}
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
      {/* {isModal && (
        <ModalConfirmDelete
          setShowModal={setIsModal}
          showModal={isModal}
          handleDelete={() => handleDeleteProduct(idProductDelete)}
        />
      )} */}
      {showModalUpdate && (
        <ModalUpdateCoupon
          setShowModal={setShowModalUpdate}
          showModal={showModalUpdate}
          dataCoupon={dataCouponChoose}
          fetchData={handleGetAllCoupon}
        />
      )}
      {showModalDelete && (
        <ModalConfirmDelete
          handleDelete={() => handleDeleteCoupon(dataCouponChoose.id)}
          setShowModal={setShowModalDelete}
          showModal={showModalDelete}
        />
      )}
    </div>
  )
}

export default ManageCoupon
