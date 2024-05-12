import { Link } from 'react-router-dom'

interface category {
  id: Int16Array
  name: string
  urlImage: string
}

interface categoryProps {
  category: category
}
const Category: React.FC<categoryProps> = ({ category }) => {
  return (
    <Link
      to={`/danh-sach/${category.name}`}
      className='w-[120px]  flex flex-col justify-center items-center rounded-xl overflow-hidden group cursor-pointer'
    >
      <div className='w-full h-[120px] border-2 group-hover:shadow-lg transition duration-150 flex items-center rounded-xl overflow-hidden p-2 bg-white'>
        <div className=''>
          <img
            className=' block'
            src={`${category.urlImage}`}
            alt=''
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Đảm bảo hình ảnh phù hợp với kích thước của div mà không làm biến dạng
              objectPosition: 'center' // Căn hình ảnh vào giữa của div
            }}
          />
        </div>
      </div>
      <h4 className='mt-1 text-center'>{category.name}</h4>
    </Link>
  )
}

export default Category
