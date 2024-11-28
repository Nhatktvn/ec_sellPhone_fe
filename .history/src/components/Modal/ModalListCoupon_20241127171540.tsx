import { useState } from 'react'
import { FaTag, FaCalendarAlt, FaDollarSign, FaPercent, FaCopy, FaSearch } from 'react-icons/fa'
import { Coupon } from '../../types/coupon.type'
interface props {
  setShowModal: any
  setCouponId: any
  coupons: Coupon[]
  // handleDelete: () => void
}
function ModalListCoupon({ setShowModal, setCouponId, coupons }: props) {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className='w-[100vw] h-[100vh] fixed top-0 right-0 left-0 z-50 bg-slate-400/50'>
      <div id='popup-modal' tabIndex={-1} className='flex z-50 justify-center items-center w-[100vw] h-[100vh]'>
        <div className='relative  p-4 max-w-md max-h-full bg-white rounded-lg h-[300px]'>
          <div className='max-w-3xl mx-auto p-4'>
            <div className='space-y-4'>
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
                  role='article'
                  aria-label='Coupon card'
                >
                  <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex items-center space-x-2'>
                        <FaTag className='text-blue-500' />
                        <span className='font-mono font-bold'>{coupon.codeCoupon}</span>
                      </div>
                      <div className='flex items-center space-x-2 text-green-500 font-bold'>
                        {coupon.typeCoupon === 'percentage' ? <FaPercent /> : <FaDollarSign />}
                        <span>
                          {coupon.couponValue}
                          {coupon.typeCoupon === 'percentage' ? '%' : '$'} OFF
                        </span>
                      </div>
                    </div>

                    <div className='flex items-center space-x-4'>
                      <div className='text-sm text-gray-600'>
                        <FaCalendarAlt className='inline mr-1' />
                        {/* {formatDate(coupon.startDate).split(',')[0]} */}
                      </div>
                      <button
                        // onClick={() => handleCopyCode(coupon.code)}
                        className='flex items-center space-x-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200 w-max'
                        aria-label='Copy coupon code'
                      >
                        <FaCopy />
                        <span className='text-sm'>Sử dụng</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalListCoupon
