import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useEffect, useState } from 'react'
import { getProductByName } from '../../apis/product.api'
import { imageProduct, product } from '../../types/product.type'
import { add, forEach, set } from 'lodash'
import { toast } from 'react-toastify'
import { addToCart } from '../../apis/cart.api'
import { IoCartOutline } from 'react-icons/io5'
interface objVariant {
  [key: string]: storagePrice[]
}

interface storagePrice {
  storage: string
  price: number
}
const ProductDetail = () => {
  const { id } = useParams()
  const [imagePreview, setImagePreview] = useState<any>(null)
  const [product, setProduct] = useState<product>()
  const [variant, setVariant] = useState<objVariant>()
  const [listStorage, setListStorage] = useState<storagePrice[]>()
  const [listColor, setListColor] = useState<string[]>()
  const [storageSelect, setStorageSelect] = useState<string>('')
  const [colorSelect, setColorSelect] = useState<any>('')
  const [quantity, setQuantity] = useState<number>(1)
  const handleSelectedImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, linkImage: string) => {
    setImagePreview(linkImage)
    document.querySelectorAll('.container-image').forEach((child) => {
      const element = child as HTMLInputElement
      element.style.border = 'none'
    })
    const element = e.target as HTMLInputElement
    element.style.border = '2px solid #cd1817'
  }
  useEffect(() => {
    getDetailProduct()
  }, [])
  useEffect(() => {
    handleGetVariant()
  }, [product])

  console.log(colorSelect)

  const getDetailProduct = async () => {
    try {
      const nameProduct = id?.split('-').join(' ')
      const rs = await getProductByName('Iphone 15 Pro')
      if (rs && rs.status === 200) {
        setProduct(rs.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

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

  const handleClickColor = (color: string) => {
    setColorSelect(color)
    const listStorageByColor = variant && variant[`${color}`]
    console.log(listStorageByColor)

    setListStorage(listStorageByColor)
  }

  const handleAddCart = async () => {
    // try {
    //   const rsAddToCart = await addToCart({ quantity })
    // } catch (error) {
    //   console.log(error)
    // }
  }
  return (
    <div className='container'>
      <div className='my-4 p-4 grid grid-cols-12 bg-white'>
        <div className='col-span-5'>
          <div className='w-full h-[500px] mb-5'>
            <img src={imagePreview || product?.images[0].urlImage} alt='' />
          </div>
          <Swiper
            navigation
            slidesPerView={4}
            spaceBetween={10}
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
          >
            {product?.images &&
              product.images.length > 0 &&
              product.images.map((image: imageProduct, idx) => {
                return (
                  <SwiperSlide key={image.id}>
                    <div
                      className={`container-image object-cover cursor-pointer border-[2px] ${idx === 0 && 'border-orange'}`}
                      style={{
                        height: '100px',
                        background: `url(${image.urlImage})`,
                        backgroundSize: '100% 100%',
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => handleSelectedImage(e, `${image.urlImage}`)}
                    ></div>
                  </SwiperSlide>
                )
              })}
          </Swiper>
        </div>
        <div className='col-span-7 ml-5'>
          <h3 className='text-3xl'>{`${product == undefined ? '' : product.name} ${storageSelect == undefined ? '' : storageSelect}`}</h3>
          <div className='flex items-center gap-5'>
            <div className='rating-outer my-2 !text-orange text-base'>
              <div className='rating-inner w-[60%] !text-orange'></div>
            </div>
            <div className='text-gray-400 text-sm'>
              <span className='underline text-black'>239</span> Đánh giá
            </div>
          </div>
          <div className='grid grid-cols-12 mt-5 ml-3'>
            <div className='col-span-2 text-sm text-gray-500'>Màu Sắc</div>
            <div className='col-span-10 flex flex-wrap gap-2'>
              {/* <button className='flex items-center gap-2 border p-1 text-sm rounded-sm'>
                <div className='w-[25px] h-[25px]'>
                  <img src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq48pn3sqdw2b7' alt='' />
                </div>
                <span>ATN5641-DEN</span>
              </button> */}
              {listColor &&
                listColor.map((color, idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => handleClickColor(color)}
                      className={`flex items-center gap-2 border p-1 text-sm rounded-sm ${color === colorSelect && 'border-orange'}`}
                    >
                      {/* <div className='w-[25px] h-[25px]'>
                          <img src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq48pn3sqdw2b7' alt='' />
                        </div> */}
                      <span>{color}</span>
                    </button>
                  )
                })}
            </div>
          </div>
          <div className='grid grid-cols-12 mt-7 ml-3'>
            <div className='col-span-2 text-sm text-gray-500'>Size</div>
            <div className='col-span-10 flex flex-wrap gap-2'>
              {listStorage &&
                listStorage.map((storage, idx) => {
                  return (
                    <label
                      htmlFor={`${storage.storage}`}
                      className={`cursor-pointer text-center p-2 text-sm rounded-sm border ${storage.storage === storageSelect && 'border-orange'}`}
                    >
                      <div className='font-semibold'>
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
          <div className='grid grid-cols-12 mt-7 ml-3'>
            <div className='col-span-2 text-sm text-gray-500'>Số lượng</div>
            <div className='col-span-10 flex items-center gap-3'>
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
              <span className='text-gray-500 text-sm'>880 sản phẩm có sẵn</span>
            </div>
          </div>
          <div className='mt-10 ml-3 w-max'>
            <div className='flex gap-3'>
              <button className='bg-orange relative text-white text-sm p-3 min-w-[140px] hover:opacity-90 rounded-xl group'>
                <span className='font-semibold'>MUA NGAY</span>
                <span className='w-full absolute h-full bg-white left-0 opacity-50 top-0 -translate-y-full group-hover:translate-y-0 group-hover:opacity-0 duration-500'></span>
                <span className='block'>{`(Giao hàng tận nơi hoặc mua tại cửa hàng)`}</span>
              </button>
              <button
                className='text-sm text-orange border border-orange p-2 min-w-[140px] hover:opacity-90 rounded-xl flex flex-col justify-center items-center hover:bg-orange hover:text-white duration-200'
                onClick={handleAddCart}
              >
                <IoCartOutline className='text-2xl' />
                Thêm vào giỏ
              </button>
            </div>
            <div className=' bg-blue-500 text-white font-semibold'>
              <button>GỌI TƯ VẤN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
export default ProductDetail
