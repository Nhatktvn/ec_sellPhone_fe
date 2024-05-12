import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../reducer/rootReducer'
import { CiCirclePlus } from 'react-icons/ci'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
export default function ListCart() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)

  const handleUpdateQuantity = async (idProduct: number, quantity: number) => {
    console.log(quantity)
    console.log(idProduct)
  }
  return (
    <div className='container min-h-[60vh] w-[60vw] rounded-xl bg-white mt-5 p-3'>
      {/* {isAuthenticated ? (
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
      )} */}
      <div className='w-full'>
        <div className='flex gap-2'>
          <div className='w-[100px] h-[100px] border rounded-xl overflow-hidden'>
            <img
              src='https://ict-cms-prod.s3-sgn09.fptcloud.com/products/2020/11/12/00725093_637407982638531818_mba_2020_gray_1_65d38de74b.png'
              alt=''
            />
          </div>
          <div>
            <h4>Máy tính xách tay Macbook Air 13 2020 M1/8GB/256GB SSD</h4>
            <div className='flex gap-4'>
              <div>
                <p>Màu sắc</p>
                <div>Titan xanh</div>
              </div>
              <div>
                <p>Dung lượng</p>
                <div>Titan xanh</div>
              </div>
              <div>
                <p>Số lượng</p>
                <div>Titan xanh</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}