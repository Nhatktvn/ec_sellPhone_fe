import { Link, useParams } from 'react-router-dom'
import ProductCart from '../../components/Product/ProductCart'
import { getProductsByCate } from '../../apis/product.api'
import { useState } from 'react'
import { product } from '../../types/product.type'

export default function ProductList() {
  const { category } = useParams()
  const [products, setProduct] = useState<product[] | null>()
  const getProductsByCateName = async () => {
    try {
      const rsGetProductByCate = await getProductsByCate(category)
      if (rsGetProductByCate && rsGetProductByCate.status === 200) {
        setProduct(rsGetProductByCate.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
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
          <div className='grid grid-cols-12 gap-3 m-3'></div>
        </div>
      </div>
    </div>
  )
}
