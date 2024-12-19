import { useState, useEffect, useCallback } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { IoClose } from 'react-icons/io5'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { getBrandByCategoryId } from '../../apis/brand.api'
import { getAllCategories } from '../../apis/category.api'
import formatToVND from '../../helpers/currencyFormatter'
import { getProductFilter } from '../../apis/product.api'
import { product } from '../../types/product.type'
import ProductCart from '../Product/ProductCard'
import _ from 'lodash'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducer/rootReducer'
import { loading } from '../../slices/loadingSlice'

// interface Category {
//   id: string
//   name: string
//   icon: JSX.Element
// }
interface SearchAndFilterProps {}

const SearchAndFilter: React.FC<SearchAndFilterProps> = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootState) => state.loading.isLoading)
  const searchParams = new URLSearchParams(location.search)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchShowText, setSearchShowText] = useState<string>('')
  const suggestions: any = []
  const [selectedCategory, setSelectedCategory] = useState<number>()
  const [selectedBrands, setSelectedBrands] = useState<any[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000])
  const [priceRangeShow, setPriceRangeShow] = useState<[number, number]>([0, 50000000])
  const [ram, setRam] = useState<string>('')
  const [rom, setRom] = useState<string>('')
  const error = ''
  const [productFilters, setProductFilters] = useState<product[]>([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [pageSelect, setPageSelect] = useState(1)
  const [totalNumberPage, setTotalNumberPage] = useState<number>(5)
  const [pageSize, setPageSize] = useState<number>(8)
  // const categories: Category[] = [
  //   { id: 'Điện thoại', name: 'Điện thoại', icon: <FaMobile /> },
  //   { id: 'Laptop', name: 'Laptop', icon: <FaLaptop /> },
  //   { id: 'Tablet', name: 'Tablet', icon: <FaTabletAlt /> },
  //   { id: 'Phụ kiện', name: 'Phụ kiện', icon: <FaHeadphones /> }
  // ]

  console.log(location.pathname.slice(1).split('-').join(' '))
  useEffect(() => {
    console.log('url change')

    // const paramBrand = searchParams.get('brand')
    const arrayBrand: any = searchParams.get('brand') ? searchParams.get('brand')?.split(',') : []
    setSelectedBrands(arrayBrand)
    const minPrice: any = searchParams.get('minPrice') ? searchParams.get('minPrice') : 0
    const maxPrice: any = searchParams.get('maxPrice') ? searchParams.get('maxPrice') : 50000000
    setPriceRange([minPrice, maxPrice])
    setPriceRangeShow([minPrice, maxPrice])
    const storage: any = searchParams.get('storage') ? searchParams.get('storage')?.toUpperCase() : ''
    setRom(storage)
  }, [location])
  console.log(selectedBrands)

  useEffect(() => {
    fetchListBrand()
  }, [selectedCategory])

  useEffect(() => {
    fetchListCate()
  }, [location.pathname])

  const resetSelectFilter = () => {
    setRam('')
    setRom('')
    setPriceRange([0, 50000000])
    setPriceRangeShow([0, 50000000])
    setSelectedBrands([])
  }
  const fetchListCate = async () => {
    try {
      const getApi = await getAllCategories()
      if (getApi && getApi.status == 200) {
        setCategories(getApi.data)
        // clocation.pathname.slice(1)
        const cateName = location.pathname.slice(1).split('-').join(' ')
        getApi.data &&
          getApi.data.map((cate: any) => {
            console.log(
              cate.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd') // Thay thế đ và Đ
                .replace(/Đ/g, 'D')
            )

            if (
              cate.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd') // Thay thế đ và Đ
                .replace(/Đ/g, 'D') == cateName
            ) {
              setSelectedCategory(cate.id)
            }
          })
        // setSelectedCategory(getApi.data[0].id)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchListBrand = async () => {
    try {
      const getApi = await getBrandByCategoryId(selectedCategory)
      getApi && getApi.status == 200 && setBrands(getApi.data)
    } catch (error) {
      console.log(error)
    }
  }

  const ramOptions: string[] = ['4', '6', '8', '12', '16', '32', '64']
  const romOptions: string[] = ['64', '128', '256', '512', '1']
  useEffect(() => {
    handleFilterProduct()
  }, [selectedBrands, selectedCategory, searchTerm, priceRange, ram, rom, pageSelect])
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handleSearch = useCallback(
    _.debounce((searchQuery) => {
      console.log('Searching for:', searchQuery)
      // Thực hiện tìm kiếm hoặc gọi API ở đây
      setSearchTerm(searchQuery)
    }, 500),
    []
  ) // 500ms delay

  const handleChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchShowText(event.target.value)
    handleSearch(event.target.value)
  }

  const handleRangePrice = useCallback(
    _.debounce((searchQuery) => {
      console.log('Searching for:', searchQuery)
      // Thực hiện tìm kiếm hoặc gọi API ở đây
      setPriceRange(searchQuery)
    }, 500),
    []
  )
  const handleChangeRangePrice = (value: any) => {
    // event.preventDefault()
    setPriceRangeShow(value)
    handleRangePrice(value)
  }

  const handleFilterProduct = async () => {
    try {
      dispatch(loading(true))
      const param: { [key: string]: any } = {
        category: selectedCategory,
        brand: selectedBrands,
        search: searchTerm,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        storage: rom,
        ram: ram,
        pageNo: pageSelect - 1,
        pageSize: 2
      }
      const arrayQuery = Object.entries(param).map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&')
        }
        if (value != '' || value == 0) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        }
      })
      const stringQuery = `?${arrayQuery.filter((element) => element !== undefined && element !== '').join('&')}`

      const fetchApi = await getProductFilter(stringQuery)
      if (fetchApi && fetchApi.status == 200) {
        setProductFilters(fetchApi.data.products)
        setTotalNumberPage(fetchApi.data.pageSize)
      }
      dispatch(loading(false))
    } catch (error) {
      console.log(error)
      dispatch(loading(false))
    }
  }
  return (
    <div className='max-w-screen-xl mx-auto p-4 bg-gray-50 min-h-screen'>
      <div className='mb-6'>
        <div className='relative'>
          <input
            type='text'
            value={searchShowText}
            onChange={handleChangeInputSearch}
            placeholder='Search products...'
            className='w-full px-4 py-3 pl-10 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
            aria-label='Search products'
          />
          <IoSearchOutline className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchShowText('')
                setSearchTerm('')
              }}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              aria-label='Clear search'
            >
              <IoClose className='text-xl' />
            </button>
          )}
          {isLoading && (
            <div className='absolute right-12 top-1/2 transform -translate-y-1/2'>
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500' />
            </div>
          )}
        </div>
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        {suggestions.length > 0 && (
          <ul className='mt-2 bg-white rounded-lg shadow-lg border border-gray-200'>
            {suggestions.map((suggestion: any, index: any) => (
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
              onClick={() => {
                setSelectedCategory(category.id)
                resetSelectFilter()
              }}
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
                    checked={selectedBrands.includes(brand.name.toLowerCase())}
                    onChange={() => handleBrandToggle(brand.name.toLowerCase())}
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
              max={50000000}
              value={priceRangeShow}
              onChange={(value) => {
                handleChangeRangePrice(value as [number, number])
              }}
              className='mb-4'
            />
            <div className='flex justify-between text-sm text-gray-600'>
              <span>${formatToVND(priceRangeShow[0])}</span>
              <span>${formatToVND(priceRangeShow[1])}</span>
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow'>
            <h3 className='font-semibold mb-4'>RAM</h3>
            <select
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>Tất cả</option>
              {ramOptions.map((option) => (
                <option key={option} value={option}>
                  {option}GB
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
              <option value=''>Tất cả</option>
              {romOptions.map((option) => (
                <option key={option} value={option}>
                  {option}GB
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='md:col-span-9'>
          <div className='bg-white p-4 rounded-lg shadow'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {!isLoading ? (
                productFilters &&
                productFilters.length > 0 &&
                productFilters.map((p: product) => {
                  return <ProductCart product={p} className={''} />
                })
              ) : (
                <div role='status'>
                  <svg
                    aria-hidden='true'
                    class='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                  <span class='sr-only'>Loading...</span>
                </div>
              )}
            </div>

            {totalNumberPage ? (
              <div className='flex justify-center'>
                <nav aria-label='Page navigation example'>
                  <ul className='flex items-center -space-x-px h-8 text-sm gap-1'>
                    <li
                      onClick={() => {
                        if (pageSelect == 1) {
                          return
                        }
                        setPageSelect(pageSelect - 1)
                      }}
                    >
                      <button className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                        <span className='sr-only'>Previous</span>
                        <svg
                          className='w-2.5 h-2.5 rtl:rotate-180'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 6 10'
                        >
                          <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M5 1 1 5l4 4'
                          />
                        </svg>
                      </button>
                    </li>
                    {Array.from({ length: totalNumberPage }, (_, i) => {
                      if (pageSelect == i + 1) {
                        return (
                          <li
                            key={i}
                            onClick={() => {
                              setPageSelect(i + 1)
                            }}
                          >
                            <button className='flex items-center justify-center px-3 h-8 leading-tight text-blue-500 bg-white border border-blue-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                              {i + 1}
                            </button>
                          </li>
                        )
                      } else {
                        return (
                          <li
                            key={i}
                            onClick={() => {
                              setPageSelect(i + 1)
                            }}
                          >
                            <button className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                              {i + 1}
                            </button>
                          </li>
                        )
                      }
                    })}

                    <li
                      onClick={() => {
                        if (pageSelect == totalNumberPage) {
                          return
                        }
                        setPageSelect(pageSelect + 1)
                      }}
                    >
                      <button className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                        <span className='sr-only'>Next</span>
                        <svg
                          className='w-2.5 h-2.5 rtl:rotate-180'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 6 10'
                        >
                          <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='m1 9 4-4-4-4'
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            ) : (
              <h3>Không tìm thấy sản phẩm</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilter
