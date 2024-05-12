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
      className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 bg-white rounded-sm shadow-md mb-3'
    >
      <div className='bg-red-400 text-white'>
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
          <h5 className='text-sm'>Điện thoại iPhone 15 Pro Max 256GB</h5>
        </div>
        <div className='mt-3'>
          <span className='text-gray-400 text-sm line-through'>34.990.000&#8363;</span>
          <span className='text-base text-orange ml-2'>30.990.000&#8363;</span>
        </div>
        <div className='rating-outer text-xs my-2'>
          <div className='rating-inner w-[60%]'></div>
        </div>
        <span className='ml-1 text-xs text-black'>Đã bán 4.7k</span>
      </div>
    </Link>
  )
}

export default ProductCart
