import { currentStatus } from '../../data/resume'

export default function CurrentStatus({ isDark = true }: { isDark?: boolean }) {
  const card = isDark ? 'bg-zinc-800/40 border-zinc-700/40' : 'bg-gray-50 border-gray-200'
  const heading = isDark ? 'text-zinc-300' : 'text-gray-800'
  const body = isDark ? 'text-zinc-400' : 'text-gray-600'
  const bookTitle = isDark ? 'text-zinc-300' : 'text-gray-800'
  const bookAuthor = isDark ? 'text-zinc-500' : 'text-gray-400'

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className={`${card} border rounded-lg p-3`}>
          <h4 className={`${heading} font-inter font-semibold text-xs mb-2`}>📖 Currently Learning</h4>
          <ul className="space-y-1">
            {currentStatus.learning.map((item, i) => (
              <li key={i} className={`flex items-start gap-1.5 ${body} font-inter text-xs`}>
                <span className="flex-shrink-0">{item.icon}</span><span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${card} border rounded-lg p-3`}>
          <h4 className={`${heading} font-inter font-semibold text-xs mb-2`}>💼 Currently Building</h4>
          <ul className="space-y-1">
            {currentStatus.working.map((item, i) => (
              <li key={i} className={`flex items-start gap-1.5 ${body} font-inter text-xs`}>
                <span className="flex-shrink-0">{item.icon}</span><span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${card} border rounded-lg p-3`}>
          <h4 className={`${heading} font-inter font-semibold text-xs mb-2`}>📚 Currently Reading</h4>
          <ul className="space-y-1.5">
            {currentStatus.reading.map((book, i) => (
              <li key={i} className="text-xs">
                <span className={`${bookTitle} font-inter`}>{book.title}</span>
                <span className={`${bookAuthor} font-inter italic`}> — {book.author}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${card} border rounded-lg p-3`}>
          <h4 className={`${heading} font-inter font-semibold text-xs mb-2`}>🎧 Listening To</h4>
          <div className="space-y-2">
            {currentStatus.spotify.slice(0, 2).map((embed, i) => (
              <iframe key={i} style={{ borderRadius: '8px' }} src={embed.url}
                width="100%" height="80" frameBorder="0" allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
