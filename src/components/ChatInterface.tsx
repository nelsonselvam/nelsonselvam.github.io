import { useState, useEffect, useCallback, useRef } from 'react'
import { conversation } from '../data/resume'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'

interface ChatInterfaceProps {
  isDark: boolean
  onToggleDark: () => void
  onSwitchToBook: () => void
}

interface DisplayMessage {
  id: string
  role: 'system' | 'user' | 'assistant'
  text: string
  richContentType?: string
  modelId?: string
  modelIcon?: string
  modelGradient?: string
}

const AI_MODELS = [
  { id: 'the-flying-raijin-04', icon: '⚡', gradient: 'from-violet-500 to-blue-500', tagline: 'Powered by nested if' },
  { id: 'edualc-3.5-sonnet', icon: '🧡', gradient: 'from-orange-500 to-amber-500', tagline: 'Definitely not Claude' },
  { id: 'inimeg-2.0-flash', icon: '💎', gradient: 'from-blue-400 to-cyan-400', tagline: 'Totally original' },
  { id: 'tpgtahc-4o-mini', icon: '💚', gradient: 'from-green-500 to-emerald-400', tagline: 'Not what you think' },
  { id: 'keespeed-r1-lite', icon: '🔵', gradient: 'from-blue-600 to-indigo-500', tagline: 'Speed is in the name' },
]

// Rotate models for each question
function getModelForQuestion(questionIdx: number) {
  return AI_MODELS[questionIdx % AI_MODELS.length]
}

const SYSTEM_MSG: DisplayMessage = {
  id: 'system-0',
  role: 'system',
  text: "Meet Nelson. This isn't actually an AI-powered introduction, rather just a mock-up of an AI chatbot interface. Because why write a simple intro when you can drastically over-engineer an interactive terminal to introduce yourself to the team? Pick a question below to get started.",
}

export default function ChatInterface({ isDark, onToggleDark, onSwitchToBook }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<DisplayMessage[]>([SYSTEM_MSG])
  const [answeredIndices, setAnsweredIndices] = useState<Set<number>>(new Set())
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [streamPhase, setStreamPhase] = useState<'idle' | 'switching' | 'thinking' | 'streaming'>('idle')
  const [tokens, setTokens] = useState<number>(1420)
  const [streamWordIdx, setStreamWordIdx] = useState(0)
  const [activeModel, setActiveModel] = useState(AI_MODELS[0])
  const [showModelPicker, setShowModelPicker] = useState(false)
  const [sessionHistory, setSessionHistory] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      const scrollHeight = scrollRef.current.scrollHeight
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [messages, streamPhase])

  // Theme (Claude Desktop warm pastel aesthetics for Light Mode)
  const t = {
    bg: isDark ? 'bg-[#000000]' : 'bg-[#fdfaf6]', 
    sidebar: isDark ? 'bg-[#0a0a0a]' : 'bg-[#f4f2ee]',
    border: isDark ? 'border-[#1f1f1f]' : 'border-[#eae5dc]',
    text: isDark ? 'text-gray-100' : 'text-[#2d2b2a]',
    textMuted: isDark ? 'text-gray-400' : 'text-[#7f7a75]',
    textDim: isDark ? 'text-zinc-500' : 'text-[#9c9791]',
    textFaint: isDark ? 'text-zinc-600' : 'text-[#aba59f]',
    textLabel: isDark ? 'text-gray-200' : 'text-[#4a4745]',
    btnHover: isDark ? 'hover:bg-[#1f1f1f]' : 'hover:bg-[#eae5dc]/60',
    cardBg: isDark ? 'bg-[#141414]' : 'bg-white',
    cardBorder: isDark ? 'border-[#292929]' : 'border-[#eae5dc]',
    inputBg: isDark ? 'bg-[#0a0a0a]' : 'bg-white',
    inputBorder: isDark ? 'border-[#1f1f1f]' : 'border-[#eae5dc]',
    dropdownBg: isDark ? 'bg-[#141414]' : 'bg-[#fdfaf6]',
    dropdownBorder: isDark ? 'border-[#292929]' : 'border-[#eae5dc]',
    dropdownHover: isDark ? 'hover:bg-[#1f1f1f]' : 'hover:bg-[#f4f2ee]',
    dropdownActive: isDark ? 'bg-[#292929]' : 'bg-[#eae5dc]',
    progressBg: isDark ? 'bg-[#1f1f1f]' : 'bg-[#eae5dc]',
    chipBg: isDark ? 'bg-[#0a0a0a] hover:bg-[#141414]' : 'bg-white hover:bg-[#f4f2ee]',
    chipBorder: isDark ? 'border-[#292929] hover:border-[#444444]' : 'border-[#eae5dc] hover:border-[#d7d0c3]',
    chipText: isDark ? 'text-gray-300 hover:text-white' : 'text-[#4a4745] hover:text-[#2d2b2a]',
  }

  const getTokens = useCallback((text: string) => text.split(/\s+/).filter(Boolean), [])
  const buildVisibleText = useCallback((tokens: string[], upTo: number) => {
    const words: string[] = []
    for (let i = 0; i < upTo && i < tokens.length; i++) {
      if (tokens[i] !== '{{pause}}') words.push(tokens[i])
    }
    return words.join(' ')
  }, [])

  const isThinking = streamPhase === 'thinking'
  const isSwitching = streamPhase === 'switching'
  const activeTokens = activeIdx !== null ? getTokens(conversation[activeIdx].assistant) : []
  const streamingText = streamPhase === 'streaming' && activeIdx !== null
    ? buildVisibleText(activeTokens, streamWordIdx) : null
  const remainingQuestions = conversation
    .map((ex, idx) => ({ question: ex.user, idx, showAfter: ex.showAfter }))
    .filter(({ idx, showAfter }) => !answeredIndices.has(idx) && (showAfter === undefined || answeredIndices.has(showAfter)))

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, streamingText, isThinking, isSwitching, streamPhase])

  // Streaming with {{pause}}
  useEffect(() => {
    if (streamPhase !== 'streaming' || activeIdx === null) return
    const tokens = getTokens(conversation[activeIdx].assistant)
    if (streamWordIdx >= tokens.length) {
      const cleanText = conversation[activeIdx].assistant.replace(/\{\{pause\}\}/g, '\n\n')
      const model = getModelForQuestion(activeIdx)
      setMessages(prev => [...prev, {
        id: `ai-${activeIdx}`, role: 'assistant', text: cleanText,
        richContentType: conversation[activeIdx].richContentType,
        modelId: model.id, modelIcon: model.icon, modelGradient: model.gradient,
      }])
      setAnsweredIndices(prev => new Set(prev).add(activeIdx))
      setActiveIdx(null)
      setStreamPhase('idle')
      setTokens(prev => prev + 250 + Math.floor(Math.random() * 200))
      return
    }
    const delay = tokens[streamWordIdx] === '{{pause}}' ? 2000 : 40
    const timer = window.setTimeout(() => setStreamWordIdx(prev => prev + 1), delay)
    return () => window.clearTimeout(timer)
  }, [streamPhase, streamWordIdx, activeIdx, getTokens])

  // Handle question — starts the switching → thinking → streaming flow
  const handleAsk = useCallback((idx: number) => {
    if (streamPhase !== 'idle') return
    // Add user message
    setMessages(prev => [...prev, { id: `user-${idx}`, role: 'user', text: conversation[idx].user }])
    setSessionHistory(prev => [conversation[idx].user, ...prev])
    setActiveIdx(idx)

    const targetModel = getModelForQuestion(idx)

    // Phase 1: switching (1.2s)
    setStreamPhase('switching')
    window.setTimeout(() => {
      setActiveModel(targetModel)
      // Phase 2: thinking (1.5s)
      setStreamPhase('thinking')
      window.setTimeout(() => {
        setStreamWordIdx(0)
        // Phase 3: streaming
        setStreamPhase('streaming')
      }, 1500)
    }, 1200)
  }, [streamPhase])

  // Skip
  const handleSkip = useCallback(() => {
    if ((streamPhase === 'switching' || streamPhase === 'thinking') && activeIdx !== null) {
      const model = getModelForQuestion(activeIdx)
      setActiveModel(model)
      setStreamWordIdx(0)
      setStreamPhase('streaming')
    } else if (streamPhase === 'streaming' && activeIdx !== null) {
      const cleanText = conversation[activeIdx].assistant.replace(/\{\{pause\}\}/g, '\n\n')
      const model = getModelForQuestion(activeIdx)
      setMessages(prev => [...prev, {
        id: `ai-${activeIdx}`, role: 'assistant', text: cleanText,
        richContentType: conversation[activeIdx].richContentType,
        modelId: model.id, modelIcon: model.icon, modelGradient: model.gradient,
      }])
      setAnsweredIndices(prev => new Set(prev).add(activeIdx))
      setActiveIdx(null)
      setStreamPhase('idle')
      setTokens(prev => prev + 250 + Math.floor(Math.random() * 200))
    }
  }, [streamPhase, activeIdx])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Escape') { e.preventDefault(); handleSkip() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleSkip])

  useEffect(() => {
    if (!showModelPicker) return
    const close = () => setShowModelPicker(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [showModelPicker])

  const allAnswered = answeredIndices.size === conversation.length

  // The target model for the current question (for switching display)
  const targetModel = activeIdx !== null ? getModelForQuestion(activeIdx) : activeModel

  return (
    <div className={`flex h-screen ${t.bg} ${t.text} font-inter`}>
      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col w-64 ${t.sidebar} border-r ${t.border}`}>
        {/* Brand Logo */}
        <div className="pt-5 px-5 pb-1 flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight font-inter">r<span className="text-violet-500">AI</span>jinGPT</span>
          <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-200 text-gray-500'}`}>Beta</span>
        </div>

        {/* Model selector — animates on switch */}
        <div className={`p-4 border-b ${t.border} relative`}>
          <button
            onClick={(e) => { e.stopPropagation(); setShowModelPicker(!showModelPicker) }}
            className={`w-full flex items-center gap-2 ${t.btnHover} rounded-lg p-1.5 -m-1.5 transition-colors`}
          >
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${activeModel.gradient} flex items-center justify-center text-xs flex-shrink-0 transition-all duration-500`}>
              {activeModel.icon}
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className={`text-sm font-semibold ${t.textLabel} truncate transition-all duration-300`}>{activeModel.id}</p>
              <p className={`text-xs ${t.textDim} truncate`}>{activeModel.tagline}</p>
            </div>
            <svg className={`w-3 h-3 ${t.textDim} transition-transform ${showModelPicker ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showModelPicker && (
            <div className={`absolute left-3 right-3 top-full mt-1 ${t.dropdownBg} border ${t.dropdownBorder} rounded-xl shadow-2xl overflow-hidden z-50`}>
              {AI_MODELS.map((model) => (
                <button key={model.id}
                  onClick={(e) => { e.stopPropagation(); setActiveModel(model); setShowModelPicker(false) }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors ${model.id === activeModel.id ? t.dropdownActive : t.dropdownHover}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${model.gradient} flex items-center justify-center text-xs flex-shrink-0`}>
                    {model.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${t.textLabel} truncate`}>{model.id}</p>
                    <p className={`text-xs ${t.textDim} truncate`}>{model.tagline}</p>
                  </div>
                  {model.id === activeModel.id && <span className="text-violet-400 text-sm">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-3">
          <button className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${t.textMuted} ${t.btnHover} transition-colors`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>

        <div className="flex-1 px-3 overflow-y-auto chat-scroll space-y-6 pb-4">
          <div>
            <p className={`text-xs ${t.textFaint} font-medium uppercase tracking-wider px-3 mb-2`}>Today</p>
            <div className={`flex items-start gap-2 px-3 py-2 ${t.cardBg} rounded-lg border ${t.cardBorder}`}>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0 mt-1.5" />
              <span className={`text-sm ${t.textLabel} font-medium leading-snug`}>Welcome to rAIjinGPT</span>
            </div>
            
            {/* Dynamic Session History */}
            {sessionHistory.map((q, i) => (
              <div key={`hist-${i}`} className={`flex items-start gap-2 px-3 py-2 ${t.btnHover} rounded-lg text-sm ${t.textLabel} font-medium cursor-default transition-colors mt-1`}>
                <span className="leading-snug">{q}</span>
              </div>
            ))}

            <div className={`flex items-start gap-2 px-3 py-2 ${t.btnHover} rounded-lg text-sm ${t.textMuted} cursor-default transition-colors mt-1`}>
              <span className="leading-snug">GCP bill $40,000 overnight why</span>
            </div>
            <div className={`flex items-start gap-2 px-3 py-2 ${t.btnHover} rounded-lg text-sm ${t.textMuted} cursor-default transition-colors`}>
              <span className="leading-snug">how to make VS Code work exactly like Cursor</span>
            </div>
          </div>

          <div>
             <p className={`text-xs ${t.textFaint} font-medium uppercase tracking-wider px-3 mb-2`}>Previous 7 Days</p>
             <div className={`flex items-start gap-2 px-3 py-2 ${t.btnHover} rounded-lg text-sm ${t.textMuted} cursor-default transition-colors`}>
               <span className="leading-snug">how to politely ask Claude to fix my code</span>
             </div>
             <div className={`flex items-start gap-2 px-3 py-2 ${t.btnHover} rounded-lg text-sm ${t.textMuted} cursor-default transition-colors`}>
               <span className="leading-snug">I asked AI to center a div and my DB is gone</span>
             </div>
             <div className={`flex items-start gap-2 px-3 py-2 ${t.btnHover} rounded-lg text-sm ${t.textMuted} cursor-default transition-colors`}>
               <span className="leading-snug">who approved this PR (oh wait it was me)</span>
             </div>
          </div>

           <div>
             <p className={`text-xs ${t.textFaint} font-medium uppercase tracking-wider px-3 mb-2`}>Previous 30 Days</p>
             <div className={`flex items-start gap-2 px-3 py-2 ${t.btnHover} rounded-lg text-sm ${t.textMuted} cursor-default transition-colors`}>
               <span className="leading-snug">Jira ticket stuck 'In Progress' since 2023</span>
             </div>
             <div className={`flex items-start gap-2 px-3 py-2 ${t.btnHover} rounded-lg text-sm ${t.textMuted} cursor-default transition-colors`}>
               <span className="leading-snug">emotionally apologizing to ChatGPT for my code</span>
             </div>
             <div className={`flex items-start gap-2 px-3 py-2 ${t.btnHover} rounded-lg text-sm ${t.textMuted} cursor-default transition-colors`}>
               <span className="leading-snug">Works on localhost:3000, ship it to prod</span>
             </div>
          </div>
        </div>

        <div className={`px-4 py-3 border-t ${t.border}`}>
          <p className={`text-xs ${t.textFaint} mb-1.5`}>Progress</p>
          <div className={`w-full ${t.progressBg} rounded-full h-1.5`}>
            <div className="bg-gradient-to-r from-violet-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(answeredIndices.size / conversation.length) * 100}%` }} />
          </div>
          <p className={`text-xs ${t.textFaint} mt-1`}>{answeredIndices.size}/{conversation.length} topics explored</p>
        </div>

        <div className={`p-3 border-t ${t.border} space-y-1`}>
          <button onClick={onSwitchToBook} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${t.textMuted} ${t.btnHover} transition-colors`}>
            📖 Book Mode
          </button>
          <button onClick={onToggleDark} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${t.textMuted} ${t.btnHover} transition-colors`}>
            {isDark ? '☀️ Light Theme' : '🌙 Dark Theme'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className={`md:hidden flex items-center justify-between p-3 border-b ${t.border}`}>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight font-inter">r<span className="text-violet-500">AI</span>jinGPT</span>
            <span className={`text-xs ${t.textDim} font-mono ml-1`}>{activeModel.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onSwitchToBook} className={`${t.textMuted} text-sm`}>📖</button>
            <button onClick={onToggleDark} className={`${t.textMuted} text-sm`}>{isDark ? '☀️' : '🌙'}</button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll py-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} text={msg.text} richContentType={msg.richContentType}
              modelIcon={msg.modelIcon || activeModel.icon} modelGradient={msg.modelGradient || activeModel.gradient}
              modelId={msg.modelId || activeModel.id} isDark={isDark} />
          ))}

          {/* Switching indicator */}
          {isSwitching && (
            <div className="message-enter flex justify-center py-4">
              <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full ${isDark ? 'bg-zinc-800/60 border-zinc-700/40' : 'bg-gray-100 border-gray-200'} border`}>
                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${targetModel.gradient} flex items-center justify-center text-xs animate-pulse`}>
                  {targetModel.icon}
                </div>
                <span className={`text-xs font-mono ${isDark ? 'text-violet-400/80' : 'text-violet-600/80'}`}>
                  Switching to <strong>{targetModel.id}</strong>...
                </span>
              </div>
            </div>
          )}

          {/* Thinking indicator */}
          {isThinking && (
            <div className="message-enter py-3 px-6 md:px-12 lg:px-24">
              <div className={`${isDark ? 'bg-zinc-900/70 border-zinc-800/80' : 'bg-white border-gray-200 shadow-sm'} border rounded-2xl rounded-tl-md p-4 max-w-3xl`}>
                <div className="flex items-center gap-2.5">
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br ${targetModel.gradient} flex items-center justify-center text-xs`}>
                    {targetModel.icon}
                  </div>
                  <span className={`text-xs font-mono ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>
                    {targetModel.id}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-zinc-600' : 'text-gray-300'}`}>·</span>
                  <span className={`text-xs italic ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>thinking...</span>
                </div>
                <div className="mt-3 ml-10">
                  <TypingIndicator />
                </div>
              </div>
            </div>
          )}

          {/* Streaming message */}
          {streamingText !== null && (
            <ChatMessage role="assistant" text={streamingText} isStreaming
              modelIcon={targetModel.icon} modelGradient={targetModel.gradient}
              modelId={targetModel.id} isDark={isDark} />
          )}

          {/* Suggested Questions */}
          {streamPhase === 'idle' && remainingQuestions.length > 0 && (
            <div className="message-enter px-6 md:px-12 lg:px-24 py-6">
              <p className={`${t.textDim} text-xs mb-3 font-inter`}>
                {answeredIndices.size === 0 ? 'Pick a question to begin:' : 'What else would you like to know?'}
              </p>
              <div className="flex flex-wrap gap-2">
                {remainingQuestions.map(({ question, idx }) => {
                  const qModel = getModelForQuestion(idx)
                  return (
                    <button key={idx} onClick={() => handleAsk(idx)}
                      className={`group px-4 py-2.5 ${t.chipBg} border ${t.chipBorder} rounded-xl text-sm ${t.chipText} font-inter transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/5`}>
                      <span className={`inline-block w-4 h-4 rounded-full bg-gradient-to-br ${qModel.gradient} text-[8px] leading-4 text-center mr-1.5 align-text-bottom`}>
                        {qModel.icon}
                      </span>
                      {question}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {allAnswered && (
            <div className="message-enter text-center py-6 px-6">
              <p className={`${t.textDim} text-sm font-inter`}>✨ That's the full introduction! Thanks for exploring.</p>
              <button onClick={onSwitchToBook}
                className={`mt-3 px-4 py-2 ${t.chipBg} border ${t.chipBorder} rounded-xl text-sm ${t.textMuted} transition-colors font-inter`}>
                📖 Switch to Book Mode for another view
              </button>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className={`border-t ${t.border} p-4`}>
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <div className={`flex-1 flex items-center ${t.inputBg} border ${t.inputBorder} rounded-xl px-4 py-3 font-mono shadow-sm`}>
              <span className={`text-blue-500 mr-2`}>$</span>
              <span className={`${t.textFaint} text-sm flex-1`}>
                {streamPhase === 'idle' ? remainingQuestions.length > 0 ? './ask_question.sh' : 'echo "Thank you for exploring! 👋" && exit 0' : 'evaluating...'}
              </span>
              {streamPhase === 'idle' && (
                <span className={`w-1.5 h-4 bg-blue-500 animate-pulse ml-1`}></span>
              )}
            </div>
            {streamPhase !== 'idle' && (
              <button onClick={handleSkip}
                className={`px-4 py-3 ${t.inputBg} ${t.btnHover} border ${t.inputBorder} shadow-sm rounded-xl text-sm ${t.textMuted} transition-colors flex items-center gap-1.5 font-mono`}>
                <span className="text-blue-500">^C</span> kill process
              </button>
            )}
          </div>
          <div className="max-w-3xl mx-auto mt-2 text-center flex items-center justify-between px-2">
            <span className={`text-xs font-mono ${remainingQuestions.length === 0 ? 'text-blue-500/60' : 'text-emerald-500/60'}`}>
              {remainingQuestions.length === 0 ? 'session disconnected.' : 'system ready.'}
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>
                ctx: {tokens.toLocaleString()} / 128k
              </span>
              <span className={`text-xs font-mono border flex-shrink-0 ${isDark ? 'border-[#1f1f1f] bg-[#0a0a0a]' : 'border-[#eae5dc] bg-white text-[#7f7a75]'} px-2 py-0.5 rounded`}>
                 {activeModel.id}
              </span>
            </div>
          </div>
          <p className={`max-w-3xl mx-auto mt-3 text-center text-[10.5px] ${isDark ? 'text-zinc-600' : 'text-slate-400'} italic`}>
            Vibe coded with Cursor & Antigravity · React + Tailwind · Deployed on GitHub Pages<br/>
            Disclaimer: The model names in the dropdown are parodies spelled backwards for comedic effect. I haven't secretly trained my own foundation models!
          </p>
        </div>
      </main>
    </div>
  )
}
