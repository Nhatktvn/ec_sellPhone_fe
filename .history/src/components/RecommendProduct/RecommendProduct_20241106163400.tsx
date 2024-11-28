import { useState } from 'react'
import { product } from '../../types/product.type'
import { getRecommendProduct } from '../../apis/product.api'

function RecommendProduct() {
  const [listRecommend, setListRecommend] = useState<product[]>([])
  const fetchListRecommend = async () => {
    try {
      const getApiRecommend = await getRecommendProduct()
      if (getApiRecommend && getApiRecommend.status == 200) {
        console.log(getApiRecommend)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container my-5'>
      <h2 className='text-xl font-bold'>Gợi ý sản phẩm cho bạn</h2>
      <div></div>
    </div>
  )
}

export default RecommendProduct
