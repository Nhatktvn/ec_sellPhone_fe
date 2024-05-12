import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RootState } from '../../reducer/rootReducer'
import { useEffect, useState } from 'react'
import { profileUser } from '../../apis/profile.api'
import { login, logout } from '../../slices/authSlice'
import SearchBar from '../SearchBar'
import IconLogo from '../Icon/IconLogo'
import { IoCartOutline } from 'react-icons/io5'
import { VscAccount } from 'react-icons/vsc'
import { FiPhoneCall } from 'react-icons/fi'
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
    <div className='bg-orange py-3'>
      <div className='container grid grid-cols-12 gap-4 items-end'>
        <Link to='/' className='mx-auto col-span-12 lg:col-span-2 h-full flex items-center'>
          <IconLogo />
        </Link>
        <form className='col-span-10 lg:col-span-7'>
          <SearchBar />
        </form>
        <div className='lg:col-span-3 flex items-center justify-between h-full'>
          <div className='text-3xl text-white flex gap-2 items-center'>
            <FiPhoneCall />
            <div className='text-sm flex flex-col hover:text-[#ffda24] duration-150 cursor-pointer'>
              <span>Hotline</span>
              <span className='font-bold'>1900.000.999</span>
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-3xl text-white'>
              <VscAccount />
            </span>
            <div className='text-white flex flex-col text-sm font-bold'>
              <Link className='hover:text-[#ffda24] duration-150' to={'/login'}>
                Đăng nhập
              </Link>
              <Link className='hover:text-[#ffda24] duration-150' to={'/register'}>
                Đăng kí
              </Link>
            </div>
          </div>
          <button className='col-span-2 lg:col-span-1 flex justify-center relative group '>
            <div className='text-3xl text-white flex'>
              <IoCartOutline />
              <span className='text-sm'>Giỏ hàng</span>
            </div>
            <div className='w-[300px] h-[300px] bg-white absolute top-full right-[40%] py-5 opacity-0 group-hover:opacity-100 group-hover:scale-100 origin-top-right scale-0 transition duration-200 ease-linear border border-solid border-gray-300 rounded-sm shadow-lg'></div>
          </button>
        </div>
      </div>
    </div>
  )
}
