import React, { useState } from 'react'

const CouponList = () => {
  const [listCoupon, setListCoupon] = useState([])
  return (
    <div className='container bg-white my-5'>
      <h2 className='text-xl font-bold'>Săn Voucher</h2>
    </div>
  )
}

export default CouponList
