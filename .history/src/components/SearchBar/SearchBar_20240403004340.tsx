import { useRef, useState } from 'react'
import { Modal } from 'antd'
const SearchBar = () => {
  const [inputSearch, setInputSearch] = useState('')
  const typingTimeoutRef = useRef(null)

  const handleInputSeacrch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputSearch(value)
    typingTimeoutRef.current = setTimeout(() => {}, 300)
  }

  const getSuget
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
        <button className='bg-orange py-2 px-6 rounded-sm flex-shrink-0 hover:opacity-90'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 text-white'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
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
