const getDataProduct = async () => {
  try {
    const rsGetProduct = await getProducts()
    if (rsGetProduct && rsGetProduct.status === 200) {
      console.log(rsGetProduct.data.products)
      setData(rsGetProduct.data.products)
    }
  } catch (error) {
    console.log(error)
  }
}
