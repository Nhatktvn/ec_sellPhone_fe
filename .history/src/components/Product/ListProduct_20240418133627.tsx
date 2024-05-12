import ProductCart from './ProductCart'

function ListProduct() {
  const getListProduct = async () => {
    try {
      const rsGetProducts = await getPro
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
