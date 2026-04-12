import { currentStatus } from '../../data/resume'

export default function CurrentMedia({ isDark = true }: { isDark?: boolean }) {
  const card = isDark ? 'bg-zinc-800/40 border-zinc-700/40' : 'bg-white border-[#eae5dc]'
  const heading = isDark ? 'text-zinc-300' : 'text-[#2d2b2a]'
  const bookTitle = isDark ? 'text-zinc-300' : 'text-[#4a4745]'
  const bookAuthor = isDark ? 'text-zinc-400' : 'text-[#7f7a75]'
  const quoteText = isDark ? 'text-zinc-300' : 'text-[#4a4745]'

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className={`${card} border rounded-lg p-3 opacity-0 animate-fade-in-up`} style={{ animationDelay: '0.1s' }}>
          <h4 className={`${heading} font-inter font-semibold text-sm mb-2`}>📚 Currently Reading</h4>
          <ul className="space-y-3.5 flex flex-col pt-1">
            {currentStatus.reading.map((book: any, i: number) => (
              <li key={i} className="text-sm border-l-2 pl-3 border-violet-500/40">
                <span className={`${bookTitle} font-inter font-medium block`}>{book.title}</span>
                <span className={`${bookAuthor} font-inter text-[11px] block mt-0.5 mb-1.5 uppercase tracking-wide`}>{book.author}</span>
                {book.quote && (
                  <span className={`${quoteText} font-inter italic text-xs leading-relaxed block`}>"{book.quote}"</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${card} border rounded-lg p-3 opacity-0 animate-fade-in-up`} style={{ animationDelay: '0.3s' }}>
          <h4 className={`${heading} font-inter font-semibold text-sm mb-2`}>🎧 Listening To</h4>
          <div className="space-y-2">
            {currentStatus.spotify.map((embed, i) => (
              <iframe key={i} style={{ borderRadius: '8px' }} src={embed.url}
                width="100%" height={i === 2 ? "252" : "80"} frameBorder="0" allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
