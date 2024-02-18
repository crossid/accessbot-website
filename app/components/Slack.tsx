import { ChevronLeftIcon, MagnifyingGlassIcon, PaperAirplaneIcon, UsersIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { Badge } from './ui/badge'
import { Input } from './ui/input'

const USER_AVATAR =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

const BOT_AVATAR =
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

export type MessageType = {
  author: 'user' | 'bot'
  nickName: string
  content: string
  avatar?: string
}

export type ChannelType = {
  type: 'channel' | 'user' | 'app'
  name: string
  unread: number
  selected?: boolean
}

const Channels: ChannelType[] = [
  {
    type: 'channel',
    name: 'Random',
    unread: 2,
  },
  {
    type: 'channel',
    name: 'Marketing',
    unread: 1,
  },
  {
    type: 'channel',
    name: 'Engineering',
    unread: 0,
  },
  {
    type: 'app',
    name: 'AccessBot',
    unread: 0,
    selected: true,
  },
]

const Message: React.FC<{ author: string; nickName: string; avatar: string; content: string }> = ({
  nickName,
  avatar,
  content,
}) => {
  return (
    <div className="flex items-start gap-4">
      <img
        alt="Avatar"
        className="rounded-full"
        height="40"
        src={avatar}
        style={{
          aspectRatio: '40/40',
          objectFit: 'cover',
        }}
        width="40"
      />
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold">{nickName}</h3>
          <span className="text-sm text-gray-400">4:30 PM</span>
        </div>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  )
}

const Slack: React.FC<{ initialMessages: MessageType[] }> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [messageIndex, setMessageIndex] = useState(0)
  const [isBotTyping, setIsBotTyping] = useState(false)

  useEffect(() => {
    if (messageIndex < initialMessages.length) {
      const currentMessage = initialMessages[messageIndex]

      if (currentMessage.author === 'user') {
        simulateUserTyping(currentMessage)
      } else {
        simulateBotResponse(currentMessage)
      }
    }
  }, [messageIndex, initialMessages])

  const simulateUserTyping = ({ nickName, content, avatar }: MessageType) => {
    let i = 0
    setCurrentInput('')

    const typeMessage = () => {
      if (i < content.length) {
        setCurrentInput(content.substring(0, i + 1))
        i++
        const typingSpeed = Math.random() * (80 - 50) + 30
        setTimeout(typeMessage, typingSpeed)
      } else {
        // Check if this message is already the last in the messages array
        setMessages((prevMessages) => {
          if (prevMessages.length === 0 || prevMessages[prevMessages.length - 1].content !== content) {
            return [...prevMessages, { author: 'user', nickName, content, avatar }]
          }
          return prevMessages
        })
        setCurrentInput('')
        setTimeout(() => setMessageIndex(messageIndex + 1), 0)
      }
    }

    typeMessage()
  }

  const simulateBotResponse = ({ nickName, content, avatar }: MessageType) => {
    setIsBotTyping(true)
    let i = 0
    let botMessage = ''

    setTimeout(() => {
      setIsBotTyping(false)

      // Add an initial empty bot message to the messages array
      setMessages((prevMessages) => [...prevMessages, { author: 'bot', nickName, content: '', avatar }])

      const typeMessage = () => {
        if (i < content.length) {
          botMessage += content.charAt(i)
          // Update the last message in the array with the partially typed message
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages]
            newMessages[newMessages.length - 1].content = botMessage
            return newMessages
          })

          i++
          const typingSpeed = Math.random() * (80 - 50) + 30
          setTimeout(typeMessage, typingSpeed)
        } else {
          setMessageIndex(messageIndex + 1)
        }
      }

      typeMessage()
    }, 1200)
  }

  return (
    <div className="flex size-full h-[70vh] flex-col bg-[#1a1d21] text-white">
      {/* top toolbar */}
      <div className="flex h-[60px] items-center border-b border-[#4a2e51] bg-[#1f0e24] px-4">
        <Button className="size-8 rounded-full md:hidden" size="icon" variant="outline">
          <ChevronLeftIcon className="size-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <Button variant="link" className="flex items-center gap-2 font-semibold text-gray-300">
          <SlackIcon className="size-6" />
          <span className="">Acme Inc</span>
        </Button>
        <Button className="ml-auto size-8 rounded-full" size="icon" variant="ghost">
          <MagnifyingGlassIcon className="size-4" />
          <span className="sr-only">Toggle search</span>
        </Button>
        <Button className="size-8 rounded-full" size="icon" variant="ghost">
          <img
            alt="Avatar"
            className="rounded-full"
            height="32"
            src={USER_AVATAR}
            style={{
              aspectRatio: '32/32',
              objectFit: 'cover',
            }}
            width="32"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* sidebar */}
        <div className="hidden w-[300px] border-r  border-[#4a2e51] bg-gray-800/40 md:block">
          <div className="flex h-[60px] items-center border-b border-[#4a2e51] bg-[#1f0e24] px-4">
            <form className="flex w-full items-center gap-x-2 rounded-lg">
              <MagnifyingGlassIcon className="ml-2 size-4 text-gray-400" />
              <Input
                className="w-full rounded-lg border-none bg-gray-800/40"
                placeholder="Search"
                type="search"
                disabled
              />
            </form>
          </div>
          <div className="h-full flex-1 overflow-auto bg-[#1f0e24]">
            <nav className="grid items-start px-4 text-sm font-medium">
              {Channels.map((channel) => (
                <Button
                  key={channel.name}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-gray-400 hover:text-gray-50',
                    channel.selected && 'bg-[#5f2565] text-white',
                  )}
                >
                  {channel.name}
                  <Badge className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full">
                    {channel.unread > 0 ? channel.unread : null}
                  </Badge>
                </Button>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex h-[60px] items-center border-b border-gray-700 px-4">
            <div className="flex gap-2">
              <Button className="size-8 rounded-full" size="icon" variant="ghost">
                <ChevronLeftIcon className="size-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="text-lg font-semibold">Access Bot</h1>
            </div>
            <Button className="ml-auto size-8 rounded-full" size="icon" variant="ghost">
              <UsersIcon className="size-4" />
              <span className="sr-only">Toggle members</span>
            </Button>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-auto p-4">
              <div className="grid gap-4">
                {messages.map((msg, index) => (
                  <Message
                    key={index}
                    author={msg.author}
                    content={msg.content}
                    nickName={msg.nickName}
                    avatar={msg.avatar || msg.author === 'bot' ? msg.avatar || BOT_AVATAR : msg.avatar || USER_AVATAR}
                  />
                ))}
                {isBotTyping && <div className="animate-pulse">...</div>}
              </div>
            </div>
            <div className="border-t border-gray-700">
              <form className="flex h-12 items-center px-4">
                <Input
                  value={currentInput}
                  readOnly
                  className="size-full rounded-lg border-none bg-[#1a1d21] outline-none"
                  placeholder="Message AccessBot"
                  disabled
                />
                <Button className="ml-2 size-8 rounded-full" size="icon" variant="outline">
                  <PaperAirplaneIcon className="size-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="3" height="8" x="13" y="2" rx="1.5" />
      <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" />
      <rect width="3" height="8" x="8" y="14" rx="1.5" />
      <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" />
      <rect width="8" height="3" x="14" y="13" rx="1.5" />
      <path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" />
      <rect width="8" height="3" x="2" y="8" rx="1.5" />
      <path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" />
    </svg>
  )
}

export default Slack
