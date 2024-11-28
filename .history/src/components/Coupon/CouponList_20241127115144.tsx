import { useState } from 'react'
import { Coupon } from '../../types/coupon.type'

const CouponList = () => {
  const [listCoupon, setListCoupon] = useState<Coupon[]>([])
  const getAllCoupon = async () => {
    try {
      const fetchApiGetAllCoupon = await getAllCoupon()
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
