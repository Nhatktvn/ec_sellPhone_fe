import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useEffect } from 'react'

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
      <div>
        <span>Phone</span>
        <span>message</span>
        <span></span>
      </div>

      {children}
      <Footer />
    </div>
  )
}