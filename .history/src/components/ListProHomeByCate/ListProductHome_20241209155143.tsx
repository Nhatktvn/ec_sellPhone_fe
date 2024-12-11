import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
import { getProductFilter, getProducts, getProductsByBrand } from '../../apis/product.api'
import ProductCard from '../Product/ProductCard'
import { FaLaptop } from 'react-icons/fa'
import { getBrandByCategoryId } from '../../apis/brand.api'

interface category {
  id: number
  name: string
}
interface brand {
  id: number
  name: string
}
const ListProductHome = (cate: category) => {
  const [dataProducts, setDataProduct] = useState<product[] | null>()
  const [listBrand, setListBrand] = useState<any[]>([])
  useEffect(() => {
    getListProduct()
    getListBrand()
  }, [])
  const getListProduct = async () => {
    try {
      const rsGetProducts = await getProductFilter(`?category=${cate.id}&maxPrice=500000000`)
      console.log(rsGetProducts)

      if (rsGetProducts && rsGetProducts.status === 200) {
        console.log(rsGetProducts.data)
        setDataProduct(rsGetProducts.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getListBrand = async () => {
    try {
      const fetchGetBrandByCate = await getBrandByCategoryId(cate.id)
      if (fetchGetBrandByCate && fetchGetBrandByCate.status == 200) {
        console.log(fetchGetBrandByCate)
        setListBrand(fetchGetBrandByCate.data)
      }
    } catch (error) {}
  }
  return (
    <div className='container p-0 my-10'>
      <div className='bg-orange p-3 font-bold text-white text-2xl rounded-t-lg flex gap-2 items-center justify-between'>
        <h3 className='flex gap-2 items-center'>
          <FaLaptop /> {cate.name}
        </h3>
        <ul className='flex gap-4'>
          {listBrand &&
            listBrand.length > 0 &&
            listBrand.map((brand) => {
              return (
                <li className='text-base' key={brand.id}>
                  {brand.name}
                </li>
              )
            })}
        </ul>
      </div>
      <div className='grid grid-cols-12 lg:grid-cols-10 gap-3 p-5 bg-white '>
        {dataProducts &&
          dataProducts.length > 0 &&
          dataProducts.map((product, idx) => (
            <ProductCard
              key={idx}
              className={'col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2'}
              product={product}
            />
          ))}
      </div>
    </div>
  )
}

export default ListProductHome
