import { useCallback, useEffect, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import _ from 'lodash'
import { getSuggetProduct } from '../../apis/product.api'
import { product } from '../../types/product.type'
import { Link, useNavigate } from 'react-router-dom'
const SearchBar = () => {
  const navigation = useNavigate()
  const [inputSearch, setInputSearch] = useState('')
  const [listSuggetSearch, setListSuggetSearch] = useState<product[]>([])
  const convertName = (namePhone: string) => {
    const arrLink = namePhone.toLowerCase().split(' ')
    return arrLink.join('-')
  }
  const handleInputSeacrch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputSearch(value)
  }

  const fetchSuggestKey = async (key: string) => {
    try {
      const rsSearch = await getSuggetProduct(key)
      if (rsSearch) {
        console.log(rsSearch)
        setListSuggetSearch(rsSearch.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = useCallback(
    _.debounce((searchQuery) => {
      console.log('Searching for:', searchQuery)
      // Thực hiện tìm kiếm hoặc gọi API ở đây
      fetchSuggestKey(searchQuery)
    }, 500),
    []
  ) // 500ms delay

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setInputSearch(event.target.value)
    handleSearch(event.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigation(`/tim-kiem?key=${inputSearch}`)
    setInputSearch('')
    // Your form submission logic here
    // console.log('Form submitted with value:', inputValue)
  }
  return (
    <div className='w-[80%] mx-auto'>
      <div className='bg-white rounded-xl p-1 flex w-full relative items-center'>
        <form onSubmit={(e) => handleSubmit(e)} className='w-full flex items-center'>
          <input
            type='text'
            onChange={handleChange}
            value={inputSearch}
            placeholder='Nhập tên điện thoại cần tìm ...'
            className='border-none outline-none text-black bg-transparent py-2 flex-grow pl-3 w-[85%]'
          />
          <button type='submit' className='py-1 text-black text-2xl px-4 rounded-sm flex-shrink-0 hover:opacity-90'>
            <CiSearch />
          </button>
        </form>
        {inputSearch && (
          <div className='w-full min-h-20 bg-white absolute top-full z-10 shadow-md mt-1 rounded-md p-4'>
            <div className=''>
              <h4 className='underline text-orange'>Gợi ý tìm kiếm</h4>
              <ul className='mt-2'>
                {listSuggetSearch &&
                  listSuggetSearch.length > 0 &&
                  listSuggetSearch.map((sugget) => (
                    <Link
                      to={`/dien-thoai/${convertName(sugget.name)}`}
                      className='hover:bg-gray-200 p-2 rounded-md cursor-pointer flex gap-3 border-b-2'
                      onClick={() => setInputSearch('')}
                    >
                      <div className='w-16 h-16'>
                        <img src={sugget.urlImage} alt='' />
                      </div>
                      <div>
                        <h4 className='text-lg'>{sugget.name}</h4>
                        <div>
                          <span className='text-orange text-base mr-2'>
                            {formatToVND(sugget.variantDTOList[0].sellPrice)}
                          </span>
                          <span className='text-gray-500 text-sm line-through'>
                            {formatToVND(sugget.variantDTOList[0].sellPrice)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </ul>
            </div>
            {/* <div className='col-span-6'>
              <h4 className='underline'>Lịch sử tìm kiếm</h4>
            </div> */}
          </div>
        )}
      </div>
    </div>
  )
}
function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.floor(number / 1000) * 1000)
}
export default SearchBar
