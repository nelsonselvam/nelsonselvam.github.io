import { useState } from 'react'
import Book from './components/Book'
import ChatInterface from './components/ChatInterface'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [mode, setMode] = useState<'chat' | 'book'>('chat')

  if (mode === 'book') {
    return (
      <Book
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        onSwitchToChat={() => setMode('chat')}
      />
    )
  }

  return (
    <ChatInterface
      isDark={isDark}
      onToggleDark={() => setIsDark(!isDark)}
      onSwitchToBook={() => setMode('book')}
    />
  )
}