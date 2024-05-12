import { useState } from 'react'
import { getProducts } from '../../apis/product.api'
import ProductCart from './ProductCart'
import { product } from '../../types/product.type'

function ListProduct() {
  const [dataProducts, setDataProduct] = useState<product[] | null>()
  const getListProduct = async () => {
    try {
      const rsGetProducts = await getProducts()
      if (rsGetProducts) {
        console.log(rsGetProducts)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='grid grid-cols-12 lg:grid-cols-10 gap-3 p-2'>
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
    </div>
  )
}

export default ListProduct
