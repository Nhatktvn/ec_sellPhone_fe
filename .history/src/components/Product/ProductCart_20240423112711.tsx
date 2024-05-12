import { Link } from 'react-router-dom'
import { TbCategoryPlus } from 'react-icons/tb'
import { product } from '../../types/product.type'
import { useState } from 'react'
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

  console.log(className)

  return (
    <div className={`${className} bg-white rounded-xl shadow-md mb-3 relative group overflow-hidden`}>
      <span className='absolute z-10 bg-orange text-white text-xs p-1 top-3 rounded-r-full shadow-sm shadow-white'>
        Giảm {product.discount * 100}%
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
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>Modal Title</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='relative p-6 flex-auto'>
                  <p className='my-4 text-blueGray-500 text-lg leading-relaxed'>
                    I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts-
                    their perception of themselves! They're slowed down by their perception of themselves. If you're
                    taught you can’t do anything, you won’t do anything. I was taught I could do everything.
                  </p>
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
      ) : null}
    </div>
  )
}
function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
export default ProductCart
