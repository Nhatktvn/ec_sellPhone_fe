import { useSelector } from 'react-redux'
import formatToVND, { formatDateTime } from '../../helpers/currencyFormatter'
import { Coupon } from '../../types/coupon.type'
import { FaTag, FaCalendarAlt, FaDollarSign, FaPercent, FaCopy } from 'react-icons/fa'
import { RootState } from '../../reducer/rootReducer'
import { getCouponByUser } from '../../apis/coupon.api'
import { toast } from 'react-toastify'
interface props {
  coupon: Coupon
}
const CouponCard = ({ coupon }: props) => {
  const user = useSelector((state: RootState) => state.auth.user)
  console.log(user)

  const handleGetCouponByUser = async () => {
    console.log('clicked')

    try {
      // const fetchApiGetCoupon = await getCouponByUser(user?.id, coupon.id)
      // console.log(fetchApiGetCoupon)
      // if (fetchApiGetCoupon && fetchApiGetCoupon.status == 200) {
      //   console.log(fetchApiGetCoupon)
      //   toast.success('Lấy Coupon thành công')
      // }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='max-w-md mx-auto p-6'>
      <div
        className='bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
        role='article'
        aria-label='Coupon card'
      >
        <div className='p-6 border-2 border-dashed border-orange rounded-2xl'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center space-x-2'>
              <FaTag className='text-orange text-xl' />
              <h2 className='text-2xl font-bold text-gray-800'>Discount Coupon</h2>
            </div>
            <button
              onClick={handleGetCouponByUser}
              className='flex items-center space-x-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-200'
              aria-label='Copy coupon code'
            >
              <span className='font-mono font-bold w-max'>Nhận ngay</span>
              <FaCopy />
            </button>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                {coupon.typeCoupon === 'percentage' ? (
                  <FaPercent className='text-orange' />
                ) : (
                  <FaDollarSign className='text-orange' />
                )}
                <span className='text-gray-600'>Giá giảm:</span>
              </div>
              <span className='text-xl font-bold text-orange'>
                {coupon.typeCoupon === 'percentage' ? `${coupon.couponValue} %` : formatToVND(coupon.couponValue)} OFF
              </span>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <FaDollarSign className='text-gray-500' />
                <span className='text-gray-600'>Đơn hàng tối thiểu:</span>
              </div>
              <span className='font-semibold text-blue-500'>${formatToVND(coupon.minimumAmount)}</span>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <FaCalendarAlt className='text-gray-500' />
                <span className='text-gray-600'>Bắt đầu:</span>
              </div>
              <span className='font-semibold text-gray-700'>{formatDateTime(coupon.startTime)}</span>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <FaCalendarAlt className='text-gray-500' />
                <span className='text-gray-600'>Kết thúc:</span>
              </div>
              <span className='font-semibold text-gray-700'>{formatDateTime(coupon.endTime)}</span>
            </div>
          </div>

          {/* <div className='mt-6 pt-4 border-t border-gray-200'>
            <p className='text-sm text-gray-500'>Terms & Conditions apply. Cannot be combined with other offers.</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default CouponCard
