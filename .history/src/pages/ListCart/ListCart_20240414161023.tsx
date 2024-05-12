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

      {cartItems && (
        <div>
          <table>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
            </tr>
          </table>
        </div>
      )}
    </div>
  )
}
