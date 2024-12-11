import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
import { getProducts } from '../../apis/product.api'
import ProductCard from '../Product/ProductCard'
import { FaLaptop } from 'react-icons/fa'
const ListProductHome = () => {
  const [dataProducts, setDataProduct] = useState<product[] | null>()
  useEffect(() => {
    getListProduct()
  }, [])
  const getListProduct = async () => {
    try {
      const rsGetProducts = await getProducts()
      if (rsGetProducts && rsGetProducts.status === 200) {
        setDataProduct(rsGetProducts.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container p-0'>
      <div className='bg-orange p-3 font-bold text-white text-xl rounded-t-lg'>
        <FaLaptop /> Laptop
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
