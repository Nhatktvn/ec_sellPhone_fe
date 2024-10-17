import { IoMdClose } from 'react-icons/io'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducer/rootReducer'
import { CiStar } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa'
import { addReview } from '../../apis/review.api'
interface props {
  setShowModal: any
  productId: number
}

const ModalReview = ({ setShowModal, productId }: props) => {
  const dispatch = useDispatch()
  const [starReview, setStarReview] = useState<number>(0)
  const [contentReview, setContentReview] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  useEffect(() => {}, [])
  // const convertName = (namePhone: string) => {
  //   const arrLink = namePhone.toLowerCase().split(' ')
  //   return arrLink.join('-')
  // }
  const handleSendReview = async () => {
    try {
      const formData: FormData = new FormData()
      formData.append('name', inputName)
      formData.append('description', inputDes)
      formData.append('image', image)
      const rsSendReview = await addReview()
    } catch (error) {
      console.log(error)
    }
  }

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
          <div className='lg:w-[50vw] border-0 rounded-2xl overflow-hidden shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='bg-white p-3 flex flex-col gap-3'>
              <h2 className='font-bold text-3xl text-center'>Đánh giá</h2>
              <div className='flex gap-3 items-center text-base'>
                <h3>Chất lượng sản phẩm</h3>
                <div className='flex text-2xl'>
                  {[1, 2, 3, 4, 5].map((star) => {
                    if (star <= starReview) {
                      return (
                        <span className='cursor-pointer text-yellow-400' key={star} onClick={() => setStarReview(star)}>
                          <FaStar />
                        </span>
                      )
                    }
                    return (
                      <span className='cursor-pointer text-yellow-400' key={star} onClick={() => setStarReview(star)}>
                        <CiStar />
                      </span>
                    )
                  })}
                </div>
              </div>
              <div>
                <h3>Hình ảnh</h3>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  onChange={(e) => e.target.files && setImage(e.target.files[0])}
                />
              </div>
              <div>
                <h3>Nội dung</h3>
                <textarea
                  placeholder='Enter description...'
                  className='border px-2 border-gray-500 rounded-md min-h-[100px] w-full py-1'
                  id='name'
                  name='name'
                  value={contentReview}
                  onChange={(e) => setContentReview(e.target.value)}
                ></textarea>
              </div>
            </div>
            {/*footer*/}
            <div className='text-right font-bold text-white px-5 py-3'>
              <button className='p-2 bg-slate-400 rounded-lg text-center mr-4' onClick={() => setShowModal(false)}>
                Hủy
              </button>
              <button className='p-2 bg-blue-600 rounded-lg text-center' onClick={handleSendReview}>
                Đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  )
}

export default ModalReview
