import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
const SwiperMain = (items: product[]) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
    return () => {
      window.removeEventListener('resize', () => setWindowWidth(window.innerWidth))
    }
  }, [windowWidth])
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        navigation
        slidesPerView={windowWidth >= 768 ? 2 : 1}
        // pagination={{ type: 'progressbar' }}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        loop={true}
        spaceBetween={20}
      >
        {items &&
          items.length > 0 &&
          items.map((item, idx) => (
            <SwiperSlide>
              <div
                className='container-cate object-cover rounded-xl'
                style={{
                  height: '220px',
                  background: `url("https://file.hstatic.net/200000823693/file/slide-img1_b3926f5602ce46bab1bdfc5c2a333fad.png") no-repeat`,
                  backgroundSize: 'cover',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default SwiperMain
