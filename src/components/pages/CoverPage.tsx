import { profile } from '../../data/resume'

interface CoverPageProps {
  isDark: boolean
}

export default function CoverPage({ isDark }: CoverPageProps) {
  return (
    <div className={`relative w-full h-screen flex flex-col items-center justify-center ${
      isDark ? 'book-page-dark' : 'book-page-light'
    }`}>
      {/* Decorative border frame */}
      <div className={`absolute inset-6 md:inset-12 border ${
        isDark ? 'border-gold-600/25' : 'border-stone-300/40'
      } rounded-sm pointer-events-none`} />
      <div className={`absolute inset-8 md:inset-14 border ${
        isDark ? 'border-gold-600/15' : 'border-stone-300/20'
      } rounded-sm pointer-events-none`} />

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-2xl">
        {/* Top ornament */}
        <div className={`chapter-divider ${isDark ? 'chapter-divider-dark' : 'chapter-divider-light'} mb-12`}>
          <span className={`text-lg ${isDark ? 'text-gold-400/70' : 'text-stone-400/60'}`}>✦</span>
        </div>

        {/* Book label */}
        <p className={`text-xs md:text-sm tracking-[0.4em] uppercase font-nunito font-medium mb-8 ${
          isDark ? 'text-gold-400/70' : 'text-stone-400'
        }`}>
          An Interactive Introduction
        </p>

        {/* Title */}
        <h1 className={`font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight ${
          isDark ? 'text-gold-100' : 'text-stone-800'
        }`}>
          The Engineering
          <br />
          <span className={`font-playfair italic font-medium ${
            isDark ? 'text-gold-300' : 'text-stone-600'
          }`}>Journey</span>
        </h1>

        {/* Author */}
        <div className="mt-8 space-y-2">
          <p className={`text-xs tracking-[0.3em] uppercase font-nunito ${
            isDark ? 'text-gold-400/60' : 'text-stone-400/70'
          }`}>
            by
          </p>
          <p className={`font-playfair text-2xl md:text-3xl font-medium ${
            isDark ? 'text-gold-100' : 'text-stone-700'
          }`}>
            {profile.name}
          </p>
          <p className={`font-nunito text-sm md:text-base font-medium ${
            isDark ? 'text-gold-300/80' : 'text-stone-500'
          }`}>
            {profile.title}
          </p>
        </div>

        {/* Quote */}
        <div className="mt-12 max-w-md mx-auto">
          <p className={`font-playfair italic text-sm md:text-base leading-relaxed ${
            isDark ? 'text-gold-300/60' : 'text-stone-400/80'
          }`}>
            "{profile.coverQuote}"
          </p>
        </div>

        {/* Bottom ornament */}
        <div className={`chapter-divider ${isDark ? 'chapter-divider-dark' : 'chapter-divider-light'} mt-12`}>
          <span className={`text-lg ${isDark ? 'text-gold-500/50' : 'text-stone-400/60'}`}>✦</span>
        </div>

        {/* CTA */}
        <p className={`mt-10 text-xs md:text-sm font-nunito animate-pulse ${
          isDark ? 'text-gold-400/60' : 'text-stone-400/60'
        }`}>
          Press <kbd className={`inline-block px-2 py-0.5 rounded text-xs border mx-1 ${
            isDark ? 'border-gold-600/40 text-gold-300/80' : 'border-stone-300 text-stone-500'
          }`}>→</kbd> to turn the page
        </p>
      </div>
    </div>
  )
}
