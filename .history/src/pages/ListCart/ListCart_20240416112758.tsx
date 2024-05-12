import { useSelector } from 'react-redux'
import { RootState } from '../../reducer/rootReducer'
import { RiDeleteBin5Fill } from 'react-icons/ri'
export default function ListCart() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)

  const handleUpdateQuantity = async (idProduct: number, quantity: number) => {
    console.log(quantity)
    console.log(idProduct)
  }
  return (
    <div className='container min-h-[60vh] w-[50vw] rounded-xl bg-white mt-5 p-3'>
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
        {cartItems && cartItems.length > 0 && (
          <div className='flex gap-4 relative border-b pb-2'>
            <button className='absolute top-1 right-1 text-xl'>
              <RiDeleteBin5Fill />
            </button>
            <div className='w-[100px] h-[100px] border rounded-xl overflow-hidden'>
              <img
                src='https://ict-cms-prod.s3-sgn09.fptcloud.com/products/2020/11/12/00725093_637407982638531818_mba_2020_gray_1_65d38de74b.png'
                alt=''
              />
            </div>
            <div className='w-full'>
              <h4 className='text-xl font-bold'>Máy tính xách tay Macbook Air 13 2020 M1/8GB/256GB SSD</h4>
              <div className='flex mt-2 justify-between'>
                <div className='flex gap-4 text-sm'>
                  <div>
                    <p>Màu sắc</p>
                    <div className='py-1 px-2 rounded-full border w-max'>Titan xanh</div>
                  </div>
                  <div>
                    <p>Dung lượng</p>
                    <div className='py-1 px-2 rounded-full border w-max'>128GB</div>
                  </div>
                  <div>
                    <p>Số lượng</p>
                    <div>
                      <button className='border text-center py-1 px-2'>-</button>
                      <input type='number' name='' id='' className='border w-[40px] text-center py-1 ' />
                      <button className='border text-center py-1 px-2'>+</button>
                    </div>
                  </div>
                </div>
                <div>
                  <p className='text-xl text-red-600 font-bold'>{formatToVND(23000000)}</p>
                  <p className='text-end line-through text-gray-500'>{formatToVND(27000000)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
