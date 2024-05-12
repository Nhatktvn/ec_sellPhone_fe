import Category from './Category'
import { loading } from '../../slices/loadingSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCategories } from '../../apis/category.api'
function ListCategory() {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const getCategories = async () => {
    try {
      const rs = await getCategories()
      console.log(rs)
    } catch (error) {}
  }
  return (
    <div className='flex gap-3 flex-wrap justify-between'>
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
    </div>
  )
}

export default ListCategory
