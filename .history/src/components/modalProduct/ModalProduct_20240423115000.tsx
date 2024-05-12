import { product } from '../../types/product.type'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
interface props {
  setShowModal: any
  product: product
}
const ModalProduct = ({ setShowModal, product }: props) => {
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className='lg:w-[60vw] border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='grid grid-cols-12 bg-white'>
              <div className='lg:col-span-5'>
                <Swiper
                  navigation
                  slidesPerView={1}
                  spaceBetween={10}
                  modules={[Navigation, Pagination, Autoplay]}
                  loop={true}
                >
                  {product.images &&
                    product.images.length > 0 &&
                    product.images.map((image, idx) => {
                      return (
                        <SwiperSlide key={image.id}>
                          <div
                            className={`container-image object-cover cursor-pointer border-[2px] ${idx === 0 && 'border-orange'}`}
                            style={{
                              height:'300[x'
                              background: `url(${image.urlImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              display: 'flex',
                              justifyContent: 'center',
                              objectFit: 'cover'
                            }}
                          ></div>
                        </SwiperSlide>
                      )
                    })}
                </Swiper>
              </div>
              <div className='lg:col-span-7 bg-red-600'>content</div>
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
  )
}

export default ModalProduct
