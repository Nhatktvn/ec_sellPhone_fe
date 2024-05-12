import { Link } from 'react-router-dom'
import { TbCategoryPlus } from 'react-icons/tb'
function ProductCart() {
  const namePhone = 'Điện thoại iPhone 15 Pro Max 256GB'
  const arrLink = namePhone.toLowerCase().split(' ')
  const nameLink = arrLink.slice(0, arrLink.length - 1).join('-')
  console.log(nameLink)

  return (
    <Link
      to={'/dien-thoai/iphone-15-pro'}
      className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 bg-white rounded-xl shadow-md mb-3 relative group overflow-hidden'
    >
      <span className='absolute z-10 bg-orange text-white'>Giảm 9%</span>
      <div
        className='bg-orange rounded-full text-white text-2xl w-max p-2 absolute top-2/3 -translate-y-full z-10 right-3 translate-x-14 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 duration-500 ease-out'
        title='Chọn sản phẩm'
      >
        <TbCategoryPlus />
      </div>
      <div className='mt-2 overflow-hidden group'>
        <img
          className='group-hover:scale-110 duration-500 ease-out'
          src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg'
          alt=''
        />
      </div>
      <div className='p-2'>
        <div className='paragraph-container'>
          <Link
            to={'/'}
            className='block text-base hover:text-orange duration-150 w-full whitespace-nowrap overflow-hidden text-ellipsis'
          >
            Điện thoại iPhone 15 Pro Max 256GB
          </Link>
        </div>
        <div className='  '>
          <span className='text-base text-orange font-semibold'>30.990.000&#8363;</span>
          <span className='text-gray-400 text-sm line-through ml-2'>34.990.000&#8363;</span>
        </div>
        <div className='rating-outer text-xs my-2'>
          <div className='rating-inner w-[60%]'></div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCart
