import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducer/rootReducer'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { deleteCartItem, getListCart } from '../../apis/cart.api'
import { toast } from 'react-toastify'
import { cartList } from '../../slices/cartSlice'
import { Link } from 'react-router-dom'
import { useState } from 'react'
export default function ListCart() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const [showModal, setShowModal] = useState(false)
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
    <div className='container min-h-[60vh] w-max rounded-xl bg-white mt-5 p-3'>
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
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>Modal Title</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='relative p-6 flex-auto'>
                  <p className='my-4 text-blueGray-500 text-lg leading-relaxed'>
                    I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts-
                    their perception of themselves! They're slowed down by their perception of themselves. If you're
                    taught you can’t do anything, you won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </div>
  )
}

function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
