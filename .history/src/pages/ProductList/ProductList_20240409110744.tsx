import { Link } from 'react-router-dom'

export default function ProductList() {
  return (
    <div className='container'>
      <div className='main-filter mt-5 grid grid-cols-12'>
        <div className='col-span-3 md:col-span-3 pl-5'>
          <div className='mb-7'>
            <h3 className='py-3 mb-2 font-bold '>Hãng sản xuất</h3>
            <div className='text-sm grid grid-cols-2 gap-3'>
              <div className='col-span-1 flex gap-2 items-center'>
                <input type='checkbox' name='' id='' className='mr-2 ' />
                <label htmlFor=''>Tất cả</label>
              </div>
              <div className='col-span-1 flex gap-2 items-center'>
                <input type='checkbox' name='' id='' className='mr-2 ' />
                <label htmlFor=''>Apple</label>
              </div>
              <div className='col-span-1 flex gap-2 items-center'>
                <input type='checkbox' name='' id='' className='mr-2 ' />
                <label htmlFor=''>Samsung</label>
              </div>
              <div className='col-span-1 flex gap-2 items-center'>
                <input type='checkbox' name='' id='' className='mr-2 ' />
                <label htmlFor=''>Oppo</label>
              </div>
            </div>
          </div>
          <div>
            <h3 className='font-bold'>Mức giá</h3>
            <div className='text-sm'>
              <div className='flex flex-col gap-2 mt-2'>
                <div className='flex gap-2 items-center'>
                  <input type='checkbox' name='' id='' className='mr-2 ' />
                  <label htmlFor=''>Tất cả</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type='checkbox' name='' id='' className='mr-2 ' />
                  <label htmlFor=''>Dưới 2 triệu</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type='checkbox' name='' id='' className='mr-2 ' />
                  <label htmlFor=''>Từ 2 - 4 triệu</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type='checkbox' name='' id='' className='mr-2 ' />
                  <label htmlFor=''>Từ 4 - 7 triệu</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type='checkbox' name='' id='' className='mr-2 ' />
                  <label htmlFor=''>Từ 7 - 13 triệu</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type='checkbox' name='' id='' className='mr-2 ' />
                  <label htmlFor=''>Trên 13 triệu</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-9 md:col-span-9'>
          <div className='flex gap-3 text-sm py-3 mx-3 bg-[#EDEDED] items-center'>
            <h3>Sắp xếp theo</h3>
            <div className='grid grid-cols-12 gap-3 mr-2'>
              <div className='col-span-12 md:col-span-6 flex gap-3'>
                <button className='bg-orange text-white p-2 rounded'>Phổ biến</button>
                <button className='bg-white p-2 rounded'>Mới nhất</button>
                <button className='bg-white p-2 rounded'>Bán chạy</button>
              </div>
              <select value={'Giá'} name='' id='' className='bg-white p-2 rounded col-span-12 md:col-span-6'>
                <option value=''>Giá: thấp đến cao</option>
                <option value=''>Giá: cao đến thấp</option>
              </select>
            </div>
          </div>
          <div className='grid grid-cols-12 gap-3 m-3'>
            <div className='col-span-6 sm:col-span-4 lg:col-span-3  bg-white rounded-sm shadow-md'>
              <div>
                <img src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq48pn3sqdw2b7' alt='' />
              </div>
              <div className='p-2'>
                <div className='paragraph-container'>
                  <h5 className='text-sm'>
                    Quần jean ống đứng Độ đàn hồi unisex quần bò ống đứng Màu Trơn quần jean đen nam street style quần
                    jean nam
                  </h5>
                </div>
                <div className='mt-3'>
                  <span className='text-gray-400 text-sm line-through'>&#8363;100.000</span>
                  <span className='text-base text-orange ml-2'>&#8363;59.000</span>
                </div>
                <div className='rating-outer text-xs my-2'>
                  <div className='rating-inner w-[60%]'></div>
                </div>
                <span className='ml-1 text-xs text-black'>Đã bán 4.7k</span>
                <div className='text-xs text-gray-400'>TP. Hồ Chí Minh</div>
              </div>
            </div>
            <div className='col-span-6 sm:col-span-4 lg:col-span-3  bg-white rounded-sm shadow-md'>
              <div>
                <img src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq48pn3sqdw2b7' alt='' />
              </div>
              <div className='p-2'>
                <div className='paragraph-container'>
                  <h5 className='text-sm'>
                    Quần jean ống đứng Độ đàn hồi unisex quần bò ống đứng Màu Trơn quần jean đen nam street style quần
                    jean nam
                  </h5>
                </div>
                <div className='mt-3'>
                  <span className='text-gray-400 text-sm line-through'>&#8363;100.000</span>
                  <span className='text-base text-orange ml-2'>&#8363;59.000</span>
                </div>
                <div className='rating-outer text-xs my-2'>
                  <div className='rating-inner w-[60%]'></div>
                </div>
                <span className='ml-1 text-xs text-black'>Đã bán 4.7k</span>
                <div className='text-xs text-gray-400'>TP. Hồ Chí Minh</div>
              </div>
            </div>
            <div className='col-span-6 sm:col-span-4 lg:col-span-3  bg-white rounded-sm shadow-md'>
              <div>
                <img src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq48pn3sqdw2b7' alt='' />
              </div>
              <div className='p-2'>
                <div className='paragraph-container'>
                  <h5 className='text-sm'>
                    Quần jean ống đứng Độ đàn hồi unisex quần bò ống đứng Màu Trơn quần jean đen nam street style quần
                    jean nam
                  </h5>
                </div>
                <div className='mt-3'>
                  <span className='text-gray-400 text-sm line-through'>&#8363;100.000</span>
                  <span className='text-base text-orange ml-2'>&#8363;59.000</span>
                </div>
                <div className='rating-outer text-xs my-2'>
                  <div className='rating-inner w-[60%]'></div>
                </div>
                <span className='ml-1 text-xs text-black'>Đã bán 4.7k</span>
                <div className='text-xs text-gray-400'>TP. Hồ Chí Minh</div>
              </div>
            </div>
            <div className='col-span-6 sm:col-span-4 lg:col-span-3  bg-white rounded-sm shadow-md'>
              <div>
                <img src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq48pn3sqdw2b7' alt='' />
              </div>
              <div className='p-2'>
                <div className='paragraph-container'>
                  <h5 className='text-sm'>
                    Quần jean ống đứng Độ đàn hồi unisex quần bò ống đứng Màu Trơn quần jean đen nam street style quần
                    jean nam
                  </h5>
                </div>
                <div className='mt-3'>
                  <span className='text-gray-400 text-sm line-through'>&#8363;100.000</span>
                  <span className='text-base text-orange ml-2'>&#8363;59.000</span>
                </div>
                <div className='rating-outer text-xs my-2'>
                  <div className='rating-inner w-[60%]'></div>
                </div>
                <span className='ml-1 text-xs text-black'>Đã bán 4.7k</span>
                <div className='text-xs text-gray-400'>TP. Hồ Chí Minh</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
