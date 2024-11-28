import { Link, useLocation, useParams } from 'react-router-dom'
import { getDetailOrder, getDetailOrderByCodeOrder } from '../../apis/order.api'
import { useEffect, useState } from 'react'
import { order } from '../../types/order.type'
import ModalReview from '../../components/ModalReviews/ModalReview'
import { IoReturnDownBack } from 'react-icons/io5'
import { formatDateTime } from '../../helpers/currencyFormatter'

function DetailOrderPage() {
  const { id } = useParams()
  const location = useLocation()
  const order: any = location.state.inforOrder
  const [showModalReview, setShowModalReview] = useState<boolean>(false)
  const sumItemOrder = order?.cartLineItemResponseDTOs.reduce((accumulator: any, currentValue: any) => {
    return accumulator + currentValue.quantity
  }, 0)
  return (
    <div className='container p-2 my-5 rounded-sm'>
      <Link to={'/don-hang'} className='mb-2 flex items-center gap-2 text-blue-500'>
        <IoReturnDownBack className='text-2xl' />
        <span className='text-md'>Trở lại trang đơn hàng</span>
      </Link>
      <h2 className='text-3xl font-bold'>Chi tiết đơn hàng</h2>
      <div className='grid grid-cols-12 mt-4 gap-4'>
        <div className='lg:col-span-8 col-span-12 lg:h-max   bg-white p-2 rounded-md'>
          <h3 className='font-bold text-lg'>Danh sách sản phẩm</h3>
          <div className='max-h-[500px] scroll-cart-details'>
            {order &&
              order.cartLineItemResponseDTOs.length > 0 &&
              order.cartLineItemResponseDTOs.map((item: any, idx: any) => (
                <div key={idx} className='flex gap-4 relative p-2'>
                  <div className='w-[100px] h-[100px]'>
                    <img src={item.urlImage} alt='' />
                  </div>
                  <div className='w-full grid grid-cols-12'>
                    <div className='flex flex-col col-span-8'>
                      <h4 className='text-xl font-bold'>{item.name}</h4>
                      <div className='gap-4 text-sm grid grid-cols-12'>
                        <div className='col-span-4'>
                          <p>Màu sắc</p>
                          <div className='py-1 px-2 rounded-full border w-max'>{item.color}</div>
                        </div>
                        <div className='col-span-4'>
                          <p>Dung lượng</p>
                          <div className='py-1 px-2 rounded-full border w-max'>{item.storageCapacity}</div>
                        </div>
                        <div className='col-span-4'>
                          <p>Số lượng</p>
                          <div>
                            <input
                              type='number'
                              value={item.quantity}
                              name=''
                              id=''
                              className='border w-[40px] text-center py-1 '
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-end col-span-4 justify-center'>
                      <p className='text-xl text-red-600 font-bold'>{formatToVND(item.sellPrice * item.quantity)}</p>
                      <p className='text-end line-through text-gray-500'>
                        {formatToVND(item.originalPrice * item.quantity)}
                      </p>
                      {order.statusOrder === 'Đã nhận được hàng' && (
                        <button
                          className='bg-blue-600 p-2 text-white rounded-md'
                          onClick={() => setShowModalReview(true)}
                        >
                          Đánh giá
                        </button>
                      )}
                      {showModalReview && <ModalReview setShowModal={setShowModalReview} productId={item.productId} />}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='lg:col-span-4 col-span-12 bg-white p-2 rounded-md h-max'>
          <h3 className='font-bold text-xl'>Thông tin khách hàng</h3>
          <div className='mt-2 flex flex-col gap-2'>
            <p>
              <span className='font-bold'>Tên: </span>
              {order?.name}
            </p>
            <p>
              <span className='font-bold'>Số điện thoại: </span>
              {order?.phone}
            </p>
            <p>
              <span className='font-bold'>Địa chỉ: </span>
              {order?.address}
            </p>
            <p>
              <span className='font-bold'>Thời gian đặt hàng: </span>
              {formatDateTime(order.deliveryTime)}
            </p>
            <p>
              <span className='font-bold'>Số lượng sản phẩm: </span>
              {sumItemOrder}
            </p>
            <p>
              <span className='font-bold'>Trạng thái đơn hàng: </span>
              {order?.status}
            </p>
            <p>
              <span className='font-bold'>Trạng thái thanh toán: </span>
              {order?.vnPayResponseDTO ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </p>
            <p className='text-2xl text-orange font-bold'>
              <span className='text-base text-black'>Tổng tiền: </span>
              {order && formatToVND(order.totalPrice)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailOrderPage
function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((number / 1000) * 1000)
}
