import Category from './Category'
import { loading } from '../../slices/loadingSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllCategories } from '../../apis/category.api'
import { useEffect, useRef, useState } from 'react'
function ListCategory() {
  const [listCategory, setListCategory] = useState([])
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const refListCate = useRef<HTMLDivElement>(null)
  useEffect(() => {
    handleCategories()
  }, [])

  const handleCategories = async () => {
    try {
      const rs = await getAllCategories()
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
      <div ref={refListCate} className='flex gap-4 mt-3 overflow-x-scroll scroll-cate pt-2'>
        {listCategory &&
          listCategory.map((cate, idx) => {
            return <Category category={cate} key={idx} />
          })}
      </div>
    </div>
  )
}

export default ListCategory
