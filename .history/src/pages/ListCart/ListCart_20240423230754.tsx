import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducer/rootReducer'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { deleteCartItem, getListCart } from '../../apis/cart.api'
import { toast } from 'react-toastify'
import { cartList } from '../../slices/cartSlice'
import { Link } from 'react-router-dom'
export default function ListCart() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)
  const dispatch = useDispatch()
  const handleUpdateQuantity = async (idProduct: number, quantity: number) => {
    console.log(quantity)
    console.log(idProduct)
  }
  const handleDeleteItem = async (idCartItem: number) => {
    try {
      const rs = await deleteCartItem(idCartItem)
      if (rs && rs.status === 200) {
        toast.success('Xóa sản phẩm thành công')
      }
      getCountCart()
    } catch (error) {
      console.log(error)
    }
  }

  const getCountCart = async () => {
    try {
      const rsGetCart = await getListCart()
      if (rsGetCart && rsGetCart.status === 200) {
        console.log(rsGetCart.data)
        dispatch(cartList(rsGetCart.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container grid grid-cols-12 gap-3 mt-5'>
      <div className='lg:col-span-7 rounded-xl bg-white p-3'>
        {isAuthenticated ? (
          cartItems && cartItems.length > 0 ? (
            <div className='w-full'>
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item, idx) => (
                  <div key={idx} className='flex gap-4 relative border-b p-2'>
                    <button onClick={() => handleDeleteItem(item.id)} className='absolute top-1 right-1 text-xl'>
                      <RiDeleteBin5Fill />
                    </button>
                    <div className='w-[100px] h-[100px] border rounded-xl overflow-hidden'>
                      <img src={item.urlImage} alt='' />
                    </div>
                    <div className='w-full'>
                      <h4 className='text-xl font-bold'>{item.name}</h4>
                      <div className='flex mt-2 justify-between'>
                        <div className='gap-4 text-sm grid grid-cols-12'>
                          <div className='col-span-3'>
                            <p>Màu sắc</p>
                            <div className='py-1 px-2 rounded-full border w-max'>{item.color}</div>
                          </div>
                          <div className='col-span-3'>
                            <p>Dung lượng</p>
                            <div className='py-1 px-2 rounded-full border w-max'>{item.storageCapacity}</div>
                          </div>
                          <div className='col-span-3'>
                            <p>Số lượng</p>
                            <div>
                              <button className='border text-center py-1 px-2'>-</button>
                              <input
                                type='number'
                                defaultValue={item.quantity}
                                name=''
                                id=''
                                className='border w-[40px] text-center py-1 '
                              />
                              <button className='border text-center py-1 px-2'>+</button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className='text-xl text-red-600 font-bold'>
                            {formatToVND(item.unitPrice * (1 - item.discount) * item.quantity)}
                          </p>
                          <p className='text-end line-through text-gray-500'>{formatToVND(item.unitPrice)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <span className='bg-[#fff3cd] w-full block p-3 text-[#856404] rounded-lg md:w-[650px]'>
              Không có sản phẩm nào. Quay lại{' '}
              <Link to={'/'} className='font-bold'>
                cửa hàng
              </Link>{' '}
              để tiếp tục mua sắm.
            </span>
          )
        ) : (
          <span className='bg-[#fff3cd] w-full block p-3 text-[#856404] rounded-lg md:w-[650px]'>
            Vui lòng{' '}
            <Link to={'/dang-nhap'} className='font-bold'>
              đăng nhập
            </Link>{' '}
            để xem giỏ hàng.
          </span>
        )}
      </div>
      <div className='lg:col-span-5 h-full bg-white rounded-xl p-3'>
        <h3 className='uppercase text-xl'>Thông tin khách hàng</h3>
        <div className='flex gap-2 mt-2'>
          <div className='flex items-center gap-1'>
            <input type='radio' name='gender' id='male' />
            <label htmlFor='male'>Anh</label>
          </div>
          <div className='flex items-center gap-1'>
            <input type='radio' name='gender' id='female' />
            <label htmlFor='female'>Chị</label>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-2 mt-4'>
          <input className='col-span-6 border' type='text' placeholder='Họ và tên' />
          <input className='col-span-6 border' type='text' placeholder='Số điện thoại' />
        </div>
      </div>
    </div>
  )
}

function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
