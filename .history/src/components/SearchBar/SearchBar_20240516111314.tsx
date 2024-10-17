import { useCallback, useEffect, useRef, useState } from 'react'
import { Modal } from 'antd'
import { CiSearch } from 'react-icons/ci'
import _ from 'lodash'
import { getSuggetProduct } from '../../apis/product.api'
import { product } from '../../types/product.type'
const SearchBar = () => {
  const [inputSearch, setInputSearch] = useState('')
  const [listSuggetSearch, setListSuggetSearch] = useState<product[]>([])
  const containInputSearch = useRef<HTMLDivElement>(null)

  const handleInputSeacrch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputSearch(value)
  }
  console.log(listSuggetSearch)

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
          <div className='w-full min-h-20 bg-white absolute top-full z-10 shadow-md mt-1 rounded-md p-4'>
            <div className=''>
              <h4 className='underline text-orange'>Gợi ý tìm kiếm</h4>
              <ul className='mt-2'>
                {listSuggetSearch &&
                  listSuggetSearch.length > 0 &&
                  listSuggetSearch.map((sugget) => (
                    <li className='hover:bg-gray-200 p-2 rounded-md cursor-pointer flex gap-3 border-b-2'>
                      <div className='w-16 h-16'>
                        <img src={sugget.urlImage} alt='' />
                      </div>
                      <div>{sugget.name}</div>
                    </li>
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

export default SearchBar
