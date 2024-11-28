import React, { useEffect, useState } from 'react'
import { FiEye, FiAlertCircle } from 'react-icons/fi'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdLocalShipping } from 'react-icons/md'
import { BiPackage } from 'react-icons/bi'
import { getListOrder } from '../../apis/order.api'
import { order } from '../../types/order.type'
import { getStatusOrderGHNByCodeOrder } from '../../apis/GHN.api'
import { formatDateTime } from '../../helpers/currencyFormatter'

const PageListOrder1 = () => {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [listOrder, setListOrder] = useState<any>([])
  const [statusOrder, setStatusOrder] = useState('')
  useEffect(() => {
    getListOrders()
  }, [])
  const getListOrders = async () => {
    await fetchListOrderByUser()
    await addStatusOrderToListOrder()
  }
  const fetchListOrderByUser = async () => {
    try {
      console.log('get list user')

      const rsGetListOrder = await getListOrder()
      if (rsGetListOrder && rsGetListOrder.status === 200) {
        const sortOrders: any = rsGetListOrder.data.sort((a: order, b: order) => b.id - a.id)
        setListOrder(sortOrders)
        addStatusOrderToListOrder()
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(listOrder)
  const fetchStatusOrderByCodeOrder = async (orderCode: string) => {
    try {
      const data = {
        order_code: orderCode
      }
      const apiGetStatusOrder = await getStatusOrderGHNByCodeOrder(data)
      if (apiGetStatusOrder && apiGetStatusOrder.status == 200) {
        setStatusOrder(apiGetStatusOrder.data.data.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addStatusOrderToListOrder = async () => {
    console.log('get status')
    const listOrderTmp = listOrder
    listOrderTmp.map(async (order: any, idx: any) => {
      try {
        const data = {
          order_code: order.codeOrder
        }
        const apiGetStatusOrder = await getStatusOrderGHNByCodeOrder(data)
        if (apiGetStatusOrder && apiGetStatusOrder.status == 200) {
          order.status_Order = apiGetStatusOrder.data.data.status
        }
      } catch (error) {
        console.log(error)
      }
      setListOrder(listOrderTmp)
    })
  }

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'Delivered':
        return <BiPackage className='w-5 h-5 text-green-500' />
      case 'In Transit':
        return <MdLocalShipping className='w-5 h-5 text-blue-500' />
      case 'Processing':
        return <AiOutlineClockCircle className='w-5 h-5 text-yellow-500' />
      default:
        return <FiAlertCircle className='w-5 h-5 text-gray-500' />
    }
  }

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'In Transit':
        return 'bg-blue-100 text-blue-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-6'>Your Orders</h1>

        <div className='space-y-4'>
          {listOrder.map((order: any, idx: any) => {
            console.log(order.status_Order)

            return (
              <div>
                <div className='p-6 cursor-pointer'>
                  <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                    <div>
                      <h2 className='text-lg font-medium text-gray-900'>Mã đơn: {order.codeOrder}</h2>
                      <p className='text-sm text-gray-500'>Đặt hàng lúc {formatDateTime(order.deliveryTime)}</p>
                      <p className='mt-1 text-orange'>{order.vnPayResponseDTO ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                      <div>{order.status_Order}</div>
                      {/* <span className='text-lg font-medium text-gray-900'>${order.total.toFixed(2)}</span> */}
                      <FiEye className='w-5 h-5 text-gray-400' />
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PageListOrder1
