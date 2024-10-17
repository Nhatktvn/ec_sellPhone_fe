import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RootState } from '../../reducer/rootReducer'
import { useEffect, useState } from 'react'
import { getProfile } from '../../apis/profile.api'
import { login, logout } from '../../slices/authSlice'
import SearchBar from '../SearchBar'
import IconLogo from '../Icon/IconLogo'
import { IoCartOutline } from 'react-icons/io5'
import { VscAccount } from 'react-icons/vsc'
import { FiPhoneCall } from 'react-icons/fi'
import { getListCart } from '../../apis/cart.api'
import { cartList } from '../../slices/cartSlice'
import { FiSmartphone } from 'react-icons/fi'
import { FaLaptop, FaHeadphonesAlt } from 'react-icons/fa'
import { BsSmartwatch } from 'react-icons/bs'
import { FaTabletScreenButton } from 'react-icons/fa6'
export default function Header() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth)
  const cart = useSelector((state: RootState) => state.cart)
  const [dataUser, setDataUser] = useState(isAuthenticated ? isAuthenticated.user : null)
  const countCart = useSelector((state: RootState) => state.cart.countCart)
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      getProfileUser()
      getCountCart()
    }
  }, [isAuthenticated])

  const convertName = (namePhone: string) => {
    const arrLink = namePhone.toLowerCase().split(' ')
    return arrLink.join('-')
  }
  const getCountCart = async () => {
    try {
      const rsGetCart = await getListCart()
      if (rsGetCart && rsGetCart.status === 200) {
        dispatch(cartList(rsGetCart.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const logoutUser = () => {
    dispatch(cartList([]))
    dispatch(logout())
    localStorage.removeItem('accessToken')
  }
  const getProfileUser = async () => {
    try {
      const getProfileUser = await getProfile()
      if (getProfileUser && getProfileUser.status == 200) {
        dispatch(login(getProfileUser.data.data))
        setDataUser(getProfileUser.data.data)
      }
    } catch (error) {
      throw error
    }
  }
  return (
    <div className='bg-orange pt-3'>
      <div className='container grid grid-cols-12 gap-4 items-end'>
        <Link to='/' className='mx-auto col-span-12 lg:col-span-2 h-full flex items-center'>
          <IconLogo />
        </Link>
        <div className='col-span-12 lg:col-span-6'>
          <SearchBar />
        </div>
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
                  <Link className='hover:text-orange' to={'/trang-ca-nhan'}>
                    Thông tin cá nhân
                  </Link>
                  <Link className='hover:text-orange' to={'/yeu-thich'}>
                    Danh sách yêu thích
                  </Link>
                  <Link className='hover:text-orange' to={'/don-hang'}>
                    Đơn hàng
                  </Link>
                  <button className='hover:text-orange' onClick={logoutUser}>
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className='text-white flex flex-col text-sm font-bold'>
                <Link className='hover:text-[#ffda24] duration-150' to={'/dang-nhap'}>
                  Đăng nhập
                </Link>
                <Link className='hover:text-[#ffda24] duration-150' to={'/dang-ki'}>
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
          <Link to={'/gio-hang'} className='col-span-2 lg:col-span-1 flex justify-center relative group'>
            <span className='absolute bg-white w-6 h-6 text-center rounded-full flex items-center justify-center top-0 right-0 translate-x-1/2 -translate-y-1/3 text-orange'>
              {countCart}
            </span>
            <div className='text-3xl text-white flex bg-[#dc3545] items-center p-2 rounded-lg gap-1'>
              <IoCartOutline />
              <span className='text-sm group-hover:text-[#ffda24] duration-150 font-medium'>Giỏ hàng</span>
            </div>
            <div className='w-[300px] h-max  bg-white absolute top-full right-[40%] p-1 opacity-0 group-hover:opacity-100 group-hover:scale-100 origin-top-right scale-0 transition duration-200 ease-linear border border-solid border-gray-300 rounded-md shadow-lg z-10'>
              <ul className='scroll-cart overflow-y-scroll p-1 h-[300px]'>
                {cart.cartItems && cart.cartItems.length > 0 ? (
                  cart.cartItems.map((item) => (
                    <Link
                      to={`/dien-thoai/${convertName(item.name)}`}
                      className='hover:bg-gray-200 p-2 rounded-md cursor-pointer flex gap-3 border-b-2'
                    >
                      <div className='w-16 h-16'>
                        <img src={item.urlImage} alt='' />
                      </div>
                      <div>
                        <h4 className='text-sm'>{item.name}</h4>
                        <div>
                          <span className='text-orange text-sm mr-2'>{formatToVND(item.sellPrice)}</span>
                          <span className='text-gray-500 text-sm line-through'>{formatToVND(item.originalPrice)}</span>
                        </div>
                        <div>
                          <span className='text-sm mr-2'>{item.color}</span>
                          <span className='text-sm '>{item.storageCapacity}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <img src='https://salanest.com/img/empty-cart.webp' alt='' />
                )}
              </ul>
              <div className='w-full mt-3 mb-2 text-sm text-center'>
                <Link to={'/gio-hang'} className='mx-auto w-max bg-orange p-2 text-white rounded-md'>
                  Xem giỏ hàng
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className='container mt-1'>
        <ul className='flex gap-4 text-white'>
          <Link
            to='/dien-thoai'
            className='hover:bg-[#ff1630] hover:rounded-t-md transition-all duration-75 p-2 text-base cursor-pointer flex items-center gap-1'
          >
            <FiSmartphone />
            Điện thoại
          </Link>
          <Link
            to={'/laptop'}
            className='hover:bg-[#ff1630] hover:rounded-t-md transition-all duration-75 p-2 text-base cursor-pointer flex items-center gap-1'
          >
            <FaLaptop />
            Laptop
          </Link>
          <Link
            to='/phu-kien'
            className='hover:bg-[#ff1630] hover:rounded-t-md transition-all duration-75 p-2 text-base cursor-pointer flex gap-1 items-center'
          >
            <FaHeadphonesAlt />
            Phụ kiện
          </Link>
          <Link
            to='/smartwatch'
            className='hover:bg-[#ff1630] hover:rounded-t-md transition-all duration-75 p-2 text-base cursor-pointer flex gap-1 items-center'
          >
            <BsSmartwatch />
            Smartwatch
          </Link>
          <Link
            to='/tablet'
            className='hover:bg-[#ff1630] hover:rounded-t-md transition-all duration-75 p-2 text-base cursor-pointer flex gap-1 items-center'
          >
            <FaTabletScreenButton />
            Tablet
          </Link>
        </ul>
      </div>
    </div>
  )
}

function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.floor(number / 1000) * 1000)
}
