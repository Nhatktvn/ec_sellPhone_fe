import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useEffect } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FaExchangeAlt } from 'react-icons/fa'
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
      <div className='bg-orange fixed z-10 top-1/2 right-0 flex flex-col text-2xl -translate-y-1/2'>
        <span className=''>Phone</span>
        <span>
          <FaFacebook />
        </span>
        <span>Zalo</span>
        <span className='rotate-90'>
          <FaExchangeAlt />
        </span>
      </div>
      {children}
      <Footer />
    </div>
  )
}
