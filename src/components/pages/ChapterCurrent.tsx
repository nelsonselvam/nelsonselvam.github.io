import BookPage from '../BookPage'
import { currentStatus } from '../../data/resume'

interface ChapterCurrentProps {
  isDark: boolean
}

export default function ChapterCurrent({ isDark }: ChapterCurrentProps) {
  const textClass = isDark ? 'text-gold-100' : 'text-stone-600'
  const headingClass = isDark ? 'text-gold-100' : 'text-stone-800'
  const cardBg = isDark
    ? 'bg-gold-900/10 border-gold-600/20'
    : 'bg-stone-50/80 border-stone-200/50'

  return (
    <BookPage
      isDark={isDark}
      pageNumber={5}
      chapterNumber={3}
      chapterTitle="The Current Chapter"
      chapterSubtitle="What I'm building now"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Currently Learning */}
        <div className={`p-5 rounded-xl border ${cardBg}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📖</span>
            <h3 className={`font-playfair text-base font-bold ${headingClass}`}>
              Currently Learning
            </h3>
          </div>
          <ul className="space-y-2">
            {currentStatus.learning.map((item, idx) => (
              <li key={idx} className={`flex items-start gap-2 font-nunito text-sm ${textClass}`}>
                <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Currently Working On */}
        <div className={`p-5 rounded-xl border ${cardBg}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">💼</span>
            <h3 className={`font-playfair text-base font-bold ${headingClass}`}>
              Currently Building
            </h3>
          </div>
          <ul className="space-y-2">
            {currentStatus.working.map((item, idx) => (
              <li key={idx} className={`flex items-start gap-2 font-nunito text-sm ${textClass}`}>
                <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Currently Reading */}
        <div className={`p-5 rounded-xl border ${cardBg}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📚</span>
            <h3 className={`font-playfair text-base font-bold ${headingClass}`}>
              Currently Reading
            </h3>
          </div>
          <ul className="space-y-3">
            {currentStatus.reading.map((book, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5">📖</span>
                <div>
                  <p className={`font-nunito text-sm font-medium ${textClass}`}>
                    {book.title}
                  </p>
                  <p className={`font-nunito text-xs italic ${
                    isDark ? 'text-gold-300/60' : 'text-stone-400'
                  }`}>
                    by {book.author}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Quote */}
          <div className={`mt-4 pt-3 border-t ${isDark ? 'border-gold-700/15' : 'border-stone-200/40'}`}>
            <p className={`font-playfair italic text-xs text-center ${
              isDark ? 'text-gold-300/60' : 'text-stone-400/70'
            }`}>
              "{currentStatus.readingQuote.text}"
            </p>
            <p className={`font-nunito text-xs text-center mt-1 ${
              isDark ? 'text-gold-400/50' : 'text-stone-400/50'
            }`}>
              — {currentStatus.readingQuote.author}
            </p>
          </div>
        </div>

        {/* Currently Listening To */}
        <div className={`p-5 rounded-xl border ${cardBg}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🎧</span>
            <h3 className={`font-playfair text-base font-bold ${headingClass}`}>
              Currently Listening To
            </h3>
          </div>
          <div className="space-y-3">
            {currentStatus.spotify.map((embed, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg">
                <iframe
                  style={{ borderRadius: '8px' }}
                  src={embed.url}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BookPage>
  )
}
