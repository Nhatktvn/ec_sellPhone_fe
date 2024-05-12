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
    <div className='container mt-7 bg-white pt-5 rounded-xl'>
      <h3 className='text-xl font-semibold'>DANH MỤC NỔI BẬT</h3>
      <div className='grid lg:grid-cols-8 md:grid-cols-6'>
        {listCategory &&
          listCategory.map((cate, idx) => {
            return <Category category={cate} key={idx} />
          })}
      </div>
    </div>
  )
}

export default ListCategory