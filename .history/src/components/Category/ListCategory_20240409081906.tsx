import Category from './Category'
import { loading } from '../../slices/loadingSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCategories } from '../../apis/category.api'
import { useEffect, useState } from 'react'
function ListCategory() {
  const [listCategory, setListCategory] = useState([])
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
    <div className='container mt-10'>
      <h3>DANH MỤC NỔI BẬT</h3>
      <div className='flex gap-3 flex-wrap justify-between'>
        {listCategory &&
          listCategory.map((cate, idx) => {
            return <Category category={cate} key={idx} />
          })}
      </div>
    </div>
  )
}

export default ListCategory
