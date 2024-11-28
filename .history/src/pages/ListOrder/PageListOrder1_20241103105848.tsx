import React, { useEffect, useState } from 'react'
import { FiEye, FiAlertCircle } from 'react-icons/fi'
import { getListOrder } from '../../apis/order.api'
import { order } from '../../types/order.type'
import { getStatusOrderGHNByCodeOrder } from '../../apis/GHN.api'
import formatToVND, { formatDateTime } from '../../helpers/currencyFormatter'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const PageListOrder1 = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [listOrder, setListOrder] = useState<any>([])
  const [statusOrder, setStatusOrder] = useState('')
  useEffect(() => {
    fetchListOrderByUser()
  }, [])

  useEffect(() => {
    addStatusOrderToListOrder()
  }, [listOrder])

  const fetchListOrderByUser = async () => {
    try {
      const rsGetListOrder = await getListOrder()
      if (rsGetListOrder && rsGetListOrder.status === 200) {
        const sortOrders: any = rsGetListOrder.data.sort((a: order, b: order) => b.id - a.id)
        setListOrder(sortOrders)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const addStatusOrderToListOrder = async () => {
    listOrder &&
      listOrder.map(async (order: any, idx: any) => {
        console.log('get status')
        try {
          const data = {
            order_code: order.codeOrder
          }
          const apiGetStatusOrder = await getStatusOrderGHNByCodeOrder(data)
          if (apiGetStatusOrder && apiGetStatusOrder.status == 200) {
            order.status = apiGetStatusOrder.data.data.status
          }
        } catch (error) {
          console.log(error)
        }
        setSelectedOrder(0)
        // listOrderTmp !== listOrder && setListOrder(listOrderTmp)
      })
  }
  console.log(listOrder)

  return (
    <div className='container mt-5'>
      {!listOrder ? (
        <div className='max-w-7xl mx-auto '>
          <h1 className='text-2xl font-semibold text-gray-900 mb-2'>Danh sách đơn hàng</h1>
          <div className='space-y-4 mb-5'>
            {listOrder &&
              listOrder.map((order: any, idx: any) => {
                return (
                  <div className='p-6 cursor-pointer hover:shadow-lg rounded-md transition-shadow duration-200 overflow-hidden bg-white'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                      <div>
                        <h2 className='text-lg font-medium text-gray-900'>Mã đơn: {order.codeOrder}</h2>
                        <p className='text-sm text-gray-500'>Đặt hàng lúc {formatDateTime(order.deliveryTime)}</p>
                        <p className='mt-1 text-orange'>
                          {order.vnPayResponseDTO ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </p>
                      </div>
                      <div className='flex items-center gap-4'>
                        <div>{order.status}</div>
                        {/* <span className='text-lg font-medium text-gray-900'>${order.total.toFixed(2)}</span> */}
                        <FiEye
                          onClick={() => {
                            selectedOrder == order.id ? setSelectedOrder(null) : setSelectedOrder(order.id)
                          }}
                          className='w-5 h-5 text-gray-400'
                        />
                      </div>
                    </div>
                    {selectedOrder == order.id && (
                      <div className='mt-6 border-t pt-6'>
                        <h3 className='text-lg font-medium text-gray-900 mb-4'>Danh sách</h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                          {order.cartLineItemResponseDTOs.map((item: any, index: any) => (
                            <div
                              key={index}
                              className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'
                              role='listitem'
                            >
                              <img src={item.urlImage} alt={item.name} className='w-16 h-16 object-cover rounded' />
                              <div>
                                <h4 className='text-sm font-medium text-gray-900'>{item.name}</h4>
                                <p className='text-sm text-gray-500'>Số lượng: {item.quantity}</p>
                                <p className='text-sm font-medium text-gray-900'>{formatToVND(item.sellPrice)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      ) : (
        <AiOutlineLoading3Quarters className='text-4xl font-bold' />
      )}
    </div>
  )
}

export default PageListOrder1
