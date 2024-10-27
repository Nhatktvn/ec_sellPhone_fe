import { useState, useEffect } from 'react'
import { FiSearch, FiFilter } from 'react-icons/fi'
import { AiOutlineLaptop, AiOutlineMobile, AiOutlineTablet } from 'react-icons/ai'
import { product } from '../../types/product.type'

// interface Product {
//   id: number
//   name: string
//   category: string
//   price: number
//   image: string
//   description: string
// }

// const mockProducts: Product[] = [
//   {
//     id: 1,
//     name: 'MacBook Pro 16-inch',
//     category: 'laptop',
//     price: 2499.99,
//     image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
//     description: 'Powerful laptop for professionals'
//   },
//   {
//     id: 2,
//     name: 'iPhone 13 Pro',
//     category: 'phone',
//     price: 999.99,
//     image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd',
//     description: 'Latest flagship smartphone'
//   },
//   {
//     id: 3,
//     name: 'iPad Pro 12.9',
//     category: 'tablet',
//     price: 1099.99,
//     image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
//     description: 'Premium tablet experience'
//   },
//   {
//     id: 4,
//     name: 'Dell XPS 15',
//     category: 'laptop',
//     price: 1899.99,
//     image: 'https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf',
//     description: 'Premium Windows laptop'
//   },
//   {
//     id: 5,
//     name: 'Samsung Galaxy S21',
//     category: 'phone',
//     price: 799.99,
//     image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c',
//     description: 'Feature-rich Android phone'
//   },
//   {
//     id: 6,
//     name: 'Surface Pro 8',
//     category: 'tablet',
//     price: 999.99,
//     image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6',
//     description: 'Versatile 2-in-1 tablet'
//   }
// ]

interface Category {
  name: string
  icon: typeof AiOutlineLaptop | typeof AiOutlineMobile | typeof AiOutlineTablet
}

const ProductCard: React.FC<{ product: product }> = ({ product }) => {
  const mockProducts: product[] = []
  const fetchGetAllProduct = async () => {
    try {
      const getAllProduct = user
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105'>
      <img src={product.image} alt={product.name} className='w-full h-48 object-cover' />
      <div className='p-4'>
        <h3 className='text-xl font-semibold text-gray-800'>{product.name}</h3>
        <p className='text-gray-600 mt-2'>{product.description}</p>
        <div className='mt-4 flex justify-between items-center'>
          <span className='text-2xl font-bold text-indigo-600'>${product.price}</span>
          <span className='px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm'>{product.category}</span>
        </div>
      </div>
    </div>
  )
}

const FilterProduct: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const categories: Category[] = [
    { name: 'laptop', icon: AiOutlineLaptop },
    { name: 'phone', icon: AiOutlineMobile },
    { name: 'tablet', icon: AiOutlineTablet }
  ]

  useEffect(() => {
    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      const filtered = mockProducts.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
        return matchesSearch && matchesCategory
      })
      setFilteredProducts(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedCategories])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8 space-y-4'>
          <div className='flex items-center bg-white rounded-lg shadow-sm'>
            <FiSearch className='ml-4 text-gray-400 text-xl' />
            <input
              type='text'
              placeholder='Search products...'
              className='w-full p-4 focus:outline-none'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label='Search products'
            />
          </div>

          <div className='flex items-center space-x-4'>
            <FiFilter className='text-gray-600 text-xl' />
            <div className='flex gap-2'>
              {categories.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  onClick={() => toggleCategory(name)}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                    selectedCategories.includes(name)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-pressed={selectedCategories.includes(name)}
                >
                  <Icon className='text-xl' />
                  <span className='capitalize'>{name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600'></div>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-600 text-lg'>No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterProduct
