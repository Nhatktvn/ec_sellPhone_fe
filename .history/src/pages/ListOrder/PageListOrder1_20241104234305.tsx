import React, { useEffect, useState } from 'react'
import { FiEye, FiAlertCircle } from 'react-icons/fi'
import { getListOrder, putCancelOrder, putReceivedOrder, updateStatusOrderByAdmin } from '../../apis/order.api'
import { order } from '../../types/order.type'
import { cancelOrderGHNByCodeOrder, getStatusOrderGHNByCodeOrder } from '../../apis/GHN.api'
import formatToVND, { formatDateTime } from '../../helpers/currencyFormatter'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { TiCancel } from 'react-icons/ti'
import { MdOutlineRateReview } from 'react-icons/md'
import { toast } from 'react-toastify'
import ModalConfirmCancelOrder from '../../components/Modal/ModalConfirmCancelOrder'
const PageListOrder1 = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [listOrder, setListOrder] = useState<any>([])
  const [statusOrder, setStatusOrder] = useState('')
  const [showModalCancel, setShowModalCancel] = useState(false)
  const [idItemCancel, setIdItemCancel] = useState(0)
  const [codeOrderItemCancel, setCodeOrderItemCancel] = useState('')
  const navigation = useNavigate()
  useEffect(() => {
    fetchListOrderByUser()
  }, [])

  const nameStatusOrder: any = {
    ready_to_pick: 'Chờ lấy hàng',
    picking: 'Đang lấy hàng',
    cancel: 'Hủy đơn',
    picked: 'Đã lấy hàng',
    storing: 'Đang nhập kho',
    transporting: 'Đang trung chuyển',
    sorting: 'Đang phân loại',
    delivering: 'Đang giao hàng',
    delivered: 'Giao hàng thành công',
    delivery_fail: 'Giao hàng thất bại',
    returned: 'Trả hàng thành công'
  }

  const colorTextStatusOrder: any = {
    cancel: 'text-red-600',
    ready_to_pick: 'text-green-500',
    other: 'text-blue-500',
    delivered: 'text-yellow-500'
  }

  const renderTextStatus = (status: string) => {
    if (status != 'ready_to_pick' && status != 'delivered' && status != 'cancel') {
      return <div className={`font-bold ${colorTextStatusOrder.other}`}>{nameStatusOrder[status]}</div>
    }
    return <div className={`font-bold ${colorTextStatusOrder[status]}`}>{nameStatusOrder[status]}</div>
  }

  const fetchListOrderByUser = async () => {
    try {
      const rsGetListOrder = await getListOrder()
      if (rsGetListOrder && rsGetListOrder.status === 200) {
        let sortOrders: any = rsGetListOrder.data.sort((a: order, b: order) => b.id - a.id)
        addStatusOrderToListOrder(sortOrders)
        setListOrder(sortOrders)
        setSelectedOrder(0)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const addStatusOrderToListOrder = async (sortOrders: any) => {
    sortOrders &&
      sortOrders.map(async (order: any, idx: any) => {
        console.log('get status')
        try {
          const data = {
            order_code: order.codeOrder
          }
          const apiGetStatusOrder = await getStatusOrderGHNByCodeOrder(data)
          if (apiGetStatusOrder && apiGetStatusOrder.status == 200) {
            order.status = apiGetStatusOrder.data.data.status
            if (apiGetStatusOrder.data.data.status == 'delivered' && order.statusOrder !== 'Đã nhận được hàng') {
              handleRecivedOrder(order.id)
            }
          }
        } catch (error) {
          console.log(error)
        }
        setSelectedOrder(0)
        navigation('/don-hang')
      })
  }

  const fecthCancelOrderGHN = async (codeOrder: string, idOrder: any) => {
    try {
      const apiCancelGHN = await cancelOrderGHNByCodeOrder(codeOrder)
      if (apiCancelGHN && apiCancelGHN.status === 200) {
        handleCancelOrderInDB(idOrder)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancelOrderInDB = async (id: any) => {
    try {
      const apiCancelOrderDB = await putCancelOrder(id)
      if (apiCancelOrderDB && apiCancelOrderDB.status == 200) {
        fetchListOrderByUser()
        toast.success('Hủy đơn thành công')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleRecivedOrder = async (id: number) => {
    try {
      const apiReceived = await updateStatusOrderByAdmin({ orderId: id, statusOrderName: 'Đã nhận được hàng' })
      if (apiReceived && apiReceived.status == 200) {
        console.log(apiReceived)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container mt-5'>
      {showModalCancel && (
        <ModalConfirmCancelOrder
          showModal={showModalCancel}
          setShowModal={setShowModalCancel}
          handleDelete={() => fecthCancelOrderGHN(codeOrderItemCancel, idItemCancel)}
        />
      )}
      {listOrder ? (
        <div className='max-w-7xl mx-auto '>
          <h1 className='text-2xl font-semibold text-gray-900 mb-2'>Danh sách đơn hàng</h1>
          <div className='space-y-4 mb-5'>
            {listOrder &&
              listOrder.map((order: any, idx: any) => {
                return (
                  <div className='block p-6 cursor-pointer hover:shadow-lg rounded-md transition-shadow duration-200 overflow-hidden bg-white relative'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                      <div>
                        <h2 className='text-lg font-medium text-gray-900'>Mã đơn: {order.codeOrder}</h2>
                        <p className='text-sm text-gray-500'>Đặt hàng lúc {formatDateTime(order.deliveryTime)}</p>
                        <p className='mt-1 text-orange'>
                          {order.vnPayResponseDTO ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </p>
                      </div>
                      <div className='flex flex-col gap-2 items-end'>
                        {order.status == 'ready_to_pick' && (
                          <button
                            onClick={() => {
                              setShowModalCancel(true)
                              setCodeOrderItemCancel(order.codeOrder)
                              setIdItemCancel(order.id)
                            }}
                            className='text-red-600 flex gap-1 items-center font-bold border-2 border-red-600 p-2 rounded-lg active:scale-90'
                          >
                            <TiCancel /> <span>Hủy đơn</span>
                          </button>
                        )}
                        {order.statusOrder == 'Đã nhận được hàng' && order.status == 'delivered' && (
                          <button className='text-blue-600 flex gap-1 items-center font-bold border-2 border-blue-600 p-2 rounded-lg active:scale-90'>
                            <MdOutlineRateReview /> <span>Đánh giá</span>
                          </button>
                        )}
                        <div className='flex gap-4'>
                          {renderTextStatus(order.status)}
                          {/* <span className='text-lg font-medium text-gray-900'>${order.total.toFixed(2)}</span> */}
                          <FiEye
                            onClick={() => {
                              selectedOrder == order.id ? setSelectedOrder(null) : setSelectedOrder(order.id)
                            }}
                            className='w-5 h-5 text-gray-400 z-50'
                          />
                        </div>
                        <Link
                          to={`/don-hang/chi-tiet-don-hang/${order.codeOrder}`}
                          state={{ inforOrder: order }}
                          className='text-md text-blue-600 hover:underline absolute bottom-2 right-2 pr-2'
                        >
                          Chi tiết
                        </Link>
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
                                <h4 className='text-sm font-medium text-gray-900'>{`${item.name} - ${item.storageCapacity} (${item.color})`}</h4>
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
        <div className='flex items-center justify-center'>
          <AiOutlineLoading3Quarters className='text-4xl text-gray-600 animate-spin' />
        </div>
      )}
    </div>
  )
}

export default PageListOrder1
