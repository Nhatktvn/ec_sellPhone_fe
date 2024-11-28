import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
import { getRecommendProduct } from '../../apis/product.api'
import ProductCart from '../Product/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
function RecommendProduct() {
  const [listRecommend, setListRecommend] = useState<product[]>([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
    return () => {
      window.removeEventListener('resize', () => setWindowWidth(window.innerWidth))
    }
  }, [windowWidth])
  useEffect(() => {
    fetchListRecommend()
  }, [])
  const fetchListRecommend = async () => {
    try {
      const getApiRecommend = await getRecommendProduct()
      if (getApiRecommend && getApiRecommend.status == 200) {
        console.log(getApiRecommend)
        setListRecommend(getApiRecommend.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container my-5'>
      <h2 className='text-xl font-bold'>Gợi ý sản phẩm cho bạn</h2>

      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        navigation
        slidesPerView={windowWidth >= 768 ? 6 : 1}
        // pagination={{ type: 'progressbar' }}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        loop={true}
        spaceBetween={20}
      >
        {listRecommend &&
          listRecommend.length > 0 &&
          listRecommend.map((p: product, idx) => (
            <SwiperSlide className='' key={idx}>
              <div
                className={`${className}  rounded-xl shadow-md mb-3 relative group overflow-hidden bg-white w-full grid grid-cols-6 `}
              >
                {product.variantDTOList[0].originalPrice > product.variantDTOList[0].sellPrice ? (
                  <span className='absolute z-10 bg-orange text-white text-xs p-1 top-3 rounded-r-full shadow-sm shadow-white'>
                    Giảm{' '}
                    {Math.floor(
                      ((product.variantDTOList[0].originalPrice - product.variantDTOList[0].sellPrice) /
                        product.variantDTOList[0].originalPrice) *
                        100
                    )}{' '}
                    %
                  </span>
                ) : (
                  ''
                )}
                <div
                  className='bg-orange rounded-full text-white text-2xl w-max p-2 absolute top-2/3 -translate-y-full z-10 right-3 translate-x-14 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 duration-500 ease-out cursor-pointer'
                  title='Chọn sản phẩm'
                  onClick={() => setShowModal(true)}
                >
                  <TbCategoryPlus />
                </div>
                <div className='mt-2 overflow-hidden group p-2 col-span-6'>
                  <img
                    className='w-full h-full group-hover:scale-110 duration-500 ease-out'
                    src={product.urlImage}
                    alt=''
                  />
                </div>
                <div className='p-2 col-span-6 h-max mt-auto'>
                  <div className='paragraph-container'>
                    <Link
                      to={formatUrlLinkProduct(product.category_name, product.name)}
                      className='block text-base hover:text-orange duration-150 w-full whitespace-nowrap overflow-hidden text-ellipsis'
                      state={{ product: product }}
                    >
                      {product.name}
                    </Link>
                  </div>
                  <div>
                    <span className='text-base text-orange font-semibold'>
                      {formatToVND(product.variantDTOList[0].sellPrice)}
                    </span>
                    {product.variantDTOList[0].originalPrice > product.variantDTOList[0].sellPrice && (
                      <span className='text-gray-400 text-sm line-through ml-2'>
                        {formatToVND(product.variantDTOList[0].originalPrice)}
                      </span>
                    )}
                  </div>
                  {/* <div className='rating-outer text-xs my-2'>
          <div className='rating-inner w-[60%]'></div>
        </div> */}
                  <div className='flex gap-2 items-center'>
                    <input type='checkbox' />
                    <label>So sánh</label>
                  </div>
                </div>
                {/* {showModal ? <ModalProduct product={product} setShowModal={setShowModal} /> : null} */}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className='grid grid-cols-12 gap-3'>
        {listRecommend &&
          listRecommend.length > 0 &&
          listRecommend.map((p: product, idx: number) => {
            return <ProductCart product={p} className={'col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2'} />
          })}
      </div>
    </div>
  )
}

export default RecommendProduct
