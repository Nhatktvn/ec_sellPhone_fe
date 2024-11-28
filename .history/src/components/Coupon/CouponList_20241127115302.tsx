import { useState } from 'react'
import { Coupon } from '../../types/coupon.type'
import { getAllCoupon } from '../../apis/coupon.api'

const CouponList = () => {
  const [listCoupon, setListCoupon] = useState<Coupon[]>([])
  const fetchGetAllCoupon = async () => {
    try {
      const fetchApiGetAllCoupon = await getAllCoupon()
      if (fetchApiGetAllCoupon && fetchApiGetAllCoupon.status == 200) {
        console.log(fetchApiGetAllCoupon.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container bg-white my-5'>
      <h2 className='text-xl font-bold'>Săn Voucher</h2>
    </div>
  )
}

export default CouponList
