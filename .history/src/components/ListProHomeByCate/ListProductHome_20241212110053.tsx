import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
import { getProductFilter } from '../../apis/product.api'
import ProductCard from '../Product/ProductCard'
import { FaLaptop } from 'react-icons/fa'
import { getBrandByCategoryId } from '../../apis/brand.api'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
interface category {
  id: number
  name: string
}

const ListProductHome = (cate: category) => {
  const [dataProducts, setDataProduct] = useState<product[] | null>()
  const [listBrand, setListBrand] = useState<any[]>([])
  const [brandChoose, setBrandChoose] = useState<string>('')
  useEffect(() => {
    getListProduct()
    getListBrand()
  }, [])
  useEffect(() => {
    getListProduct()
  }, [brandChoose])
  const getListProduct = async () => {
    try {
      const rsGetProducts = await getProductFilter(
        `?category=${cate.id}&maxPrice=500000000${brandChoose ? `&brand=${brandChoose.toLowerCase()}` : ''}`
      )
      console.log(rsGetProducts)

      if (rsGetProducts && rsGetProducts.status === 200) {
        console.log(rsGetProducts.data)
        setDataProduct(rsGetProducts.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getListBrand = async () => {
    try {
      const fetchGetBrandByCate = await getBrandByCategoryId(cate.id)
      if (fetchGetBrandByCate && fetchGetBrandByCate.status == 200) {
        console.log(fetchGetBrandByCate)
        setListBrand(fetchGetBrandByCate.data)
      }
    } catch (error) {}
  }
  return (
    <div className='container p-0 my-10'>
      <div className='bg-orange p-3 font-bold text-white text-2xl rounded-t-lg flex gap-2 items-center justify-between'>
        <h3 className='flex gap-2 items-center'>
          <FaLaptop /> {cate.name}
        </h3>
        <ul className='flex gap-4 items-center'>
          <li
            className={`text-base font-normal cursor-pointer p-2
           ${!brandChoose && 'border-2 border-white rounded-lg'}`}
            onClick={() => setBrandChoose('')}
          >
            Tất cả
          </li>
          {listBrand &&
            listBrand.length > 0 &&
            listBrand.map((brand) => {
              return (
                <li
                  onClick={() => setBrandChoose(brand.name)}
                  className={`text-base font-normal cursor-pointer p-2 ${brandChoose === brand.name && 'border-2 border-white rounded-lg'}`}
                  key={brand.id}
                >
                  {brand.name}
                </li>
              )
            })}
        </ul>
      </div>
      <div className='px-3 bg-white'>
        <Swiper
          className='grid grid-cols-12 mt-2 w-full'
          // autoplay={{
          //   delay: 2000,
          //   disableOnInteraction: false
          // }}
          navigation
          slidesPerView={5}
          // pagination={{ type: 'progressbar' }}
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          // loop={true}
          spaceBetween={20}
        >
          {dataProducts &&
            dataProducts.length > 0 &&
            dataProducts.map((product, idx) => {
              return (
                <SwiperSlide className='col-span-3 ' key={idx}>
                  <ProductCard
                    key={idx}
                    className={'col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2'}
                    product={product}
                  />
                </SwiperSlide>
              )
            })}
        </Swiper>
      </div>
      <div className='grid grid-cols-12 lg:grid-cols-10 gap-3 p-5 bg-white '>
        {dataProducts &&
          dataProducts.length > 0 &&
          dataProducts.map((product, idx) => (
            <ProductCard
              key={idx}
              className={'col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2'}
              product={product}
            />
          ))}
      </div>
    </div>
  )
}

export default ListProductHome
