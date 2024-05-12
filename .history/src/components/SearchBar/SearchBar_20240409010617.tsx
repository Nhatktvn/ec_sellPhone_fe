import { useRef, useState } from 'react'
import { Modal } from 'antd'
import { CiSearch } from 'react-icons/ci'
const SearchBar = () => {
  const [inputSearch, setInputSearch] = useState('')
  const typingTimeoutRef = useRef(0)

  const handleInputSeacrch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputSearch(value)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      getSuggestKey(value)
    }, 300)
  }

  const getSuggestKey = (key: string) => {
    console.log(key)
  }
  return (
    <div className='w-full relative'>
      <div className='bg-white rounded-sm p-1 flex w-full'>
        <input
          onChange={handleInputSeacrch}
          value={inputSearch}
          type='text'
          placeholder='Nhập tên điện thoại cần tìm ...'
          className='border-none outline-none text-black bg-transparent py-2 flex-grow pl-3'
          onBlur={() => setInputSearch('')}
        />
        <button className='py-1 text-black px-4 rounded-sm flex-shrink-0 hover:opacity-90'>
          <CiSearch />
        </button>
      </div>
      {inputSearch && (
        <div className='w-full min-h-20 bg-white absolute z-10 shadow-md mt-1 rounded-sm grid grid-cols-12 p-4'>
          <div className='col-span-6'>
            <h4 className='underline'>Gợi ý tìm kiếm</h4>
          </div>
          <div className='col-span-6'>
            <h4 className='underline'>Lịch sử tìm kiếm</h4>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
