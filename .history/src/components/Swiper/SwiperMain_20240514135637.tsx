import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useEffect, useState } from 'react'
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
              background: `url("https://file.hstatic.net/200000823693/file/slide-img1_b3926f5602ce46bab1bdfc5c2a333fad.png") no-repeat`,
              backgroundSize: 'cover',
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
              background: `url("https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/6/638453158333588575_F-H1_800x300.png") no-repeat`,
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
              background: `url("https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/iphone-15-upgrade-sliding.png") no-repeat`,
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
