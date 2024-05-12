import { product } from '../../types/product.type'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useEffect, useState } from 'react'
interface props {
  setShowModal: any
  product: product
}

interface objVariant {
  [key: string]: storagePrice[]
}

interface storagePrice {
  storage: string
  price: number
}
const ModalProduct = ({ setShowModal, product }: props) => {
  console.log(product.variantDTOList)
  const [listStorage, setListStorage] = useState<storagePrice[]>()
  const [listColor, setListColor] = useState<string[]>()
  const [storageSelect, setStorageSelect] = useState<string>('')
  const [colorSelect, setColorSelect] = useState<any>('')
  const [quantity, setQuantity] = useState<number>(1)
  const [variant, setVariant] = useState<objVariant>()
  useEffect(() => {
    handleGetVariant()
  }, [])
  const handleGetVariant = () => {
    const objVariant: objVariant = {}
    const colors: string[] = []
    product &&
      product?.variantDTOList.map((variant) => {
        if (!colors.includes(variant.color)) {
          colors.push(variant.color)
        }
      })
    setListColor(colors)
    setColorSelect(colors[0])

    colors.map((color) => {
      const storages: storagePrice[] = []
      product &&
        product?.variantDTOList.map((variant) => {
          if (variant.color === color) {
            const objStoragePrice: storagePrice = { storage: variant.storageCapacity, price: variant.price }
            storages.push(objStoragePrice)
          }
        })
      objVariant[`${color}`] = storages
    })
    setVariant(objVariant)
    const listStorageByColor = objVariant[`${colors[0]}`]
    const colorFist: storagePrice | undefined = listStorageByColor && listStorageByColor[0]
    setListStorage(listStorageByColor)
    setStorageSelect(colorFist && colorFist.storage)
  }
  console.log(listColor)
  console.log(listStorage)

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none '>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className='lg:w-[60vw] border-0 rounded-2xl overflow-hidden shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='grid grid-cols-12 bg-white py-5'>
              <div className='lg:col-span-5 m-2'>
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
                            className={`container-image object-cover cursor-pointer}`}
                            style={{
                              height: '300px',
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
              <div className='lg:col-span-7 p-2'>
                <h3 className='text-2xl font-semibold w-full border-b pb-4 pt-2'>{product.name}</h3>
                <div className='mt-2 text-sm'>
                  <span className='text-gray-500'>Màu sắc</span>
                  <ul className='flex gap-5'>
                    {listColor &&
                      listColor.map((color, idx) => {
                        return (
                          <li
                            onClick={() => setColorSelect(color)}
                            key={idx}
                            className={`border p-2 rounded-md cursor-pointer mt-1 ${color == colorSelect && 'border-orange'}`}
                          >
                            {color}
                          </li>
                        )
                      })}
                  </ul>
                </div>
                <div className='mt-2 text-sm'>
                  <span className='text-gray-500 '>Dung lượng</span>
                  <div className='flex gap-5 mt-2'>
                    {listStorage &&
                      listStorage.map((storage, idx) => {
                        return (
                          <label
                            key={idx}
                            htmlFor={`${storage.storage}`}
                            className={`border p-2 rounded-md cursor-pointer ${storageSelect === storage.storage && 'border-orange'}`}
                          >
                            <div className='font-semibold text-center flex gap-1 justify-center items-center'>
                              <input
                                checked={storage.storage === storageSelect}
                                type='radio'
                                name='storage'
                                id={`${storage.storage}`}
                                onChange={() => setStorageSelect(storage.storage)}
                              />
                              {storage.storage}
                            </div>
                            <h4>{formatToVND(storage.price)}</h4>
                          </label>
                        )
                      })}
                  </div>
                </div>
                <div className='mt-3 flex'>
                  <div className='text-sm text-gray-500'>Số lượng</div>
                  <div className='flex items-center gap-3'>
                    <div className='flex rounded-sm overflow-hidden'>
                      <button className='border py-1 px-3' onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                        -
                      </button>
                      <input
                        type='number'
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className='w-[50px] text-center border'
                      />
                      <button className='border py-1  px-3' onClick={() => setQuantity(quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button className='uppercase bg-orange text-white font-bold p-2'>Thêm vào giỏ</button>
                </div>
              </div>
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  )
}
function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.floor(number / 1000) * 1000)
}
export default ModalProduct