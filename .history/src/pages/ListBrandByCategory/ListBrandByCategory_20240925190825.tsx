import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBrandByCategoryName } from '../../apis/brand.api'

function ListBrandByCategory() {
  const listBrand = useState([])
  const { category } = useParams()
  console.log(category)
  useEffect(() => {}, [])
  const handleGetBrandByCategory = async () => {
    try {
      const getBrandByCategory = await getBrandByCategoryName('điện thoại')
      console.log(getBrandByCategory)
    } catch (error) {
      console.log(error)
    }
  }
  return <div>Hello</div>
}

export default ListBrandByCategory
