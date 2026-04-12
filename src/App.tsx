import { useState, useEffect } from 'react'
import Book from './components/Book'
import ChatInterface from './components/ChatInterface'

const UBUNTU_NAMES = [
  "Algorithmic Ape", "Bionic Builder", "Caffeinated Coder", 
  "Debugging Dolphin", "Eloquent Engineer", "Fractal Falcon", 
  "Git Guru", "Hacking Hippo", "Iterative Iguana", 
  "Java Jaguar", "Kernel Kangaroo", "Logical Llama", 
  "Modular Macaque", "Node Ninja", "Object Ocelot", 
  "Python Panther", "Query Quail", "Recursive Rhino", 
  "Serverless Sloth", "Typescript Tiger", "UI Unicorn", 
  "Vanilla Viper", "Webpack Walrus"
]

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [mode, setMode] = useState<'chat' | 'book'>('chat')

  useEffect(() => {
    const randomName = UBUNTU_NAMES[Math.floor(Math.random() * UBUNTU_NAMES.length)];
    document.title = `Nelson Selvam | ${randomName}`;
  }, []);

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