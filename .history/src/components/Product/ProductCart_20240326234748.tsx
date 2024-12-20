function ProductCart() {
  const namePhone = 'Điện thoại iPhone 15 Pro Max 256GB'
  const nameLink = namePhone.split('').join('-')
  console.log(nameLink)

  return (
    <div className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 bg-white rounded-sm shadow-md mb-3'>
      <div className='mt-2'>
        <img
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
        <div className='text-xs text-gray-400'>TP. Hồ Chí Minh</div>
      </div>
    </div>
  )
}

export default ProductCart
