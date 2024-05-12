import { Link } from 'react-router-dom'

export default function ListCart() {
  return (
    <div className='container min-h-[60vh] rounded-xl bg-white mt-5 p-3'>
      <span className='bg-[#fff3cd] w-full block p-3 text-[#856404] rounded-lg'>
        Không có sản phẩm nào. Quay lại{' '}
        <Link to={'/'} className='font-bold'>
          cửa hàng
        </Link>{' '}
        để tiếp tục mua sắm.
      </span>
    </div>
  )
}
