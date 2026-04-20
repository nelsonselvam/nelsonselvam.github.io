import { useState, useEffect } from 'react'
import Book from './components/Book'
import ChatInterface from './components/ChatInterface'

const AI_NAMES = [
  "Algorithmic Ape", "Generative Gazelle", "Heuristic Heron", 
  "Neural Narwhal", "Prompting Pangolin", "Sentient Squirrel", 
  "Vector Vulture", "Zero-shot Zebra"
];

const CORE_NAMES = [
  "Bionic Builder", "Caffeinated Coder", "Debugging Dolphin", 
  "Eloquent Engineer", "Fractal Falcon", "Git Guru", 
  "Iterative Iguana", "Java Jaguar", "Kernel Kangaroo", 
  "Logical Llama", "Modular Macaque", "Node Ninja", 
  "Object Ocelot", "Python Panther", "Query Quail", 
  "Recursive Rhino", "Serverless Sloth", "Typescript Tiger", 
  "UI Unicorn", "Vanilla Viper", "Webpack Walrus"
];

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [mode, setMode] = useState<'chat' | 'book'>('chat')

  useEffect(() => {
    // 75% chance to pick an AI-related title
    const useAIName = Math.random() < 0.75;
    const list = useAIName ? AI_NAMES : CORE_NAMES;
    const randomName = list[Math.floor(Math.random() * list.length)];
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