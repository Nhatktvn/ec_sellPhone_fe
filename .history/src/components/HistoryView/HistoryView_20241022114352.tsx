import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { IoIosCloseCircle } from 'react-icons/io'
import { useEffect, useState } from 'react'
function HistoryView() {
  const [historyProduct, setHistoryProduct] = useState<object[]>([])
  useEffect(() => {
    getProductFromLocal()
  }, [])
  const getProductFromLocal = () => {
    const viewHistoryStr = localStorage.getItem('historyView')
    const listHistoryView: object[] = viewHistoryStr ? JSON.parse(viewHistoryStr) : []
    setHistoryProduct(listHistoryView)
  }
  console.log(historyProduct)

  return (
    <div className='container bg-white py-3 rounded-lg'>
      <h2 className='font-bold text-xl'>Sản phẩm đã xem</h2>

      <Swiper
        className='grid grid-cols-12 mt-2'
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: false
        // }}
        navigation
        slidesPerView={4}
        // pagination={{ type: 'progressbar' }}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        // loop={true}
        spaceBetween={20}
      >
        {historyProduct &&
          historyProduct.map((p, idx) => {
            return (
              <SwiperSlide className='col-span-3 '>
                <div className='relative col-span-3 grid grid-cols-12 gap-4 border border-gray-300 p-2 rounded-lg'>
                  <div className='col-span-4'>
                    <img
                      src='https://cdn.tgdd.vn/Products/Images/44/329075/acer-aspire-3-a315-58-529v-i5-nxaddsv00n-140924-125407-600x600.jpg'
                      alt=''
                    />
                  </div>
                  <div className='col-span-8 flex flex-col justify-between'>
                    <h4>iPhone 13 Pro Max</h4>
                    <h4 className='font-bold text-orange'>9.590.000 ₫</h4>
                  </div>
                  <button className='text-gray-400 absolute top-0 right-0 p-1 cursor-pointer'>
                    <IoIosCloseCircle className='' />
                  </button>
                </div>
              </SwiperSlide>
            )
          })}
        <SwiperSlide className='col-span-3 '>
          <div className=' grid grid-cols-12 gap-4 border border-gray-300 p-2 rounded-lg'>
            <div className='col-span-4'>
              <img
                src='https://cdn.tgdd.vn/Products/Images/44/329075/acer-aspire-3-a315-58-529v-i5-nxaddsv00n-140924-125407-600x600.jpg'
                alt=''
              />
            </div>
            <div className='col-span-8 flex flex-col justify-between'>
              <h4>iPhone 13 Pro Max</h4>
              <h4 className='font-bold text-orange'>9.590.000 ₫</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='col-span-3 '>
          <div className='col-span-3 grid grid-cols-12 gap-4 border border-gray-300 p-2 rounded-lg'>
            <div className='col-span-4'>
              <img
                src='https://cdn.tgdd.vn/Products/Images/44/329075/acer-aspire-3-a315-58-529v-i5-nxaddsv00n-140924-125407-600x600.jpg'
                alt=''
              />
            </div>
            <div className='col-span-8 flex flex-col justify-between'>
              <h4>iPhone 13 Pro Max</h4>
              <h4 className='font-bold text-orange'>9.590.000 ₫</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='col-span-3 '>
          <div className='col-span-3 grid grid-cols-12 gap-4 border border-gray-300 p-2 rounded-lg'>
            <div className='col-span-4'>
              <img
                src='https://cdn.tgdd.vn/Products/Images/44/329075/acer-aspire-3-a315-58-529v-i5-nxaddsv00n-140924-125407-600x600.jpg'
                alt=''
              />
            </div>
            <div className='col-span-8 flex flex-col justify-between'>
              <h4>iPhone 13 Pro Max</h4>
              <h4 className='font-bold text-orange'>9.590.000 ₫</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='col-span-3 '>
          <div className='col-span-3 grid grid-cols-12 gap-4 border border-gray-300 p-2 rounded-lg'>
            <div className='col-span-4'>
              <img
                src='https://cdn.tgdd.vn/Products/Images/44/329075/acer-aspire-3-a315-58-529v-i5-nxaddsv00n-140924-125407-600x600.jpg'
                alt=''
              />
            </div>
            <div className='col-span-8 flex flex-col justify-between'>
              <h4>iPhone 13 Pro Max</h4>
              <h4 className='font-bold text-orange'>9.590.000 ₫</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='col-span-3 '>
          <div className='col-span-3 grid grid-cols-12 gap-4 border border-gray-300 p-2 rounded-lg'>
            <div className='col-span-4'>
              <img
                src='https://cdn.tgdd.vn/Products/Images/44/329075/acer-aspire-3-a315-58-529v-i5-nxaddsv00n-140924-125407-600x600.jpg'
                alt=''
              />
            </div>
            <div className='col-span-8 flex flex-col justify-between'>
              <h4>iPhone 13 Pro Max</h4>
              <h4 className='font-bold text-orange'>9.590.000 ₫</h4>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default HistoryView