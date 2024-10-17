import { useParams } from 'react-router-dom'
import { getDetailOrder } from '../../apis/order.api'

function DetailOrderPage() {
  const { id } = useParams()
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

  return <div>Chi tiết đơn hàng</div>
}

export default DetailOrderPage
