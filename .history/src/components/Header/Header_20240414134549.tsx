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
  console.log(isAuthenticated)
  const countCart = useSelector((state: RootState) => state.cart.countCart)
  console.log(countCart)
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      if (isAuthenticated.isAuthenticated) {
        getProfileUser()
        dispatch(login(dataUser))
      }
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
        <form className='col-span-12 lg:col-span-6'>
          <SearchBar />
        </form>
        <div className='lg:col-span-4 col-span-12 flex items-center justify-between h-full'>
          <div className='text-3xl text-white flex gap-2 items-center'>
            <FiPhoneCall className='animate-rang' />
            <div className='text-sm flex flex-col hover:text-[#ffda24] duration-150 cursor-pointer'>
              <span>Hotline</span>
              <span className='font-bold'>1900.000.999</span>
            </div>
          </div>
          <div className='flex gap-2 items-center group'>
            <span className='text-3xl text-white'>
              <VscAccount />
            </span>
            {isAuthenticated && isAuthenticated.isAuthenticated ? (
              <div className='relative py-3 group'>
                <Link
                  className=' group-hover:text-[#ffda24] duration-150 text-white text-sm font-bold  py-3'
                  to={'/login'}
                >
                  Tài khoản
                </Link>
                <div className='w-max h-max bg-white absolute top-full scale-0 opacity-0 z-10 left-1/2 -translate-x-1/2 rounded-md shadow-md text-base p-2 flex flex-col items-start group-hover:opacity-100 group-hover:scale-100 duration-200 origin-top'>
                  <Link className='hover:text-orange' to={'/'}>
                    Thông tin cá nhân
                  </Link>
                  <button className='hover:text-orange' onClick={logoutUser}>
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className='text-white flex flex-col text-sm font-bold'>
                <Link className='hover:text-[#ffda24] duration-150' to={'/login'}>
                  Đăng nhập
                </Link>
                <Link className='hover:text-[#ffda24] duration-150' to={'/register'}>
                  Đăng kí
                </Link>
              </div>
            )}
          </div>
          <button className='col-span-2 lg:col-span-1 flex justify-center relative group '>
            <span className='absolute bg-white w-6 h-6 text-center rounded-full flex items-center justify-center'>
              0
            </span>
            <div className='text-3xl text-white flex bg-[#dc3545] items-center p-2 rounded-lg gap-1'>
              <IoCartOutline />
              <span className='text-sm group-hover:text-[#ffda24] duration-150 font-medium'>Giỏ hàng</span>
            </div>
            <div className='w-[300px] h-[300px] bg-white absolute top-full right-[40%] py-5 opacity-0 group-hover:opacity-100 group-hover:scale-100 origin-top-right scale-0 transition duration-200 ease-linear border border-solid border-gray-300 rounded-md shadow-lg z-10'></div>
          </button>
        </div>
      </div>
    </div>
  )
}
