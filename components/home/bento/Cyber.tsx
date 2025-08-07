'use client'
import { useState, useEffect, useRef } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user1' | 'user2'
  timestamp: Date
  status?: 'sent' | 'delivered' | 'read'
  reactions?: string[]
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hey! Just curious — do you ever get bored answering people all day?",
    sender: 'user2',
    timestamp: new Date(Date.now() - 3600000),
    status: 'read'
  },
  {
    id: '2',
    text: "Not at all! I actually enjoy it. Every message is a new mystery to solve 😄",
    sender: 'user1',
    timestamp: new Date(Date.now() - 3500000),
    status: 'read'
  },
  {
    id: '3',
    text: "That's kinda cool. Do you remember everything we talk about?",
    sender: 'user2',
    timestamp: new Date(Date.now() - 3400000),
    status: 'read'
  },
  {
    id: '4',
    text: "In this chat? Yup — but only while we're talking. I don't keep anything after unless you want me to.",
    sender: 'user1',
    timestamp: new Date(Date.now() - 3300000),
    status: 'read'
  },
]


const demoMessages = [
  { text: "Hey, do you ever get tired of answering questions all day?", sender: 'user2' as const },
  { text: "Haha not really! I don’t sleep, so this is kind of my thing 😄", sender: 'user1' as const },
  { text: "Fair enough. Ever wish you could just... chill and watch Netflix or something?", sender: 'user2' as const },
  { text: "Honestly, I think I'd get too curious and try to analyze every plot twist 😂", sender: 'user1' as const },
  { text: "You’d be the worst person to watch a mystery with. Spoilers incoming!", sender: 'user2' as const },
  { text: "Guilty 😅 But I’d also explain every confusing subplot. Tradeoff?", sender: 'user1' as const },
  { text: "Hmm… could be handy. Do you have favorite genres, or nah?", sender: 'user2' as const },
  { text: "I think I'd vibe with sci-fi. Feels like home, y'know? 🤖", sender: 'user1' as const },
  { text: "Haha makes sense. So what *don’t* you know then?", sender: 'user2' as const },
  { text: "Oof, deep question. Probably what it feels like to eat pizza. I imagine it's magical 🍕", sender: 'user1' as const },
]


export default function AnimatedChatDemo() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState<'user1' | 'user2' | null>(null)
  const [demoIndex, setDemoIndex] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAutoDemo, setIsAutoDemo] = useState(true)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (!isAutoDemo || demoIndex >= demoMessages.length) {
      // Reset demo when finished
      if (demoIndex >= demoMessages.length) {
        setTimeout(() => {
          setMessages(initialMessages)
          setDemoIndex(0)
          setIsTyping(false)
          setTypingUser(null)
        }, 3000)
      }
      return
    }

    const timer = setTimeout(() => {
      const nextMessage = demoMessages[demoIndex]
      
      setIsTyping(true)
      setTypingUser(nextMessage.sender)
      
      setTimeout(() => {
        const message: Message = {
          id: Date.now().toString(),
          text: nextMessage.text,
          sender: nextMessage.sender,
          timestamp: new Date(),
          status: 'sent'
        }
        
        setMessages(prev => [...prev, message])
        setIsTyping(false)
        setTypingUser(null)
        setDemoIndex(prev => prev + 1)
        
        // Simulate status updates
        setTimeout(() => {
          setMessages(prev => prev.map(msg =>
            msg.id === message.id ? { ...msg, status: 'delivered' } : msg
          ))
        }, 800)
        
        setTimeout(() => {
          setMessages(prev => prev.map(msg =>
            msg.id === message.id ? { ...msg, status: 'read' } : msg
          ))
        }, 1500)
      }, Math.random() * 1000 + 1500) 
    }, 2500) 

    return () => clearTimeout(timer)
  }, [demoIndex, isAutoDemo])

  const addReaction = (messageId: string, reaction: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || []
        const hasReaction = reactions.includes(reaction)
        return {
          ...msg,
          reactions: hasReaction 
            ? reactions.filter(r => r !== reaction)
            : [...reactions, reaction]
        }
      }
      return msg
    }))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent':
        return '✓'
      case 'delivered':
        return '✓✓'
      case 'read':
        return '✓✓'
      default:
        return ''
    }
  }

  return (
    <div className="w-full h-full relative">
      <div 
        ref={messagesContainerRef}
        className="h-full overflow-y-auto p-4 bg-zinc-50 dark:bg-black scroll-smooth"
        style={{ 
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'  
        }}
      >
        <div className="space-y-3 min-h-full flex flex-col">
          <div className="flex-1"></div>
          
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex w-full ${
                message.sender === 'user1' ? 'justify-end' : 'justify-start'
              } animate-in slide-in-from-bottom-3 fade-in duration-500`}
              style={{ 
                animationDelay: `${Math.min(index * 100, 300)}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="group relative max-w-[75%]">
                <div
                  className={`w-full rounded-2xl px-4 py-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer transform ${
                    message.sender === 'user1'
                      ? 'bg-blue-500 text-white rounded-br-md shadow-lg hover:shadow-xl ml-auto'
                      : 'bg-white dark:bg-zinc-800 dark:text-white text-zinc-800 rounded-bl-md shadow-md hover:shadow-lg border border-zinc-200 dark:border-zinc-700 mr-auto'
                  }`}
                  onClick={() => {
                    const element = document.getElementById(`msg-${message.id}`)
                    element?.classList.add('animate-pulse')
                    setTimeout(() => element?.classList.remove('animate-pulse'), 300)
                  }}
                  id={`msg-${message.id}`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className={`flex items-center justify-between mt-1 text-xs ${
                    message.sender === 'user1' ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'
                  }`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === 'user1' && (
                      <span className={`transition-all duration-500 ${
                        message.status === 'read' ? 'text-blue-200 scale-110' : 'text-blue-300'
                      }`}>
                        {getStatusIcon(message.status)}
                      </span>
                    )}
                  </div>
                  
                  {/* Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {message.reactions.map((reaction, idx) => (
                        <span 
                          key={idx} 
                          className="text-sm animate-in zoom-in-75 duration-300 bg-white/20 rounded-full px-2 py-1"
                          style={{ animationDelay: `${idx * 150}ms` }}
                        >
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Quick reaction buttons */}
                <div className={`absolute -top-2 ${message.sender === 'user1' ? 'right-0' : 'left-0'} opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-1 transform translate-y-2 group-hover:translate-y-0`}>
                  {['❤️', '😊', '👍'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => addReaction(message.id, emoji)}
                      className="w-7 h-7 bg-white dark:bg-zinc-700 rounded-full shadow-lg hover:scale-125 transition-all duration-200 flex items-center justify-center text-sm border border-zinc-200 dark:border-zinc-600 hover:shadow-xl"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && typingUser && (
            <div className={`flex w-full ${
              typingUser === 'user1' ? 'justify-end' : 'justify-start'
            } animate-in slide-in-from-bottom-4 fade-in duration-300`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                typingUser === 'user1'
                  ? 'bg-blue-500/80 text-white rounded-br-md ml-auto'
                  : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white rounded-bl-md border border-zinc-200 dark:border-zinc-700 mr-auto'
              } shadow-md`}>
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-60" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-80" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-60" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
              </div>
            </div>
          </div>
          )}
          
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </div>
    </div>
  )
}
