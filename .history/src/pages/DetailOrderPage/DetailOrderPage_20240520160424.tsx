import { useParams } from 'react-router-dom'

function DetailOrderPage() {
  const { id } = useParams()
  const handleGetDetailOrder = async () => {}
  console.log(id)

  return <div>Chi tiết đơn hàng</div>
}

export default DetailOrderPage
