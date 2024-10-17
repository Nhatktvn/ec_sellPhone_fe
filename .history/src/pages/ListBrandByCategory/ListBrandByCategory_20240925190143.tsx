import { useParams } from 'react-router-dom'

function ListBrandByCategory() {
  const { category } = useParams()
  console.log(category)
  return <div>Hello</div>
}

export default ListBrandByCategory
