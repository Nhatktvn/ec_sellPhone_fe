import { useCallback, useEffect, useRef, useState } from 'react'
import { Modal } from 'antd'
import { CiSearch } from 'react-icons/ci'
import _ from 'lodash'
import { getSuggetName } from '../../apis/product.api'
const SearchBar = () => {
  const [inputSearch, setInputSearch] = useState('')
  const [listSuggetSearch, setListSuggetSearch] = useState<string[]>([])
  const containInputSearch = useRef<HTMLDivElement>(null)

  const handleInputSeacrch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputSearch(value)
  }
  console.log(listSuggetSearch)

  const fetchSuggestKey = async (key: string) => {
    try {
      const rsSearch = await getSuggetName(key)
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

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containInputSearch.current) {
      console.log('Clicked outside the element')
    }
  }
  useEffect(() => {
    // Thêm sự kiện khi component được mount
    document.addEventListener('mousedown', handleClickOutside)

    // Gỡ bỏ sự kiện khi component bị unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value)
    handleSearch(event.target.value)
  }
  return (
    <div className='w-[80%] mx-auto'>
      <div ref={containInputSearch} className='bg-white rounded-xl p-1 flex w-full relative'>
        <input
          onChange={handleChange}
          value={inputSearch}
          type='text'
          placeholder='Nhập tên điện thoại cần tìm ...'
          className='border-none outline-none text-black bg-transparent py-2 flex-grow pl-3'
        />
        <button className='py-1 text-black text-2xl px-4 rounded-sm flex-shrink-0 hover:opacity-90'>
          <CiSearch />
        </button>
        {inputSearch && (
          <div className='w-full min-h-20 bg-white absolute top-full z-10 shadow-md mt-1 rounded-sm grid grid-cols-12 p-4'>
            <div className='col-span-6'>
              <h4 className='underline'>Gợi ý tìm kiếm</h4>
              <ul>
                {listSuggetSearch && listSuggetSearch.length > 0 && listSuggetSearch.map((sugget) => <li>{sugget}</li>)}
              </ul>
            </div>
            <div className='col-span-6'>
              <h4 className='underline'>Lịch sử tìm kiếm</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
