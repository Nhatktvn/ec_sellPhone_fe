import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBrandByCategoryName } from '../../apis/brand.api'

function ListBrandByCategory() {
  const [listBrand, setListBrand] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const { category } = useParams()
  const handleGetNameBrand = (category: string) => {
    switch (category) {
      case 'dien-thoai':
        setCategoryName('điện thoại')
        break
      case 'dien-thoai':
        setCategoryName('điện thoại')
        break
      default:
        break
    }
  }
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
        <ul className='flex gap-3'>
          {listBrand &&
            listBrand.map((brand: any, idx) => {
              return (
                <li className='border-2 rounded-lg p-1 hover:border-orange cursor-pointer'>
                  {<img className='block w-[100px] h-[50px]' src={brand.urlImage} />}
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default ListBrandByCategory
