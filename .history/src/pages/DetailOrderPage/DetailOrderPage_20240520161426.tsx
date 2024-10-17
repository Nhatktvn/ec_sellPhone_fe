import { useParams } from 'react-router-dom'
import { getDetailOrder } from '../../apis/order.api'
import { useEffect, useState } from 'react'
import { order } from '../../types/order.type'

function DetailOrderPage() {
  const { id } = useParams()
  const [order, setOrder] = useState<order>()
  useEffect(() => {
    handleGetDetailOrder()
  }, [])
  const handleGetDetailOrder = async () => {
    try {
      const rsDetailOrder = await getDetailOrder(Number(id))
      if (rsDetailOrder && rsDetailOrder.status === 200) {
        console.log(rsDetailOrder)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(id)

  return (
    <div className='container bg-white p-2 my-5 rounded-sm'>
      <h2 className='text-2xl'>Chi tiết đơn hàng</h2>
      <div className='grid grid-cols-12 mt-4'>
        <div className='col-span-7'>
          <h3>Danh sách sản phẩm</h3>
          <div>
            {order &&
              order.cartLineItemResponseDTOs.length > 0 &&
              order.cartLineItemResponseDTOs.map((item, idx) => (
                <div key={idx} className='flex gap-4 relative border-b p-2'>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className='absolute top-1 right-1 text-xl hover:text-orange'
                  >
                    <RiDeleteBin5Fill />
                  </button>
                  <div className='w-[100px] h-[100px] border rounded-xl overflow-hidden'>
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
                            <button
                              className='border text-center py-1 px-2'
                              onClick={() => hanndleFetchUpdateQuantity('minus', item.id, item.quantity)}
                            >
                              -
                            </button>
                            <input
                              type='number'
                              value={item.quantity}
                              name=''
                              id=''
                              className='border w-[40px] text-center py-1 '
                            />
                            <button
                              className='border text-center py-1 px-2'
                              onClick={() => hanndleFetchUpdateQuantity('plus', item.id, item.quantity)}
                            >
                              +
                            </button>
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
        <div className='col-span-5'>
          <h3>Thông tin khách hàng</h3>
        </div>
      </div>
    </div>
  )
}

export default DetailOrderPage
