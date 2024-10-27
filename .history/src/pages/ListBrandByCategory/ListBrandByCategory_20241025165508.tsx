import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBrandByCategoryName } from '../../apis/brand.api'
import FilterProduct from '../../components/FilterProduct'
import HistoryView from '../../components/HistoryView'

function ListBrandByCategory() {
  const [listBrand, setListBrand] = useState([])
  const [categoryName, setCategoryName] = useState('')
  // const { category } = useParams()
  const category = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]

  const handleGetNameBrand = (category: string | undefined) => {
    switch (category) {
      case 'dien-thoai':
        setCategoryName('điện thoại')
        break
      case 'laptop':
        setCategoryName('laptop')
        break
      case 'phu-kien':
        setCategoryName('phụ kiện')
        break
      case 'smartwatch':
        setCategoryName('smartwatch')
        break
      case 'tablet':
        setCategoryName('tablet')
        break
      default:
        break
    }
  }
  useEffect(() => {
    console.log(category)
    handleGetNameBrand(category)
    handleGetBrandByCategory()
  }, [category, categoryName])
  const handleGetBrandByCategory = async () => {
    try {
      const getBrandByCategory = await getBrandByCategoryName(categoryName)
      if (getBrandByCategory.status == 200) {
        setListBrand(getBrandByCategory.data)
      }
      console.log(getBrandByCategory)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container mt-2'>
      <div className=''>
        <HistoryView numberShow={4} />
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
      <FilterProduct />
    </div>
  )
}

export default ListBrandByCategory
