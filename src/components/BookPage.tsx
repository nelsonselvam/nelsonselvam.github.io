interface BookPageProps {
  children: React.ReactNode
  pageNumber?: number
  chapterNumber?: number
  chapterTitle?: string
  chapterSubtitle?: string
  isDark: boolean
  className?: string
  noPadding?: boolean
}

export default function BookPage({
  children,
  pageNumber,
  chapterNumber,
  chapterTitle,
  chapterSubtitle,
  isDark,
  className = '',
  noPadding = false,
}: BookPageProps) {
  return (
    <div className={`relative w-full h-screen flex flex-col ${
      isDark ? 'book-page-dark' : 'book-page-light'
    } ${className}`}>
      {/* Page edge shadow (right) */}
      <div className={`page-edge-right ${
        isDark
          ? 'bg-gradient-to-l from-black/20 to-transparent'
          : 'bg-gradient-to-l from-stone-300/30 to-transparent'
      }`} />

      {/* Spine shadow (left) */}
      <div className={`page-edge-left ${
        isDark
          ? 'bg-gradient-to-r from-black/30 to-transparent'
          : 'bg-gradient-to-r from-stone-300/20 to-transparent'
      }`} />

      {/* Chapter header */}
      {chapterNumber != null && (
        <div className="text-center pt-12 md:pt-16 pb-2 px-6 flex-shrink-0">
          <p className={`text-xs md:text-sm tracking-[0.3em] uppercase font-nunito font-medium ${
            isDark ? 'text-gold-400' : 'text-stone-400'
          }`}>
            Chapter {chapterNumber}
          </p>
          {chapterTitle && (
            <h2 className={`font-playfair text-3xl md:text-5xl font-bold mt-2 ${
              isDark ? 'text-gold-100' : 'text-stone-800'
            }`}>
              {chapterTitle}
            </h2>
          )}
          {chapterSubtitle && (
            <p className={`font-playfair italic text-base md:text-lg mt-1 ${
              isDark ? 'text-gold-300/70' : 'text-stone-400'
            }`}>
              {chapterSubtitle}
            </p>
          )}
          {/* Divider ornament */}
          <div className={`chapter-divider ${isDark ? 'chapter-divider-dark' : 'chapter-divider-light'} mt-4`}>
            <span className={`text-sm ${isDark ? 'text-gold-400/60' : 'text-stone-300'}`}>✦</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`flex-1 overflow-y-auto book-scroll ${
        noPadding ? '' : 'px-8 md:px-16 lg:px-24 py-4'
      }`}>
        <div className={`${noPadding ? 'h-full' : 'max-w-4xl mx-auto w-full'}`}>
          {children}
        </div>
      </div>

      {/* Page number */}
      {pageNumber != null && (
        <div className={`text-center pb-10 pt-2 flex-shrink-0 font-playfair text-sm ${
          isDark ? 'text-gold-500/50' : 'text-stone-400/60'
        }`}>
          — {pageNumber} —
        </div>
      )}
    </div>
  )
}
