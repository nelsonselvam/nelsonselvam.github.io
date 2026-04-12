import ProfileCard from './chat-content/ProfileCard'
import CareerTimeline from './chat-content/CareerTimeline'
import SkillsGrid from './chat-content/SkillsGrid'
import CurrentStatus from './chat-content/CurrentStatus'
import PhilosophyCard from './chat-content/PhilosophyCard'
import FunFacts from './chat-content/FunFacts'
import UserManualCard from './chat-content/UserManualCard'

import CurrentMedia from './chat-content/CurrentMedia'

interface ChatMessageProps {
  role: 'system' | 'user' | 'assistant'
  text: string
  richContentType?: string
  isStreaming?: boolean
  modelIcon?: string
  modelGradient?: string
  modelId?: string
  isDark?: boolean
}

function formatText(text: string, isDark: boolean) {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className={`font-semibold ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>{part.slice(2, -2)}</strong>
        }
        return <span key={j}>{part}</span>
      })}
    </span>
  ))
}

function RichContent({ type, isDark }: { type: string; isDark: boolean }) {
  switch (type) {
    case 'profile': return <ProfileCard isDark={isDark} />
    case 'timeline': return <CareerTimeline isDark={isDark} />
    case 'skills': return <SkillsGrid isDark={isDark} />
    case 'currentStatus': return <CurrentStatus isDark={isDark} />
    case 'currentMedia': return <CurrentMedia isDark={isDark} />
    case 'philosophy': return <PhilosophyCard isDark={isDark} />
    case 'funFacts': return <FunFacts isDark={isDark} />
    case 'userManual': return <UserManualCard isDark={isDark} />
    default: return null
  }
}

export default function ChatMessage({ role, text, richContentType, isStreaming, modelIcon = '⚡', modelGradient = 'from-violet-500 to-blue-500', modelId = 'assistant', isDark = true }: ChatMessageProps) {
  if (role === 'system') {
    return (
      <div className="message-enter flex justify-center py-4 px-6">
        <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-gray-400'} italic text-center max-w-lg`}>{text}</p>
      </div>
    )
  }

  if (role === 'user') {
    return (
      <div className="message-enter flex justify-end py-3 px-6 md:px-12 lg:px-24">
        <div className={`max-w-md text-base font-mono flex items-center gap-2 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <span className={`${isDark ? 'text-emerald-500' : 'text-emerald-600'} font-bold`}>➜</span>
          <span className={`${isDark ? 'text-blue-400' : 'text-blue-500'} font-bold`}>~</span>
          <span>{text}</span>
        </div>
      </div>
    )
  }

  const cardBg = isDark
    ? 'bg-[#141414] border-[#292929]'
    : 'bg-white border-gray-200 shadow-sm'

  return (
    <div className="message-enter py-3 px-6 md:px-12 lg:px-24">
      <div className={`${cardBg} border rounded-2xl rounded-tl-md p-4 max-w-3xl`}>
        {/* Header: avatar + model name */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className={`flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br ${modelGradient} flex items-center justify-center text-xs`}>
            {modelIcon}
          </div>
          <span className={`text-xs font-mono font-medium ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
            {modelId}
          </span>
        </div>

        {/* Text */}
        <div className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed font-inter ${isStreaming ? 'typing-cursor' : ''}`}>
          {formatText(text, isDark)}
        </div>

        {/* Rich Content */}
        {!isStreaming && richContentType && (
          <div className={`rich-enter mt-4 pt-4 border-t ${isDark ? 'border-[#292929]' : 'border-gray-100'}`}>
            <RichContent type={richContentType} isDark={isDark} />
          </div>
        )}
      </div>
    </div>
  )
}
