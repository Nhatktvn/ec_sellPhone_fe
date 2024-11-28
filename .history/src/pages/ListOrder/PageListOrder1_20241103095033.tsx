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
    fetchListOrderByUser()
    addStatusOrderToListOrder()
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
    listOrder.map(async (order: any, idx: any) => {
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
    })
  }
  console.log(statusOrder)

  const mockOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: [
        {
          name: 'Premium Wireless Headphones',
          quantity: 1,
          price: 199.99,
          image: 'images.unsplash.com/photo-1505740420928-5e560c06d30e'
        },
        {
          name: 'Smart Watch Pro',
          quantity: 1,
          price: 100.0,
          image: 'images.unsplash.com/photo-1523275335684-37898b6baf30'
        }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-14',
      status: 'In Transit',
      total: 849.97,
      items: [
        {
          name: '4K Ultra HD TV',
          quantity: 1,
          price: 699.99,
          image: 'images.unsplash.com/photo-1593784991095-a205069470b6'
        },
        {
          name: 'Bluetooth Speaker',
          quantity: 1,
          price: 149.98,
          image: 'images.unsplash.com/photo-1608043152269-423dbba4e7e1'
        }
      ]
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-13',
      status: 'Processing',
      total: 129.99,
      items: [
        {
          name: 'Fitness Tracker',
          quantity: 1,
          price: 129.99,
          image: 'images.unsplash.com/photo-1576243345690-4e4b79b63288'
        }
      ]
    }
  ]

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

  const handleOrderClick = (orderId: any) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId)
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8' role='main'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-6'>Your Orders</h1>

        <div className='space-y-4'>
          {listOrder.map((order: any, idx: any) => {
            return (
              <div
                key={order.id}
                className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'
                role='article'
                aria-label={`Order ${order.id}`}
              >
                <div
                  className='p-6 cursor-pointer'
                  onClick={() => handleOrderClick(order.id)}
                  onKeyPress={(e) => e.key === 'Enter' && handleOrderClick(order.id)}
                  tabIndex={0}
                  role='button'
                  aria-expanded={selectedOrder === order.id}
                >
                  <div>
                    <h2 className='text-lg font-medium text-gray-900'>{order.codeOrder}</h2>
                    <p className='text-sm text-gray-500'>Đặt hàng lúc {formatDateTime(order.deliveryTime)}</p>
                  </div>
                </div>
              </div>
            )
          })}
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'
              role='article'
              aria-label={`Order ${order.id}`}
            >
              <div
                className='p-6 cursor-pointer'
                onClick={() => handleOrderClick(order.id)}
                onKeyPress={(e) => e.key === 'Enter' && handleOrderClick(order.id)}
                tabIndex={0}
                role='button'
                aria-expanded={selectedOrder === order.id}
              >
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                  <div>
                    <h2 className='text-lg font-medium text-gray-900'>{order.id}</h2>
                    <p className='text-sm text-gray-500'>Ordered on {new Date(order.date).toLocaleDateString()}</p>
                  </div>

                  <div className='flex items-center gap-4'>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                    <span className='text-lg font-medium text-gray-900'>${order.total.toFixed(2)}</span>
                    <FiEye className='w-5 h-5 text-gray-400' />
                  </div>
                </div>

                {selectedOrder === order.id && (
                  <div className='mt-6 border-t pt-6'>
                    <h3 className='text-lg font-medium text-gray-900 mb-4'>Order Items</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                      {order.items.map((item, index) => (
                        <div key={index} className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg' role='listitem'>
                          <img
                            src={`https://${item.image}`}
                            alt={item.name}
                            className='w-16 h-16 object-cover rounded'
                            onError={(e: any) => {
                              e.target.src = 'https://images.unsplash.com/photo-1595246140520-1b3c3a71b3c9'
                              e.target.alt = 'Placeholder image'
                            }}
                          />
                          <div>
                            <h4 className='text-sm font-medium text-gray-900'>{item.name}</h4>
                            <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                            <p className='text-sm font-medium text-gray-900'>${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PageListOrder1
