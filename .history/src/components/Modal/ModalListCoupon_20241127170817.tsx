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
  const couponsData = [
    {
      id: 1,
      code: 'SUMMER2024',
      type: 'percentage',
      value: 20,
      minAmount: 100,
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    {
      id: 2,
      code: 'WINTER2024',
      type: 'fixed',
      value: 50,
      minAmount: 200,
      startDate: '2024-01-01',
      endDate: '2024-03-31'
    },
    {
      id: 3,
      code: 'FLASH50',
      type: 'percentage',
      value: 50,
      minAmount: 150,
      startDate: '2024-02-01',
      endDate: '2024-02-29'
    }
  ]
  const filteredCoupons = couponsData.filter((coupon) => coupon.code.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <div className='w-[100vw] h-[100vh] fixed top-0 right-0 left-0 z-50 bg-slate-400/50'>
      <div id='popup-modal' tabIndex={-1} className='flex z-50 justify-center items-center w-[100vw] h-[100vh]'>
        <div className='relative  p-4 max-w-md max-h-full'>
          <div className='max-w-3xl mx-auto p-4'>
            <div className='mb-6'>
              <h1 className='text-2xl font-bold text-gray-800 mb-3'>Available Coupons</h1>
              <div className='relative'>
                <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search coupons...'
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className='space-y-4'>
              {filteredCoupons.map((coupon) => (
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
                        <span className='font-mono font-bold'>{coupon.code}</span>
                      </div>
                      <div className='flex items-center space-x-2 text-green-500 font-bold'>
                        {coupon.type === 'percentage' ? <FaPercent /> : <FaDollarSign />}
                        <span>
                          {coupon.value}
                          {coupon.type === 'percentage' ? '%' : '$'} OFF
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
                        className='flex items-center space-x-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200'
                        aria-label='Copy coupon code'
                      >
                        <FaCopy />
                        <span className='text-sm'>Copy</span>
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
