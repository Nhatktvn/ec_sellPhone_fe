import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RootState } from '../../reducer/rootReducer'
import { useEffect, useState } from 'react'
import { profileUser } from '../../apis/profile.api'
import { login, logout } from '../../slices/authSlice'
import SearchBar from '../SearchBar'
import IconLogo from '../Icon/IconLogo'
export default function Header() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth)
  const [dataUser, setDataUser] = useState(isAuthenticated ? isAuthenticated.user : null)
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      getProfileUser()
      dispatch(login(dataUser))
    }
  }, [])

  const logoutUser = () => {
    dispatch(logout())
    localStorage.removeItem('accessToken')
  }
  const getProfileUser = async () => {
    try {
      const getProfileUser = await profileUser()
      setDataUser(getProfileUser.data.data)
    } catch (error) {
      throw error
    }
  }
  return (
    <div className='pb-3 pt-1 bg-orange'>
      <div className='container'>
        <div className='flex justify-end items-center text-white text-[13px] pb-2'>
          <div className='group relative'>
            <div className='flex items-center cursor-pointer gap-1 py-2 hover:text-gray-200'>
              <span>Tiếng Việt</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
              </svg>
            </div>
            <div className='bg-white absolute top-full right-0 shadow-2xl rounded-sm transition duration-200 ease-linear  border border-gray-200 opacity-0 group-hover:opacity-100 group-hover:scale-100 origin-top scale-0 w-full'>
              <span className='border-x-transparent border-t-transparent border-b-white border-[11px] z-10 absolute -translate-y-[100%] left-[50%] -translate-x-[50%]'></span>
              <div className='flex flex-col items-start text-black' style={{ width: 'max-content' }}>
                <button className='py-2 px-3 hover:text-[red] font-medium'>Tiếng Việt</button>
                <button className='py-2 px-3 hover:text-[red] font-medium'>English </button>
              </div>
            </div>
          </div>
          {isAuthenticated.isAuthenticated ? (
            <div className='flex'>
              <span className=' block w-10 h-10 bg-gray-400 rounded-full mx-2'></span>
              <span
                className=' flex justify-center items-center cursor-pointer bg-blue-700 p-2 rounded-lg text-center'
                onClick={logoutUser}
              >
                Logout
              </span>
            </div>
          ) : (
            <div className='flex'>
              <Link
                to={'/register'}
                className='flex items-center py-1 hover:text-gray-300 cursor-pointer px-3 border-r-2'
                style={{ height: 'max-content' }}
              >
                Đăng Ký
              </Link>
              <Link to={'/login'} className='flex items-center py-1 hover:text-gray-300 cursor-pointer px-3'>
                Đăng Nhập
              </Link>
            </div>
          )}
        </div>
        <div className='grid grid-cols-12 gap-4 items-end'>
          <Link to='/' className='mx-auto col-span-12 lg:col-span-2'>
            <IconLogo />
          </Link>
          <form className='col-span-10 lg:col-span-9'>
            <SearchBar />
          </form>
          <button className='col-span-2 lg:col-span-1 flex justify-center relative group '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-8 h-8 text-white'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
              />
            </svg>
            <div className='w-[300px] h-[300px] bg-white absolute top-full right-[40%] py-5 opacity-0 group-hover:opacity-100 group-hover:scale-100 origin-top-right scale-0 transition duration-200 ease-linear border border-solid border-gray-300 rounded-sm shadow-lg'></div>
          </button>
        </div>
      </div>
    </div>
  )
}
