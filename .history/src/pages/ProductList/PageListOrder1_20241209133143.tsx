import { useEffect, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { getListOrder, putCancelOrder, updateStatusOrderByAdmin } from '../../apis/order.api'
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
    cancel: 'Đã hủy đơn',
    picked: 'Đã lấy hàng',
    storing: 'Đang nhập kho',
    transporting: 'Đang trung chuyển',
    sorting: 'Đang phân loại',
    delivering: 'Đang giao hàng',
    delivered: 'Giao hàng thành công',
    delivery_fail: 'Giao hàng thất bại',
    return: 'Trả hàng',
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
      sortOrders.map(async (order: any) => {
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

  console.log(listOrder)

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
    </div>
  )
}

export default PageListOrder1
