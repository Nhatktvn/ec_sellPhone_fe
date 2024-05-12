import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../reducer/rootReducer'

export default function ListCart() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)
  return (
    <div className='container min-h-[60vh] rounded-xl bg-white mt-5 p-3'>
      {isAuthenticated ? (
        <span className='bg-[#fff3cd] w-full block p-3 text-[#856404] rounded-lg'>
          Không có sản phẩm nào. Quay lại{' '}
          <Link to={'/'} className='font-bold'>
            cửa hàng
          </Link>{' '}
          để tiếp tục mua sắm.
        </span>
      ) : (
        <span className='bg-[#fff3cd] w-full block p-3 text-[#856404] rounded-lg'>
          Vui lòng{' '}
          <Link to={'/dang-nhap'} className='font-bold'>
            đăng nhập
          </Link>{' '}
          để xem giỏ hàng.
        </span>
      )}
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              STT
            </th>
            <th scope='col' className='px-6 py-3'>
              Hình ảnh
            </th>
            <th scope='col' className='px-6 py-3'>
              Tên
            </th>
            <th scope='col' className='px-6 py-3'>
              Màu sắc
            </th>
            <th scope='col' className='px-6 py-3'>
              Dung lượng
            </th>
            <th scope='col' className='px-6 py-3'>
              đơn giá
            </th>
            <th scope='col' className='px-6 py-3'>
              Khuyến mã<i></i>
            </th>
            <th scope='col' className='px-6 py-3'>
              Số lượng
            </th>
            <th scope='col' className='px-6 py-3'>
              Tổng tiền
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'></tr>
          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
              Microsoft Surface Pro
            </th>
            <td className='px-6 py-4'>White</td>
            <td className='px-6 py-4'>Laptop PC</td>
            <td className='px-6 py-4'>$1999</td>
          </tr>
          <tr className='bg-white dark:bg-gray-800'>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
              Magic Mouse 2
            </th>
            <td className='px-6 py-4'>Black</td>
            <td className='px-6 py-4'>Accessories</td>
            <td className='px-6 py-4'>$99</td>
          </tr> */}
          {cartItems &&
            cartItems.map((item, idx) => (
              <tr key={idx}>
                <th className='px-6 py-4'>{idx}</th>
                <th>
                  <img className='w-16 h-16' src={item.urlImage} />
                </th>
                <th className='px-6 py-4'>{item.name}</th>
                <td className='px-6 py-4'>{item.color}</td>
                <td className='px-6 py-4'>{item.storageCapacity}</td>
                <td className='px-6 py-4'>{formatToVND(item.unitPrice)}</td>
                <td className='px-6 py-4'>{item.discount * 100}%</td>
                <td className='px-6 py-4'>
                  <button></button>
                  {item.quantity}
                </td>
                <td className='px-6 py-4 text-red-500 font-bold'>
                  {formatToVND(item.unitPrice * (100 - item.discount) * item.quantity)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
