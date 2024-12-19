import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useEffect, useState } from 'react'
import banner1 from '../../assets/banner-swipper-1.png'
import banner2 from '../../assets/banner-swiper-4.webp'
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
              height: '220px',
              background: `url(${banner1}) no-repeat`,
              backgroundSize: 'container',
              display: 'flex',
              justifyContent: 'center'
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
              height: '100%', // Full viewport height
              width: '100%'
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='container-cate object-cover rounded-xl'
            style={{
              height: '220px',
              background: `url("https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/5/4/638504215061167099_F-H1_800x300.png") no-repeat`,
              backgroundSize: '100% 100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='container-cate object-cover rounded-xl'
            style={{
              height: '220px',
              background: `url("https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/5/1/638501226740810528_F-H1_800x300.png") no-repeat`,
              backgroundSize: '100% 100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SwiperMain
