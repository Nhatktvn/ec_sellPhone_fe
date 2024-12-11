import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
import { getProductFilter, getProducts, getProductsByBrand } from '../../apis/product.api'
import ProductCard from '../Product/ProductCard'
import { FaLaptop } from 'react-icons/fa'

interface category {
  id: number
  name: string
}

const ListProductHome = (cate: category) => {
  const [dataProducts, setDataProduct] = useState<product[] | null>()
  useEffect(() => {
    getListProduct()
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
  return (
    <div className='container p-0 mb-10 mt-5'>
      <div className='bg-orange p-3 font-bold text-white text-2xl rounded-t-lg flex gap-2 items-center'>
        <FaLaptop /> {cate.name}
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
