import { useParams } from 'react-router-dom'
import { getDetailOrder } from '../../apis/order.api'
import { useEffect, useState } from 'react'
import { order } from '../../types/order.type'

function DetailOrderPage() {
  const { id } = useParams()
  const [order, setOrder] = useState<order>()
  const sumItemOrder = order?.cartLineItemResponseDTOs.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity
  }, 0)
  useEffect(() => {
    handleGetDetailOrder()
  }, [])
  const handleGetDetailOrder = async () => {
    try {
      const rsDetailOrder = await getDetailOrder(Number(id))
      if (rsDetailOrder && rsDetailOrder.status === 200) {
        console.log(rsDetailOrder)
        setOrder(rsDetailOrder.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(id)

  return (
    <div className='container p-2 my-5 rounded-sm'>
      <h2 className='text-3xl font-bold'>Chi tiết đơn hàng</h2>
      <div className='grid grid-cols-12 mt-4 gap-4'>
        <div className='col-span-8 bg-white p-2 rounded-md'>
          <h3 className='font-bold text-lg'>Danh sách sản phẩm</h3>
          <div>
            {order &&
              order.cartLineItemResponseDTOs.length > 0 &&
              order.cartLineItemResponseDTOs.map((item, idx) => (
                <div key={idx} className='flex gap-4 relative p-2'>
                  <div className='w-[100px] h-[100px]'>
                    <img src={item.urlImage} alt='' />
                  </div>
                  <div className='w-full'>
                    <h4 className='text-xl font-bold'>{item.name}</h4>
                    <div className='flex mt-2 justify-between'>
                      <div className='gap-4 text-sm grid grid-cols-12'>
                        <div className='col-span-3'>
                          <p>Màu sắc</p>
                          <div className='py-1 px-2 rounded-full border w-max'>{item.color}</div>
                        </div>
                        <div className='col-span-3'>
                          <p>Dung lượng</p>
                          <div className='py-1 px-2 rounded-full border w-max'>{item.storageCapacity}</div>
                        </div>
                        <div className='col-span-3'>
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
                      <div>
                        <p className='text-xl text-red-600 font-bold'>{formatToVND(item.sellPrice * item.quantity)}</p>
                        <p className='text-end line-through text-gray-500'>
                          {formatToVND(item.originalPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='col-span-4 bg-white p-2 rounded-md'>
          <h3 className='font-bold text-xl'>Thông tin khách hàng</h3>
          <div className='mt-2 flex flex-col gap-2'>
            <p>
              Tên: <span>{order?.name}</span>
            </p>
            <p>
              Số điện thoại: <span>{order?.phone}</span>
            </p>
            <p>
              Địa chỉ: <span>{order?.address}</span>
            </p>
            <p>
              Thời gian đặt hàng: <span>{order?.deliveryTime?.toString()}</span>
            </p>
            <p>
              Số lượng sản phẩm: <span>{sumItemOrder}</span>
            </p>
            <p>
              Trạng thái đơn hàng: <span>{order?.statusOrder}</span>
            </p>
            <p>
              Trạng thái thanh toán: <span>{order?.vnPayResponseDTO ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
            </p>
            <p>
              Tổng tiền: <span>{formatToVND(order?.totalPrice)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailOrderPage
function formatToVND(number: number | undefined) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((number / 1000) * 1000)
}
