import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react'
import { FiSend } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { FaRobot } from 'react-icons/fa'
import { getResponseChatAI } from '../../apis/openAi.api'
import { CiUser } from 'react-icons/ci'
import { navigatePageByAi } from '../../helpers/navigateOpenAI'
import { Link, useNavigate } from 'react-router-dom'
import { responseGet } from '../../apis/chat.api'
interface Message {
  id: number
  text: any
  sender: 'user' | 'other'
  timestamp: string
  avatar: JSX.Element
}

interface Props {
  showChat: boolean
  setShowChat: any
  messages: Message[]
  setMessages: any
}

function ChatBox(props: Props) {
  const [questionChatAi, setQuestionChatAi] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [newMessage, setNewMessage] = useState<string>('')
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const [messageChatBot, setMessageChatBot] = useState<string>('')
  const navigation = useNavigate()
  useEffect(() => {
    scrollToBottom()
  }, [props.messages])

  console.log(props.messages)

  useEffect(() => {
    questionChatAi && handleFetchOpenAi(questionChatAi)
  }, [questionChatAi])
  useEffect(() => {
    console.log('okokok')
    navigatePage(messageChatBot)
    // navigatePageByAi(messageChatBot)
  }, [messageChatBot])
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }
  const navigatePage = (contentPage: string | undefined) => {
    if (contentPage?.includes('trang chủ')) {
      navigation('/')
    } else if (contentPage?.includes('trang đăng nhập')) {
      navigation('/dang-nhap')
    } else if (contentPage?.includes('trang đăng kí')) {
      navigation('/dang-ki')
    } else {
    }
  }

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: props.messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toISOString(),
        avatar: <CiUser className='w-8 h-8 rounded-full object-cover mx-2' />
      }
      props.setMessages([...props.messages, newMsg])
      setQuestionChatAi(newMessage.trim())
      setNewMessage('')
    }
  }

  const handleFetchOpenAi = async (content: string) => {
    try {
      setIsLoading(true)
      const sessionId = `${Math.random().toString(36).substring(2)}-${Date.now().toString(36)}`
      const fetchApi = await responseGet({ sessionId: sessionId, message: content })
      if (fetchApi && fetchApi.status === 200) {
        console.log(fetchApi.data.reply)
        const response = JSON.parse(fetchApi.data.reply.toString())
        console.log(response)

        const newMsg: Message = {
          id: props.messages.length + 1,
          text: responseContent(response.type, response.content),
          sender: 'other',
          timestamp: new Date().toISOString(),
          avatar: <FaRobot className='w-8 h-8 rounded-full object-cover mx-2' />
        }
        props.setMessages([...props.messages, newMsg])
        setQuestionChatAi('')
        setMessageChatBot(fetchApi.data.choices[0].message.content)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className='z-50 fixed bottom-5 right-5 w-[450px] h-max  bg-gray-50 shadow-xl rounded-lg overflow-hidden'>
      <div className='bg-indigo-600 p-3 cursor-pointer' onClick={() => props.setShowChat(!props.showChat)}>
        <h2 className='text-white text-xl font-semibold'>Chat Bot </h2>
      </div>

      <div
        ref={chatContainerRef}
        id='chat-container'
        className='flex-1 p-4 overflow-y-auto space-y-4 h-[400px] container-chatbot'
        role='log'
        aria-label='Chat messages'
      >
        {props.messages.map((message, idx) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[80%]`}
            >
              {message.avatar}
              <div
                className={`px-4 py-2 rounded-2xl ${message.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'} shadow-md w-full`}
              >
                <p className='text-sm w-full text-wrap break-words'>{message.text}</p>
                <span className='text-xs opacity-75 block mt-1'>{formatTimestamp(message.timestamp)}</span>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className='flex gap-2 justify-start items-center'>
            <FaRobot className='w-8 h-8 rounded-full object-cover mx-2 ' />
            <div className='typing-indicator flex space-x-2 px-4 py-2 rounded-2xl shadow-md w-max'>
              <div className='dot w-1 h-1 bg-gray-500 rounded-full'></div>
              <div className='dot w-1 h-1 bg-gray-500 rounded-full'></div>
              <div className='dot w-1 h-1 bg-gray-500 rounded-full'></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className='p-4 border-t border-gray-200 bg-white'>
        <div className='flex space-x-2'>
          <input
            type='text'
            value={newMessage}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
            placeholder='Type your message...'
            className='flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            aria-label='Type your message'
          />
          <button
            type='submit'
            className='bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200'
            aria-label='Send message'
          >
            <FiSend className='w-5 h-5' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatBox
export function responseContent(type: string, content: string) {
  const navigate = useNavigate()
  switch (type) {
    case 'filter':
      return <Link to={content}>Click vào đây</Link>
    case 'navigate':
      navigate(content)
      return <p>Chuyển trang thành công</p>
    case 'question':
      return <p>{content}</p>
    default:
      return
  }
}
