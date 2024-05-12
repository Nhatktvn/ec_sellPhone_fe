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
      <div className='rounded-full overflow-hidden group-hover:shadow-lg transition duration-150 border-2'>
        {/* <img className='h-[120px]' src={`${category.urlImage}`} alt='' style={{ backgroundSize: '100% 100%' }} /> */}
        <img
          className='h-[120px]'
          src='../../assets/Logo_Category/logo-apple-hien-tai.jpg'
          alt=''
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Đảm bảo hình ảnh phù hợp với kích thước của div mà không làm biến dạng
            objectPosition: 'center' // Căn hình ảnh vào giữa của div
          }}
        />
      </div>
      <h4 className='mt-1 text-center'>{category.name}</h4>
    </div>
  )
}

export default Category
