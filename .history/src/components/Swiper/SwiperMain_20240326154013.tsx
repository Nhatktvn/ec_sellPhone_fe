import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
const SwiperMain = () => {
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        navigation
        slidesPerView={1}
        pagination={{ type: 'progressbar' }}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        loop={true}
      >
        <SwiperSlide>
          <div
            className='container-cate object-cover'
            style={{
              height: '300px',
              background: `url("https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/2/29/638448424956202070_F-H1_800x300.png") no-repeat`,
              backgroundSize: 'cover',
              display: 'flex',
              justifyContent: 'center'
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='container-cate object-cover'
            style={{
              height: '300px',
              background: `url("https://cf.shopee.vn/file/vn-50009109-37acee3177bd4ae8ce54631bb5d75e3b_xxhdpi") no-repeat`,
              backgroundSize: 'cover',
              display: 'flex',
              justifyContent: 'center'
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='container-cate object-cover'
            style={{
              height: '300px',
              background: `url("https://cf.shopee.vn/file/vn-50009109-3a1b61f851c76982e28baaf3f1defc7a_xxhdpi") no-repeat`,
              backgroundSize: 'cover',
              display: 'flex',
              justifyContent: 'center'
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='container-cate object-cover'
            style={{
              height: '300px',
              background: `url("https://cf.shopee.vn/file/vn-50009109-0deaaf2a40ec14eca35d8bd40b8ac848_xxhdpi") no-repeat`,
              backgroundSize: 'cover',
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
