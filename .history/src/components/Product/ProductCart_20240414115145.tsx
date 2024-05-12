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
      className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 bg-white rounded-sm shadow-md mb-3 relative group overflow-hidden'
    >
      <div className='bg-orange rounded-full text-white text-2xl w-max p-2 absolute top-2/3 -translate-y-full z-10 right-3 translate-x-14 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 duration-500 ease-out'>
        <TbCategoryPlus />
      </div>

      <div className='p-2'>
        <div className='paragraph-container'>
          <Link to={'/'} className='text-sm hover:text-orange duration-150'>
            Điện thoại iPhone 15 Pro Max 256GB
          </Link>
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
