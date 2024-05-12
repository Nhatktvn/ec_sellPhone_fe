interface category {
  id: Int16Array
  name: String
  urlImage: String
}

interface categoryProps {
  category: category
}
import logoApple from '../../assets/Logo_Category/logo-apple.png'
const Category: React.FC<categoryProps> = ({ category }) => {
  return (
    <div className='w-[120px]  flex flex-col justify-center items-center rounded-md overflow-hidden group cursor-pointer'>
      <div className='rounded-full overflow-hidden group-hover:shadow-lg transition duration-150 border-2'>
        <img className='h-[120px]' src={logoApple} alt='' />
      </div>
      <h4 className='mt-1 text-center'>{category.name}</h4>
    </div>
  )
}

export default Category
