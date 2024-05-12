import { Link, Outlet, useLocation } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useEffect } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { SiZalo } from 'react-icons/si'
import { FiPhoneCall } from 'react-icons/fi'
interface Props {
  children?: React.ReactNode
  title: string
}
export default function MainLayout({ children, title }: Props) {
  const location = useLocation()
  useEffect(() => {
    document.title = title
  }, [location.pathname])
  return (
    <div className='bg-[#F5F5F5]'>
      <Header />
      <div className='bg-orange fixed z-10 top-1/2 right-0 flex flex-col text-2xl -translate-y-1/2 text-white rounded-tl-3xl overflow-hidden rounded-bl-3xl'>
        <Link to={'/'} className='p-3'>
          <FiPhoneCall className='animate-rang' />
        </Link>
        <Link to={'https://www.facebook.com/ynmyvynym/'} className='p-3'>
          <FaFacebook />
        </Link>
        <Link to={'https://www.facebook.com/ynmyvynym/'} className='p-3'>
          <SiZalo />
        </Link>
        <div className='p-3 rotate-90'>
          <LiaExchangeAltSolid />
        </div>
      </div>
      {children}
      <Footer />
    </div>
  )
}
