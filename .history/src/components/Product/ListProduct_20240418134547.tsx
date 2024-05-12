import { useEffect, useState } from 'react'
import { getProducts } from '../../apis/product.api'
import ProductCart from './ProductCart'
import { product } from '../../types/product.type'

function ListProduct() {
  const [dataProducts, setDataProduct] = useState<product[] | null>()
  useEffect(() => {
    getListProduct()
  }, [])
  const getListProduct = async () => {
    try {
      const rsGetProducts = await getProducts()
      if (rsGetProducts && rsGetProducts.status === 200) {
        console.log(rsGetProducts.data)
        setDataProduct(rsGetProducts.data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='grid grid-cols-12 lg:grid-cols-10 gap-3 p-2'>
      {dataProducts && dataProducts.map((product, idx) => <ProductCart product={product} />)}
    </div>
  )
}

export default ListProduct
