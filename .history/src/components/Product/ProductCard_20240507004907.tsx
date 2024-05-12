import { Link } from 'react-router-dom'
import { TbCategoryPlus } from 'react-icons/tb'
import { product } from '../../types/product.type'
import { useState } from 'react'
import ModalProduct from '../modalProduct'
interface props {
  product: product
  className: String
}
function ProductCart({ product, className }: props) {
  const [showModal, setShowModal] = useState(false)
  const convertName = (namePhone: string) => {
    const arrLink = namePhone.toLowerCase().split(' ')
    return arrLink.join('-')
  }
  console.log((product.variantDTOList[0].originalPrice - product.variantDTOList[0].sellPrice) /
  product.variantDTOList[0].originalPrice));
  
  return (
    <div className={`${className} bg-white rounded-xl shadow-md mb-3 relative group overflow-hidden`}>
      <span className='absolute z-10 bg-orange text-white text-xs p-1 top-3 rounded-r-full shadow-sm shadow-white'>
        Giảm{' '}
        {((product.variantDTOList[0].originalPrice - product.variantDTOList[0].sellPrice) /
          product.variantDTOList[0].originalPrice) *
          100}
        %
      </span>
      <div
        className='bg-orange rounded-full text-white text-2xl w-max p-2 absolute top-2/3 -translate-y-full z-10 right-3 translate-x-14 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 duration-500 ease-out cursor-pointer'
        title='Chọn sản phẩm'
        onClick={() => setShowModal(true)}
      >
        <TbCategoryPlus />
      </div>
      <div className='mt-2 overflow-hidden group p-2'>
        <img className='w-full h-full group-hover:scale-110 duration-500 ease-out' src={product.urlImage} alt='' />
      </div>
      <div className='p-2'>
        <div className='paragraph-container'>
          <Link
            to={`/dien-thoai/${convertName(product.name)}`}
            className='block text-base hover:text-orange duration-150 w-full whitespace-nowrap overflow-hidden text-ellipsis'
          >
            {product.name}
          </Link>
        </div>
        <div>
          <span className='text-base text-orange font-semibold'>
            {formatToVND(product.variantDTOList[0].price * (1 - product.discount))}
          </span>
          <span className='text-gray-400 text-sm line-through ml-2'>
            {formatToVND(product.variantDTOList[0].price)}
          </span>
        </div>
        {/* <div className='rating-outer text-xs my-2'>
          <div className='rating-inner w-[60%]'></div>
        </div> */}
        <div className='flex gap-2 items-center'>
          <input type='checkbox' />
          <label>So sánh</label>
        </div>
      </div>
      {showModal ? <ModalProduct product={product} setShowModal={setShowModal} /> : null}
    </div>
  )
}
function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.floor(number / 1000) * 1000)
}
export default ProductCart
