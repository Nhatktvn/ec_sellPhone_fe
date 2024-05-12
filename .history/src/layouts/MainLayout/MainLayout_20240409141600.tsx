import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

interface Props {
  children?: React.ReactNode
  title: string
}
export default function MainLayout({ children, title }: Props) {
  return (
    <div className='bg-[#F5F5F5]'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
