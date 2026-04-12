import BookPage from '../BookPage'
import { chapters } from '../../data/resume'

interface TableOfContentsProps {
  isDark: boolean
}

export default function TableOfContents({ isDark }: TableOfContentsProps) {
  const textClass = isDark ? 'text-gold-100' : 'text-stone-700'
  const subtextClass = isDark ? 'text-gold-300/70' : 'text-stone-400'

  return (
    <BookPage isDark={isDark} pageNumber={2}>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {/* Title */}
        <h2 className={`font-playfair text-3xl md:text-4xl font-bold mb-2 ${
          isDark ? 'text-gold-100' : 'text-stone-800'
        }`}>
          Contents
        </h2>
        <div className={`chapter-divider ${isDark ? 'chapter-divider-dark' : 'chapter-divider-light'} mb-10`}>
          <span className={`text-sm ${isDark ? 'text-gold-400/60' : 'text-stone-300'}`}>✦</span>
        </div>

        {/* Chapter list */}
        <div className="w-full max-w-lg space-y-6">
          {chapters.map((chapter) => (
            <div key={chapter.number} className="flex items-end">
              <div className="flex-shrink-0">
                <span className={`font-playfair text-sm font-medium ${subtextClass}`}>
                  Chapter {chapter.number}
                </span>
                <span className={`mx-3 font-playfair text-lg font-semibold ${textClass}`}>
                  {chapter.title}
                </span>
              </div>
              <div className="toc-leader" style={{ color: isDark ? '#c4a35a' : '#78716c' }} />
              <span className={`font-playfair text-sm flex-shrink-0 ${subtextClass}`}>
                {chapter.page}
              </span>
            </div>
          ))}

          {/* Epilogue */}
          <div className="flex items-end mt-2">
            <div className="flex-shrink-0">
              <span className={`font-playfair text-lg font-semibold ${textClass}`}>
                Epilogue
              </span>
            </div>
            <div className="toc-leader" style={{ color: isDark ? '#c4a35a' : '#78716c' }} />
            <span className={`font-playfair text-sm flex-shrink-0 ${subtextClass}`}>
              7
            </span>
          </div>
        </div>

        {/* Subtitle descriptions */}
        <div className="w-full max-w-lg mt-10 space-y-3">
          {chapters.map((chapter) => (
            <div key={chapter.number} className="flex items-start gap-3">
              <span className={`font-nunito text-xs font-medium mt-0.5 ${subtextClass}`}>
                {chapter.number}.
              </span>
              <p className={`font-caveat text-base md:text-lg ${
                isDark ? 'text-gold-300/60' : 'text-stone-400/70'
              }`}>
                {chapter.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </BookPage>
  )
}
