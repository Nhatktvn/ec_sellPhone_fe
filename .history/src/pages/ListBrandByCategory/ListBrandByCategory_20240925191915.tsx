import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBrandByCategoryName } from '../../apis/brand.api'

function ListBrandByCategory() {
  const [listBrand, setListBrand] = useState([])
  const { category } = useParams()
  console.log(category)
  useEffect(() => {
    console.log('heello')

    handleGetBrandByCategory()
  }, [])
  const handleGetBrandByCategory = async () => {
    try {
      const getBrandByCategory = await getBrandByCategoryName('điện thoại')
      if (getBrandByCategory.status == 200) {
        setListBrand(getBrandByCategory.data)
        console.log(listBrand)
      }
      console.log(getBrandByCategory)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container mt-2'>
      <div className='bg-white rounded-md p-2'>
        <h3>Sản phẩm đã xem</h3>
      </div>
      <div className='bg-white mt-4'>
        <ul>
          {listBrand &&
            listBrand.map((brand: any, idx) => {
              return <li>{<img src={brand.}/>}</li>
            })}
        </ul>
      </div>
    </div>
  )
}

export default ListBrandByCategory
