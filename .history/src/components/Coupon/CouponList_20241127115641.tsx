import { useEffect, useState } from 'react'
import { Coupon } from '../../types/coupon.type'
import { getAllCoupon } from '../../apis/coupon.api'

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
    </div>
  )
}

export default CouponList
