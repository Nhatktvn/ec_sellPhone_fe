import { useParams } from 'react-router-dom'
import { getDetailOrder } from '../../apis/order.api'
import { useEffect } from 'react'

function DetailOrderPage() {
  const { id } = useParams()
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
      <div className='grid grid-cols-12 mt-5'>
        <div className='col-span-7'>Danh sách sản phẩm</div>
        <div className='col-span-5'>Thông tin khách hàng</div>
      </div>
    </div>
  )
}

export default DetailOrderPage
