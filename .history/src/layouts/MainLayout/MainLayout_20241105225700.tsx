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

  var button: any = document.querySelector('.mck-box-top')
  button.addEventListener('click', function () {
    alert('Button clicked!')
  })
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

      {!showChat ? (
        // <ChatBox setShowChat={setShowChat} showChat={showChat} messages={messages} setMessages={setMessages} />
        <div className='fixed bottom-0 right-0'>
          <iframe
            name='chatBot'
            // style='border: none'
            height='600px'
            width='400px'
            src='https://widget.kommunicate.io/chat?appId=34c2398c83a6c6f959ea99ecb9c6c59ac&noFocus=true'
            allow='microphone; geolocation;'
          ></iframe>
        </div>
      ) : (
        <button className='fixed bottom-5 right-5' onClick={() => setShowChat(true)}>
          <IoChatbubbleEllipsesSharp className='text-6xl text-indigo-600 z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          <span className='block w-[45px] h-[45px] bg-indigo-400 rounded-full animate-ping '></span>
        </button>
      )}
      <Footer />
    </div>
  )
}
