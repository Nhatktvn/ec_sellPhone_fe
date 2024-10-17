import { useEffect, useState } from 'react'
import { getListOrder, putCancelOrder } from '../../apis/order.api'
import { order } from '../../types/order.type'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function PageListOrder() {
  const [statusOrder, setStatusOrder] = useState('tat ca')
  const [listOrder, setListOrder] = useState<order[]>([])
  const [listOrderFilter, setListOrderFilter] = useState<order[]>([])
  useEffect(() => {
    fetchListOrderByUser()
  }, [])
  useEffect(() => {
    filterOrderByStatus(statusOrder)
  }, [statusOrder])
  const filterOrderByStatus = (status: string) => {
    let rsOrder: order[] = []
    switch (status) {
      case 'dang xac nhan':
        rsOrder = listOrder.filter((order) => order.statusOrder === 'Đang xác nhận')
        setListOrderFilter(rsOrder)
        break
      case 'dang dong goi':
        rsOrder = listOrder.filter((order) => order.statusOrder === 'Đang tiến hàng đóng gói')
        setListOrderFilter(rsOrder)
        break
      case 'dang cho van chuyen':
        rsOrder = listOrder.filter((order) => order.statusOrder === 'Đang chờ vận chuyển')
        setListOrderFilter(rsOrder)
        break
      case 'dang van chuyen':
        rsOrder = listOrder.filter((order) => order.statusOrder === 'Đang vận chuyển')
        setListOrderFilter(rsOrder)
        break
      case 'da nhan duoc hang':
        rsOrder = listOrder.filter((order) => order.statusOrder === 'Đã nhận được hàng')
        setListOrderFilter(rsOrder)
        break
      case 'da huy':
        rsOrder = listOrder.filter((order) => order.statusOrder === 'Đã hủy')
        setListOrderFilter(rsOrder)
        break
      default:
        setListOrderFilter(listOrder)
        break
    }
  }

  const handleCancelOrder = async (id: number) => {
    try {
      const rsCancel = await putCancelOrder(id)
      if (rsCancel && rsCancel.status === 200) {
        fetchListOrderByUser()
        toast.success('Hủy đơn thành công')
      }
    } catch (error) {}
  }
  const fetchListOrderByUser = async () => {
    try {
      const rsGetListOrder = await getListOrder()
      if (rsGetListOrder && rsGetListOrder.status === 200) {
        const sortOrders: order[] = rsGetListOrder.data.sort((a: order, b: order) => b.id - a.id)
        setListOrder(rsGetListOrder.data)
        setListOrderFilter(rsGetListOrder.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(listOrder)

  return (
    <div className='container  mt-5 py-3 rounded-md'>
      <div>
        <ul className='grid grid-cols-7 bg-white gap-2'>
          <li
            className={`${statusOrder == 'tat ca' && 'text-orange border-b-2 border-orange'} py-2 text-center cursor-pointer`}
            onClick={() => setStatusOrder('tat ca')}
          >
            Tất cả
          </li>
          <li
            className={`${statusOrder == 'dang xac nhan' && 'text-orange border-b-2 border-orange'} py-2 text-center cursor-pointer`}
            onClick={() => setStatusOrder('dang xac nhan')}
          >
            Đang xác nhận
          </li>
          <li
            className={`${statusOrder == 'dang dong goi' && 'text-orange border-b-2 border-orange'} py-2 text-center cursor-pointer`}
            onClick={() => setStatusOrder('dang dong goi')}
          >
            Đang đóng gói
          </li>
          <li
            className={`${statusOrder == 'dang cho van chuyen' && 'text-orange border-b-2 border-orange'} py-2 text-center cursor-pointer`}
            onClick={() => setStatusOrder('dang cho van chuyen')}
          >
            Đang chờ vận chuyển
          </li>
          <li
            className={`${statusOrder == 'dang van chuyen' && 'text-orange border-b-2 border-orange'} py-2 text-center cursor-pointer`}
            onClick={() => setStatusOrder('dang van chuyen')}
          >
            Đang vận chuyển
          </li>
          <li
            className={`${statusOrder == 'da nhan duoc hang' && 'text-orange border-b-2 border-orange'} py-2 text-center cursor-pointer`}
            onClick={() => setStatusOrder('da nhan duoc hang')}
          >
            Đã nhận được hàng
          </li>
          <li
            className={`${statusOrder == 'da huy' && 'text-orange border-b-2 border-orange'} py-2 text-center cursor-pointer`}
            onClick={() => setStatusOrder('da huy')}
          >
            Đã hủy
          </li>
        </ul>
      </div>
      <div>
        <ul className='flex flex-col items-center gap-4 mt-5'>
          {listOrderFilter &&
            listOrderFilter.length > 0 &&
            listOrderFilter.map((order) => (
              <li className='flex justify-between w-[70%] bg-white p-3 rounded-md'>
                <div>
                  <p>Số lượng: {order.cartLineItemResponseDTOs.length}</p>
                  <p>Tên: {order.name}</p>
                  <p>Địa chỉ: {order.address}</p>
                  <p>
                    Ngày đặt hàng:{' '}
                    {`${new Date(order.deliveryTime).getUTCHours()}:${new Date(order.deliveryTime).getUTCMinutes()}:${new Date(order.deliveryTime).getUTCSeconds()}  ${new Date(order.deliveryTime).getUTCDate()}/${new Date(order.deliveryTime).getUTCMonth() + 1}/${new Date(order.deliveryTime).getUTCFullYear()}`}
                  </p>
                  <p>
                    Trạng thái thanh toán:{' '}
                    <span className='font-bold'>
                      {order.vnPayResponseDTO ? 'Đã thanh toán' : 'Thanh toán khi nhận hàng'}
                    </span>
                  </p>
                </div>
                <div className='flex flex-col items-end gap-1'>
                  <p className='text-orange'>{order.statusOrder}</p>
                  <p className=''>
                    Tổng tiền: <span className='text-orange text-xl font-bold'>{formatToVND(order.totalPrice)}</span>
                  </p>
                  <Link
                    to={`/don-hang/chi-tiet-don-hang/${order.id}`}
                    className='bg-blue-600 p-1 text-white rounded-sm block w-max'
                  >
                    Chi tiết đơn hàng
                  </Link>
                  {order.statusOrder === 'Đang xác nhận' && (
                    <button
                      className='btn bg-orange p-1 text-white rounded-sm'
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Hủy đơn
                    </button>
                  )}
                  {order.statusOrder === 'Đã nhận được hàng' && (
                    <button className='btn bg-orange p-1 text-white rounded-sm'>Đánh giá</button>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default PageListOrder
function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((number / 1000) * 1000)
}
