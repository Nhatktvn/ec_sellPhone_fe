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
        <div className='col-span-7 ml-5'></div>
      </div>
    </div>
  )
}

function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
export default ProductDetail
