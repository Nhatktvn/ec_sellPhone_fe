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
import { addToCart, getListCart } from '../../apis/cart.api'
import { IoCartOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { cartList } from '../../slices/cartSlice'
import { FaHeart } from 'react-icons/fa'
import { CiHeart } from 'react-icons/ci'
import { RootState } from '../../reducer/rootReducer'
interface objVariant {
  [key: string]: storagePrice[]
}

interface storagePrice {
  storage: string
  price: number
}
const ProductDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  console.log(isAuthenticated)
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

  const getDetailProduct = async () => {
    try {
      const nameProduct: string | undefined = id?.split('-').join(' ')
      const rs = await getProductByName(nameProduct)
      if (rs && rs.status === 200) {
        setProduct(rs.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(product)

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
            const objStoragePrice: storagePrice = { storage: variant.storageCapacity, price: variant.sellPrice }
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
    try {
      if (!isAuthenticated) {
        toast.warning('Vui lòng đăng nhập để thêm vào giỏ')
        return
      }
      const dataAddCart = {
        idProduct: product ? product.id : 1,
        quantity: quantity,
        color: colorSelect,
        storage: storageSelect
      }
      const rsAddToCart = await addToCart(dataAddCart)
      if (rsAddToCart && rsAddToCart.status == 201) {
        console.log(rsAddToCart)
        toast.success('Thêm vào giỏ thành công')
        const getCartItems = await getListCart()
        if (getCartItems && getCartItems.status === 200) {
          dispatch(cartList(getCartItems.data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {!product ? (
        <div className='w-full mt-10'>
          <span className='mx-auto animate-spin h-10 w-10 block border-[4px] border-l-transparent rounded-full border-spacing-2 border-orange z-10'></span>
        </div>
      ) : (
        <div className='container'>
          <div className='grid grid-cols-12 bg-white rounded-xl p-4 my-4'>
            <div className='col-span-12 md:col-span-6 lg:col-span-5'>
              <div className='w-full h-[400px] mb-5 flex justify-center'>
                <img className='w-full h-full object-cover' src={imagePreview || product?.images[0].urlImage} alt='' />
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
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            objectFit: 'cover'
                          }}
                          onMouseEnter={(e) => handleSelectedImage(e, `${image.urlImage}`)}
                        ></div>
                      </SwiperSlide>
                    )
                  })}
              </Swiper>
            </div>
            <div className='col-span-12 md:col-span-6 lg:col-span-7 mt-5 relative pl-5'>
              <button className='text-orange h-max absolute top-2 right-2 text-4xl font-bold'>
                {true ? (
                  <span>
                    <FaHeart />
                  </span>
                ) : (
                  <span>
                    <CiHeart />
                  </span>
                )}
              </button>

              <div>
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
                            key={idx}
                            htmlFor={`${storage.storage}`}
                            className={`cursor-pointer text-center p-2 text-sm rounded-sm border ${storage.storage === storageSelect && 'border-orange'}`}
                          >
                            <div className='font-semibold'>
                              <input
                                checked={storage.storage === storageSelect}
                                type='radio'
                                name='storage'
                                className='hidden'
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
                    <button className='bg-orange relative text-white text-sm p-3 min-w-[140px] hover:opacity-90 rounded-xl group overflow-hidden'>
                      <span className='font-semibold'>MUA NGAY</span>
                      <span className='w-full absolute h-full bg-white left-0 opacity-50 top-0 -translate-y-full group-hover:translate-y-0 group-hover:opacity-0 duration-500'></span>
                      <span className='block md:hidden lg:block'>{`(Giao hàng tận nơi hoặc mua tại cửa hàng)`}</span>
                    </button>
                    <button
                      className='text-sm text-orange border border-orange p-2 min-w-[140px] hover:opacity-90 rounded-xl flex flex-col justify-center items-center hover:bg-orange hover:text-white duration-200'
                      onClick={handleAddCart}
                    >
                      <IoCartOutline className='text-2xl' />
                      Thêm vào giỏ
                    </button>
                  </div>
                  <div className=' bg-blue-500 text-white mt-3 rounded-xl overflow-hidden text-sm hover:bg-blue-700 duration-200'>
                    <button className='w-full flex flex-col justify-center items-center p-2'>
                      <span className='font-semibold'>GỌI TƯ VẤN</span>
                      <span>{`(Chúng tôi hỗ trợ 24/7)`}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-8 rounded-xl bg-white p-2 text-orange text-lg font-semibold'>
              <h3 className='text-lg font-semibold uppercase'>Thông tin chi tiết</h3>
            </div>
            <div className='col-span-4 rounded-xl bg-white p-2'>
              <h3 className='text-lg font-semibold uppercase'>Thông số kỹ thuật</h3>
              <table className='table-auto'>
                <tbody>
                  <tr className='mb-4'>
                    <td className='w-max block mr-5'>Kích thước màn hình:</td>
                    <td>{product.specificationDTO.sizeScreen}</td>
                  </tr>
                  <tr>
                    <td className='w-max'>Công nghệ màn hình:</td>
                    <td>{product.specificationDTO.screenTechnology}</td>
                  </tr>
                  <tr>
                    <td className='w-max'>Camera sau:</td>
                    <td>{product.specificationDTO.cameraRear}</td>
                  </tr>
                  <tr>
                    <td className='w-max'>Camera trước:</td>
                    <td>{product.specificationDTO.cameraFront}</td>
                  </tr>
                  <tr>
                    <td className='w-max'>Chipset:</td>
                    <td>{product.specificationDTO.chipset}</td>
                  </tr>
                  <tr>
                    <td className='w-max'>Ram:</td>
                    <td>{product.specificationDTO.ram}</td>
                  </tr>
                  <tr>
                    <td className='w-max'>Rom:</td>
                    <td>{product.specificationDTO.rom}</td>
                  </tr>
                  <tr>
                    <td className='w-max'>Dung lượng pin:</td>
                    <td>{product.specificationDTO.battery}</td>
                  </tr>
                  <tr>
                    <td className='w-max'>Độ phân giải:</td>
                    <td>{product.specificationDTO.screenResolution}</td>
                  </tr>
                  <tr>
                    <td className='w-max'>Hệ điều hành:</td>
                    <td>{product.specificationDTO.operaSystem}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
export default ProductDetail
