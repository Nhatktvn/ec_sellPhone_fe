import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react'
import { FiSend } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface Message {
  id: number
  text: string
  sender: 'user' | 'other'
  timestamp: string
  avatar: string
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hey there! How are you doing?',
      sender: 'other',
      timestamp: '2024-01-10T10:30:00',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    {
      id: 2,
      text: "I'm doing great! Thanks for asking. How about you?",
      sender: 'user',
      timestamp: '2024-01-10T10:31:00',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36'
    },
    {
      id: 3,
      text: "I'm good too! Just working on some new projects.",
      sender: 'other',
      timestamp: '2024-01-10T10:32:00',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    }
  ])

  const [newMessage, setNewMessage] = useState<string>('')
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toISOString(),
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36'
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className='z-50 fixed bottom-0 right-0 max-w-4xl h-max  bg-gray-50 shadow-xl rounded-lg overflow-hidden'>
      <div className='bg-indigo-600 p-4'>
        <h1 className='text-white text-xl font-semibold'>Chat Room</h1>
      </div>

      <div
        ref={chatContainerRef}
        className='flex-1 p-4 overflow-scroll space-y-4 h-[400px]'
        role='log'
        aria-label='Chat messages'
      >
        {messages.map((message) => (
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
              <img
                src={message.avatar}
                alt='User avatar'
                className='w-8 h-8 rounded-full object-cover mx-2'
                loading='lazy'
              />
              <div
                className={`px-4 py-2 rounded-2xl ${message.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'} shadow-md w-full`}
              >
                <p className='text-sm w-full text-wrap '>{message.text}</p>
                <span className='text-xs opacity-75 block mt-1'>{formatTimestamp(message.timestamp)}</span>
              </div>
            </div>
          </motion.div>
        ))}
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