import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div className='bg-[#F5F5F5]'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
