import BookPage from '../BookPage'
import { profile, funFacts } from '../../data/resume'

interface BackCoverProps {
  isDark: boolean
}

export default function BackCover({ isDark }: BackCoverProps) {
  const textClass = isDark ? 'text-gold-100' : 'text-stone-600'
  const subtextClass = isDark ? 'text-gold-300/60' : 'text-stone-400'

  return (
    <BookPage isDark={isDark} pageNumber={7}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        {/* Fun Facts */}
        <h3 className={`font-playfair text-2xl font-bold mb-6 ${
          isDark ? 'text-gold-100' : 'text-stone-800'
        }`}>
          Fun Facts
        </h3>

        <div className="grid grid-cols-2 gap-4 max-w-lg mb-10">
          {funFacts.map((fact, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border text-center transition-all duration-200 hover:scale-105 ${
                isDark
                  ? 'bg-gold-900/10 border-gold-600/20'
                  : 'bg-stone-50/80 border-stone-200/50'
              }`}
            >
              <span className="text-3xl block mb-2">{fact.icon}</span>
              <p className={`font-nunito text-xs leading-relaxed ${textClass}`}>
                {fact.text}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={`chapter-divider ${isDark ? 'chapter-divider-dark' : 'chapter-divider-light'} mb-8 w-full max-w-xs`}>
          <span className={`text-sm ${isDark ? 'text-gold-400/60' : 'text-stone-300'}`}>✦</span>
        </div>

        {/* Connect */}
        <h3 className={`font-playfair text-lg font-bold mb-4 ${
          isDark ? 'text-gold-100' : 'text-stone-800'
        }`}>
          Let's Connect
        </h3>
        <div className="flex items-center gap-4 mb-10">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-nunito text-sm font-medium border transition-all duration-200 hover:scale-105 ${
              isDark
                ? 'border-gold-700/20 text-gold-300 bg-gold-800/10 hover:bg-gold-800/20'
                : 'border-stone-300 text-stone-700 bg-white hover:bg-stone-50'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.774.418-1.304.76-1.604-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.518 11.518 0 0 1 3-.404c1.02.004 2.046.138 3 .404 2.29-1.552 3.295-1.23 3.295-1.23.654 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.625-5.475 5.922.43.37.815 1.102.815 2.222 0 1.604-.015 2.896-.015 3.286 0 .32.217.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-nunito text-sm font-medium border transition-all duration-200 hover:scale-105 ${
              isDark
                ? 'border-gold-700/20 text-gold-300 bg-gold-800/10 hover:bg-gold-800/20'
                : 'border-stone-300 text-stone-700 bg-white hover:bg-stone-50'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>

        {/* Built with */}
        <div className="mb-6">
          <p className={`font-nunito text-xs ${subtextClass}`}>
            Vibe coded in VS Code, Cursor & Antigravity · React + Tailwind CSS
          </p>
          <p className={`font-nunito text-xs mt-1 ${subtextClass}`}>
            Deployed with <span className="text-red-400">❤️</span> on GitHub Pages
          </p>
        </div>

        {/* To be continued */}
        <p className={`font-playfair italic text-lg ${
          isDark ? 'text-gold-300/60' : 'text-stone-400/70'
        }`}>
          To be continued...
        </p>
      </div>
    </BookPage>
  )
}
