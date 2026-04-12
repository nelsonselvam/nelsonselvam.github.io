import { useState, useEffect, useCallback, ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CoverPage from './pages/CoverPage'
import TableOfContents from './pages/TableOfContents'
import ChapterOrigin from './pages/ChapterOrigin'
import ChapterCraft from './pages/ChapterCraft'
import ChapterCurrent from './pages/ChapterCurrent'
import ChapterPhilosophy from './pages/ChapterPhilosophy'
import BackCover from './pages/BackCover'

interface BookProps {
  isDark: boolean
  onToggleDark: () => void
  onSwitchToChat?: () => void
}

const pageVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 40 : -40,
    x: direction > 0 ? '15%' : '-15%',
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    rotateY: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -40 : 40,
    x: direction > 0 ? '-15%' : '15%',
    opacity: 0,
    scale: 0.94,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }),
}

export default function Book({ isDark, onToggleDark, onSwitchToChat }: BookProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)

  const pages: { component: ReactElement; label: string }[] = [
    { component: <CoverPage isDark={isDark} />, label: 'Cover' },
    { component: <TableOfContents isDark={isDark} />, label: 'Contents' },
    { component: <ChapterOrigin isDark={isDark} />, label: 'Ch. 1' },
    { component: <ChapterCraft isDark={isDark} />, label: 'Ch. 2' },
    { component: <ChapterCurrent isDark={isDark} />, label: 'Ch. 3' },
    { component: <ChapterPhilosophy isDark={isDark} />, label: 'Ch. 4' },
    { component: <BackCover isDark={isDark} />, label: 'End' },
  ]

  const totalPages = pages.length

  const goToPage = useCallback((page: number) => {
    if (page < 0 || page >= totalPages) return
    setDirection(page > currentPage ? 1 : -1)
    setCurrentPage(page)
  }, [currentPage, totalPages])

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1)
  }, [currentPage, totalPages, goToPage])

  const prevPage = useCallback(() => {
    if (currentPage > 0) goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextPage()
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevPage()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextPage, prevPage])

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-[#0a0908] via-[#100e0b] to-[#0a0908]'
          : 'bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200'
      }`}
      style={{ perspective: '1200px' }}
    >
      {/* Theme Toggle */}
      <button
        onClick={onToggleDark}
        className={`fixed top-5 right-5 z-50 print:hidden p-2.5 rounded-full transition-all duration-300 shadow-lg ${
          isDark
            ? 'bg-paper-dark/80 hover:bg-paper-dark text-gold-400 border border-gold-800/30'
            : 'bg-white/80 hover:bg-white text-stone-600 border border-stone-300/50'
        }`}
        aria-label="Toggle theme"
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      {/* Chat Mode Toggle */}
      {onSwitchToChat && (
        <button
          onClick={onSwitchToChat}
          className={`fixed top-5 right-16 z-50 print:hidden p-2.5 rounded-full transition-all duration-300 shadow-lg ${
            isDark
              ? 'bg-paper-dark/80 hover:bg-paper-dark text-gold-400 border border-gold-800/30'
              : 'bg-white/80 hover:bg-white text-stone-600 border border-stone-300/50'
          }`}
          aria-label="Switch to chat mode"
        >
          💬
        </button>
      )}

      {/* Export to PDF */}
      <button
        onClick={() => window.print()}
        className={`fixed top-5 right-[104px] z-50 print:hidden p-2.5 rounded-full transition-all duration-300 shadow-lg ${
          isDark
            ? 'bg-paper-dark/80 hover:bg-paper-dark text-gold-400 border border-gold-800/30'
            : 'bg-white/80 hover:bg-white text-stone-600 border border-stone-300/50'
        }`}
        aria-label="Export to PDF"
      >
        🖨️
      </button>

      {/* GitHub Link */}
      <a
        href="https://github.com/nelsonselvam/nelsonselvam.github.io/tree/main"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed top-5 left-5 z-50 print:hidden flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg transition-all duration-300 text-sm font-medium ${
          isDark
            ? 'bg-paper-dark/80 hover:bg-paper-dark text-gold-400 border border-gold-800/30'
            : 'bg-white/80 hover:bg-white text-stone-600 border border-stone-300/50'
        }`}
        aria-label="View source on GitHub"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.774.418-1.304.76-1.604-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.518 11.518 0 0 1 3-.404c1.02.004 2.046.138 3 .404 2.29-1.552 3.295-1.23 3.295-1.23.654 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.625-5.475 5.922.43.37.815 1.102.815 2.222 0 1.604-.015 2.896-.015 3.286 0 .32.217.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
        <span>Source</span>
      </a>

      {/* Page Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {pages[currentPage].component}
        </motion.div>
      </AnimatePresence>

      {/* Left click zone (previous page) */}
      {currentPage > 0 && (
        <button
          onClick={prevPage}
          className="fixed left-0 top-0 w-16 h-full z-30 cursor-w-resize group"
          aria-label="Previous page"
        >
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isDark ? 'text-gold-500' : 'text-stone-400'
          }`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </button>
      )}

      {/* Right click zone (next page) */}
      {currentPage < totalPages - 1 && (
        <button
          onClick={nextPage}
          className="fixed right-0 top-0 w-16 h-full z-30 cursor-e-resize group"
          aria-label="Next page"
        >
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isDark ? 'text-gold-500' : 'text-stone-400'
          }`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      )}

      {/* Bottom Navigation Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 py-4 px-6 ${
        isDark ? 'bg-gradient-to-t from-[#0a0908] via-[#0a0908]/90 to-transparent' : 'bg-gradient-to-t from-stone-200 via-stone-200/90 to-transparent'
      }`}>
        {/* Page dots */}
        <div className="flex items-center gap-2">
          {pages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentPage
                  ? `w-8 h-2 ${isDark ? 'bg-gold-400' : 'bg-stone-700'}`
                  : `w-2 h-2 ${isDark ? 'bg-gold-600/50 hover:bg-gold-500/70' : 'bg-stone-400/40 hover:bg-stone-400/60'}`
              }`}
              aria-label={`Go to ${page.label}`}
              title={page.label}
            />
          ))}
        </div>

        {/* Page label */}
        <span className={`text-xs font-nunito ml-3 ${
          isDark ? 'text-gold-400/60' : 'text-stone-400'
        }`}>
          {pages[currentPage].label}
        </span>

        {/* Keyboard hint */}
        <span className={`text-xs font-nunito ml-4 hidden md:inline ${
          isDark ? 'text-gold-500/50' : 'text-stone-300'
        }`}>
          Use ← → keys
        </span>
      </div>
    </div>
  )
}
