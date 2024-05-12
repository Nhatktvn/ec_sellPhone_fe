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
      <table class='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' class='px-6 py-3'>
              Product name
            </th>
            <th scope='col' class='px-6 py-3'>
              Color
            </th>
            <th scope='col' class='px-6 py-3'>
              Category
            </th>
            <th scope='col' class='px-6 py-3'>
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <th scope='row' class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
              Apple MacBook Pro 17"
            </th>
            <td class='px-6 py-4'>Silver</td>
            <td class='px-6 py-4'>Laptop</td>
            <td class='px-6 py-4'>$2999</td>
          </tr>
          <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <th scope='row' class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
              Microsoft Surface Pro
            </th>
            <td class='px-6 py-4'>White</td>
            <td class='px-6 py-4'>Laptop PC</td>
            <td class='px-6 py-4'>$1999</td>
          </tr>
          <tr class='bg-white dark:bg-gray-800'>
            <th scope='row' class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
              Magic Mouse 2
            </th>
            <td class='px-6 py-4'>Black</td>
            <td class='px-6 py-4'>Accessories</td>
            <td class='px-6 py-4'>$99</td>
          </tr>
        </tbody>
      </table>
      <table>
        {cartItems &&
          cartItems.map((item, idx) => (
            <tr key={idx}>
              <th>{idx}</th>
              <th>
                <img src={item.urlImage} />
              </th>
              <th>{item.name}</th>
              <th>{item.quantity}</th>
              <th>{item.unitPrice}</th>
            </tr>
          ))}
      </table>
    </div>
  )
}
