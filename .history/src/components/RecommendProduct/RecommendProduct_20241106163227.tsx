import { useState } from 'react'
import { product } from '../../types/product.type'

function RecommendProduct() {
  const [listRecommend, setListRecommend] = useState<product[]>([])

  return (
    <div className='container my-5'>
      <h2 className='text-xl font-bold'>Gợi ý sản phẩm cho bạn</h2>
      <div></div>
    </div>
  )
}

export default RecommendProduct
