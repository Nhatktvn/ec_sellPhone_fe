import { useEffect, useState } from 'react'
import { getListOrderByAdmin } from '../../../apis/order.api'
import { order } from '../../../types/order.type'

const ManageOrder = () => {
  const [listOrder, setListOrder] = useState<order[]>()
  useEffect(() => {
    fetchGetUsers()
  }, [])
  const fetchGetUsers = async () => {
    try {
      const rsGetListOrder = await getListOrderByAdmin()
      if (rsGetListOrder && rsGetListOrder.status === 200) {
        setListOrder(rsGetListOrder.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='p-4'>
      <table className=' mt-4 table table-hover table-bordered w-full'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Name</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Address</th>
            <th scope='col'>DeliveryTime</th>
            <th scope='col'>TotalPrice</th>
            <th scope='col'>StatusOrder</th>
            <th scope='col'>Payment</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {listOrder && listOrder.length > 0 ? (
            listOrder.map((order, idx) => {
              return (
                <tr className={idx % 2 == 0 ? 'bg-gray-300' : ''} key={order.id}>
                  <td>{idx + 1}</td>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td className='max-w-[200px] whitespace-nowrap overflow-hidden block'>{order.address}</td>
                  <td>{order.deliveryTime}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.statusOrder}</td>
                  <td>{order.vnPayResponseDTO ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                  <td className='flex gap-4 justify-center bg-white'>
                    <button className='p-2 bg-gray-600 rounded-md text-white font-bold'>View</button>
                    <select>
                      <option value=''></option>
                    </select>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td className='text-center'>Not found user</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageOrder
