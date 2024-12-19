import { useEffect, useState } from 'react'
import { getProductsByPage } from '../../apis/product.api'
import ProductCard from './ProductCard'
import { product } from '../../types/product.type'

function ListProduct() {
  const [dataProducts, setDataProduct] = useState<product[] | null>()
  useEffect(() => {
    getListProduct()
  }, [])
  const getListProduct = async () => {
    try {
      const rsGetProducts = await getProductsByPage('pageNo=0')
      if (rsGetProducts && rsGetProducts.status === 200) {
        setDataProduct(rsGetProducts.data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='grid grid-cols-12 lg:grid-cols-10 gap-3 p-2'>
      {dataProducts &&
        dataProducts.length > 0 &&
        dataProducts.map((product, idx) => (
          <ProductCard key={idx} className={'col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2'} product={product} />
        ))}
    </div>
  )
}

export default ListProduct
