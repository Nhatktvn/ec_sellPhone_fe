interface category {
  id: Int16Array
  name: String
  urlImage: String
}

interface categoryProps {
  category: category
}
const Category: React.FC<categoryProps> = ({ category }) => {
  return (
    <div className='w-[120px]  flex flex-col justify-center items-center rounded-md overflow-hidden group cursor-pointer'>
      <div className='w-full h-[120px] border-2 border-black group-hover:shadow-lg transition duration-150 flex items-center rounded-full overflow-hidden p-2 bg-white '>
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
    </div>
  )
}

export default Category
