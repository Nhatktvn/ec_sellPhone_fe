import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { IoIosCloseCircle } from 'react-icons/io'
import { useEffect, useState } from 'react'
import formatToVND from '../../helpers/currencyFormatter'
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

  const handleDelete = (idx: number) => {
    const viewHistoryStr = localStorage.getItem('historyView')
    const listHistoryView: object[] = viewHistoryStr ? JSON.parse(viewHistoryStr) : []
    listHistoryView.splice(idx, 1)
    localStorage.setItem('historyView', JSON.stringify(listHistoryView))
    getProductFromLocal()
  }

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
        {historyProduct && historyProduct.length > 0
          ? historyProduct.map((p: any, idx) => {
              return (
                <SwiperSlide className='col-span-3' key={p.idx}>
                  <div className='relative col-span-3 grid grid-cols-12 gap-4 border border-gray-300 p-2 rounded-lg'>
                    <div className='col-span-4'>
                      <img src={p.img} alt='' />
                    </div>
                    <div className='col-span-8 flex flex-col justify-between'>
                      <h4>{p.name}</h4>
                      <h4 className='font-bold text-orange'>{formatToVND(p.price)}</h4>
                    </div>
                    <button
                      onClick={() => handleDelete(idx)}
                      className='text-gray-400 absolute top-0 right-0 p-1 cursor-pointer hover:scale-x-125 hover:text-red-600'
                    >
                      <IoIosCloseCircle className='' />
                    </button>
                  </div>
                </SwiperSlide>
              )
            })
          : 'Không có sản phẩm'}
      </Swiper>
    </div>
  )
}
export default HistoryView
