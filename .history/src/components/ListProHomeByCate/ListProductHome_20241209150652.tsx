import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
import { getProducts } from '../../apis/product.api'

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
      <div className='bg-orange p-3 font-bold text-white text-xl rounded-t-lg'>Laptop</div>
      <div>danh sách</div>
    </div>
  )
}

export default ListProductHome
