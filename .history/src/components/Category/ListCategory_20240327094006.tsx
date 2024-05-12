import Category from './Category'
import { loading } from '../../slices/loadingSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCategories } from '../../apis/category.api'
import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
function ListCategory() {
  const [listCategory, setListCategory] = useState<product[]>([])
  const navigation = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    handleCategories()
  }, [])

  const handleCategories = async () => {
    try {
      const rs = await getCategories()
      if (rs && rs.status === 200) {
        setListCategory(rs.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex gap-3 flex-wrap justify-between'>
      {listCategory &&
        listCategory.map((cate, idx) => {
          return <Category category={cate} key={idx} />
        })}
    </div>
  )
}

export default ListCategory
