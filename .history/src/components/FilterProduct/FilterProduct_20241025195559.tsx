import { useState, useEffect } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { IoClose } from 'react-icons/io5'
import { FaLaptop, FaMobile, FaTabletAlt, FaHeadphones } from 'react-icons/fa'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { getBrandByCategoryId, getBrandByCategoryName } from '../../apis/brand.api'
import { getAllCategories } from '../../apis/category.api'

// interface Category {
//   id: string
//   name: string
//   icon: JSX.Element
// }
interface Params {
  [key: string]: string | number | boolean // Định nghĩa kiểu cho object
}
interface SearchAndFilterProps {}

const SearchAndFilter: React.FC<SearchAndFilterProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number>()
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [ram, setRam] = useState<string>('')
  const [rom, setRom] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  // const categories: Category[] = [
  //   { id: 'Điện thoại', name: 'Điện thoại', icon: <FaMobile /> },
  //   { id: 'Laptop', name: 'Laptop', icon: <FaLaptop /> },
  //   { id: 'Tablet', name: 'Tablet', icon: <FaTabletAlt /> },
  //   { id: 'Phụ kiện', name: 'Phụ kiện', icon: <FaHeadphones /> }
  // ]
  useEffect(() => {
    fetchListBrand()
  }, [selectedCategory])

  useEffect(() => {
    fetchListCate()
  }, [])

  const fetchListCate = async () => {
    try {
      const getApi = await getAllCategories()
      if (getApi && getApi.status == 200) {
        setCategories(getApi.data)
        setSelectedCategory(getApi.data[0].id)
      }
    } catch (error) {
      console.log(error)
    }
  }
  getAllCategories
  const fetchListBrand = async () => {
    try {
      const getApi = await getBrandByCategoryId(selectedCategory)
      getApi && getApi.status == 200 && setBrands(getApi.data)
    } catch (error) {
      console.log(error)
    }
  }

  // const brands: string[] = ['iPhone', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'ASUS', 'Dell', 'HP']

  const ramOptions: string[] = ['4GB', '8GB', '12GB', '16GB', '32GB']
  const romOptions: string[] = ['64GB', '128GB', '256GB', '512GB', '1TB']

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() === '') {
        setSuggestions([])
        return
      }

      setLoading(true)
      try {
        // Simulated API call
        const response = await new Promise<string[]>((resolve) =>
          setTimeout(() => {
            resolve([`${searchTerm} pro max`, `${searchTerm} lite`, `${searchTerm} ultra`])
          }, 500)
        )
        setSuggestions(response)
        setError('')
      } catch (err) {
        setError('Failed to fetch suggestions')
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  useEffect(() => {
    handleFilterProduct()
  }, [selectedBrands, selectedCategory, searchTerm, ram, rom, priceRange])
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handleFilterProduct = async () => {
    try {
      const param: { [key: string]: any } = {
        categoryId: selectedCategory,
        brandId: selectedBrands,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        storage: rom
      }
      const stringQuery = Object.entries(param)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            // Nếu giá trị là mảng, tạo cặp key=value cho từng phần tử
            return value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&')
          }
          if (value != '' && value != null && value != undefined) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          }
          // Nếu giá trị không phải là mảng, tạo cặp key=value thông thường
          // return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        })
        .join('&')

      // console.log(queryParams(param))
      console.log(stringQuery)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='max-w-screen-xl mx-auto p-4 bg-gray-50 min-h-screen'>
      <div className='mb-6'>
        <div className='relative'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search products...'
            className='w-full px-4 py-3 pl-10 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
            aria-label='Search products'
          />
          <IoSearchOutline className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              aria-label='Clear search'
            >
              <IoClose className='text-xl' />
            </button>
          )}
          {loading && (
            <div className='absolute right-12 top-1/2 transform -translate-y-1/2'>
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500' />
            </div>
          )}
        </div>
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        {suggestions.length > 0 && (
          <ul className='mt-2 bg-white rounded-lg shadow-lg border border-gray-200'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors'
                onClick={() => setSearchTerm(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='mb-6 overflow-x-auto'>
        <div className='flex space-x-2'>
          {categories.map((category: any) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              aria-label={`Select ${category.name} category`}
            >
              <span className='mr-2'>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        <div className='md:col-span-3 space-y-6'>
          <div className='bg-white p-4 rounded-lg shadow'>
            <h3 className='font-semibold mb-4'>Brands</h3>
            <div className='space-y-2'>
              {brands.map((brand: any) => (
                <label key={brand.id} className='flex items-center space-x-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => handleBrandToggle(brand.id)}
                    className='rounded text-blue-500 focus:ring-blue-500'
                  />
                  <span>{brand.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow'>
            <h3 className='font-semibold mb-4'>Price Range</h3>
            <Slider
              range
              min={0}
              max={2000}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
              className='mb-4'
            />
            <div className='flex justify-between text-sm text-gray-600'>
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow'>
            <h3 className='font-semibold mb-4'>RAM</h3>
            <select
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>Select RAM</option>
              {ramOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className='bg-white p-4 rounded-lg shadow'>
            <h3 className='font-semibold mb-4'>Storage</h3>
            <select
              value={rom}
              onChange={(e) => setRom(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>Select Storage</option>
              {romOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='md:col-span-9'>
          <div className='bg-white p-4 rounded-lg shadow'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {[1, 2, 3, 4, 5, 6, 8].map((item) => (
                <div key={item} className='border rounded-lg p-4 hover:shadow-lg transition-shadow'>
                  <img
                    src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'
                    alt='Product'
                    className='w-full h-40 object-cover rounded-lg mb-4'
                  />
                  <h4 className='font-semibold mb-2'>Product Name</h4>
                  <p className='text-blue-500 font-bold'>$999</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilter
