import Category from './Category'
import { loading } from '../../slices/loadingSlice'
function ListCategory() {
  const getCategories = async () => {
    try {
      const rs = await getCategories
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
