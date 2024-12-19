import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useEffect, useState } from 'react'
import banner1 from '../../assets/banner-swipper-1.png'
import banner2 from '../../assets/banner-swiper-4.webp'
import banner3 from '../../assets/banner-swiper-3.png'
import banner4 from '../../assets/banner-swiper-4.webp'
const SwiperMain = () => {
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
        <SwiperSlide>
          <div
            className='container-cate object-cover rounded-xl'
            style={{
              backgroundImage: `url(${banner1})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              height: '220px', // Full viewport height
              width: '100%'
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='container-cate object-cover rounded-xl'
            style={{
              backgroundImage: `url(${banner2})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              height: '220px', // Full viewport height
              width: '100%'
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='container-cate object-cover rounded-xl'
            style={{
              backgroundImage: `url(${banner3})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              height: '220px', // Full viewport height
              width: '100%'
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='container-cate object-cover rounded-xl'
            style={{
              backgroundImage: `url(${banner4})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              height: '220px', // Full viewport height
              width: '100%'
            }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SwiperMain
