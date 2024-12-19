import { useEffect, useState } from 'react'
import { Coupon } from '../../types/coupon.type'
import { getAllCoupon, getCouponForUser } from '../../apis/coupon.api'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import CouponCard from './CouponCard'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducer/rootReducer'

const CouponList = () => {
  const [listCoupon, setListCoupon] = useState<Coupon[]>([])
  const windowWidth: any = useState(window.innerWidth)
  const user = useSelector((state: RootState) => state.auth.user)
  useEffect(() => {
    fetchGetAllCoupon()
  }, [user])
  const fetchGetAllCoupon = async () => {
    try {
      const fetchApiGetAllCoupon = user ? await getCouponForUser(user.id) : await getAllCoupon()
      if (fetchApiGetAllCoupon && fetchApiGetAllCoupon.status == 200) {
        setListCoupon(fetchApiGetAllCoupon.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const numberShowItems = () => {
    if (windowWidth > 1024) {
      return 4
    }
    // if (windowWidth > 768) {
    //   return 4
    // }
    if (windowWidth > 640) {
      return 2
    }
    return 1
  }
  return (
    <div className='container bg-white my-5'>
      {/* <h2 className='text-xl font-bold pt-5'>Săn Voucher</h2> */}
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
              listCoupon.map((c: Coupon, idx) => (
                <SwiperSlide className='' key={idx}>
                  <CouponCard coupon={c} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default CouponList
