import { product } from '../../types/product.type'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { IoMdClose } from 'react-icons/io'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addToCart, getListCart } from '../../apis/cart.api'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducer/rootReducer'
import { cartList } from '../../slices/cartSlice'
interface props {
  setShowModal: any
  productId: number
}

const ModalReview = ({ setShowModal, productId }: props) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  useEffect(() => {}, [])
  // const convertName = (namePhone: string) => {
  //   const arrLink = namePhone.toLowerCase().split(' ')
  //   return arrLink.join('-')
  // }
  console.log(productId)

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none '>
        <div className='relative my-6 mx-auto w-max'>
          <span
            className='text-orange text-2xl cursor-pointer absolute top-5 right-5 z-[100]'
            onClick={() => setShowModal(false)}
          >
            <IoMdClose />
          </span>
          {/*content*/}
          <div className='lg:w-[60vw] border-0 rounded-2xl overflow-hidden shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='bg-white p-3'>
              <h2 className='font-bold text-2xl'>Đánh giá</h2>
              <div className='flex gap-3 items-center'>
                <h3>Chất lượng sản phẩm</h3>
                <div className='rating-outer my-2 !text-orange text-2xl '>
                  {/* <div className='rating-inner w-[20%] !text-orange'></div> */}
                </div>
              </div>
            </div>
            {/*footer*/}
            '★' : '☆'
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  )
}

export default ModalReview
