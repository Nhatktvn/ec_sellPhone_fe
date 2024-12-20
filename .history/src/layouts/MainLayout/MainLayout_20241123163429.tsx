import { Link, Outlet, useLocation } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { SiZalo } from 'react-icons/si'
import { FiPhoneCall } from 'react-icons/fi'
import ChatBox from '../../components/ChatBox'
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5'

interface Props {
  children?: React.ReactNode
  title: string
}

interface Message {
  id: number
  text: string
  sender: 'user' | 'other'
  timestamp: string
  avatar: JSX.Element
}
export default function MainLayout({ children, title }: Props) {
  const location = useLocation()
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  useEffect(() => {
    document.title = title
  }, [location.pathname])
  return (
    <div className='bg-[#F5F5F5]'>
      <Header />
      <div className='bg-orange fixed z-10 top-1/2 right-0 flex flex-col text-2xl -translate-y-1/2 text-white rounded-tl-3xl overflow-hidden rounded-bl-3xl'>
        <a href='tel:+84378025713' target='_blank' className='p-3'>
          <FiPhoneCall />
        </a>
        <a href='https://www.facebook.com/ynmyvynym/' target='_blank' className='p-3'>
          <FaFacebook />
        </a>
        <a href='https:/zalo.me/0378025713' target='_blank' className='p-3'>
          <SiZalo />
        </a>
        <div className='p-3 rotate-90'>
          <LiaExchangeAltSolid />
        </div>
      </div>
      <div className='min-h-[80vh]'>{children}</div>
      <ChatBox messages={messages} setMessages={setMessages} setShowChat={setShowChat} showChat={showChat} />
      <Footer />
    </div>
  )
}
