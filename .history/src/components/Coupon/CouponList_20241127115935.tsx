import { useEffect, useState } from 'react'
import { Coupon } from '../../types/coupon.type'
import { getAllCoupon } from '../../apis/coupon.api'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import CouponCard from './CouponCard'

const CouponList = () => {
  const [listCoupon, setListCoupon] = useState<Coupon[]>([])
  useEffect(() => {
    fetchGetAllCoupon()
  }, [])
  const fetchGetAllCoupon = async () => {
    try {
      const fetchApiGetAllCoupon = await getAllCoupon()
      if (fetchApiGetAllCoupon && fetchApiGetAllCoupon.status == 200) {
        setListCoupon(fetchApiGetAllCoupon.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container bg-white my-5'>
      <h2 className='text-xl font-bold'>Săn Voucher</h2>
      <div>
        {listCoupon && listCoupon.length > 0 && (
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
            {listCoupon &&
              listCoupon.length > 0 &&
              listCoupon.map((p: Coupon, idx) => (
                <SwiperSlide className='' key={idx}>
                  <CouponCard product={p} className={''} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default CouponList
