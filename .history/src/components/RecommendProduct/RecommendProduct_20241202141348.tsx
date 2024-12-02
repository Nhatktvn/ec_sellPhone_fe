import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
import { getRecommendProduct } from '../../apis/product.api'
import ProductCart from '../Product/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
function RecommendProduct() {
  const [listRecommend, setListRecommend] = useState<product[]>([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
    return () => {
      window.removeEventListener('resize', () => setWindowWidth(window.innerWidth))
    }
  }, [windowWidth])
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

  const numberShowItems = () => {
    if (windowWidth > 1024) {
      return 5
    }
    if (windowWidth > 768) {
      return 4
    }
    if (windowWidth > 640) {
      return 3
    }
    return 2
  }

  return (
    listRecommend &&
    listRecommend.length > 0 && (
      <div className='container my-5 bg-white p-5 rounded-md'>
        <h2 className='text-xl font-bold'>Gợi ý sản phẩm cho bạn</h2>
        {listRecommend && listRecommend.length > 0 && (
          <Swiper
            autoplay={{
              delay: 2000,
              disableOnInteraction: false
            }}
            navigation
            slidesPerView={numberShowItems()}
            // pagination={{ type: 'progressbar' }}
            modules={[Navigation, Pagination, Scrollbar, Autoplay]}
            loop={true}
            spaceBetween={20}
          >
            {listRecommend &&
              listRecommend.length > 0 &&
              listRecommend.map((p: product, idx) => (
                <SwiperSlide className='' key={idx}>
                  <ProductCart product={p} className={''} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    )
  )
}

export default RecommendProduct
