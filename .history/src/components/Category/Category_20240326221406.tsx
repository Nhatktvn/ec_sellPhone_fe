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
      <div className='rounded-full overflow-hidden group-hover:shadow-lg transition duration-150 border-'>
        <img className='h-[120px]' src={`${category.urlImage}`} alt='' style={{ backgroundSize: '100% 100%' }} />
      </div>
      <h4 className='mt-1 text-center'>{category.name}</h4>
    </div>
  )
}

export default Category
