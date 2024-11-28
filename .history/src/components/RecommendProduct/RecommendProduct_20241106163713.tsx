import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
import { getRecommendProduct } from '../../apis/product.api'
import ProductCart from '../Product/ProductCard'

function RecommendProduct() {
  const [listRecommend, setListRecommend] = useState<product[]>([])
  useEffect(() => {
    fetchListRecommend()
  }, [])
  const fetchListRecommend = async () => {
    try {
      const getApiRecommend = await getRecommendProduct()
      if (getApiRecommend && getApiRecommend.status == 200) {
        console.log(getApiRecommend)
        setListRecommend(getApiRecommend.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container my-5'>
      <h2 className='text-xl font-bold'>Gợi ý sản phẩm cho bạn</h2>
      <div>
        {listRecommend &&
          listRecommend.length > 0 &&
          listRecommend.map((p: product, idx: number) => {
            return <ProductCart product={p} className={''} />
          })}
      </div>
    </div>
  )
}

export default RecommendProduct
