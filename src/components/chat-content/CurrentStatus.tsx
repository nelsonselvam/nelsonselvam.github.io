import { currentStatus } from '../../data/resume'

export default function CurrentStatus({ isDark = true }: { isDark?: boolean }) {
  const card = isDark ? 'bg-zinc-800/40 border-zinc-700/40' : 'bg-white border-[#eae5dc]'
  const heading = isDark ? 'text-zinc-300' : 'text-[#2d2b2a]'
  const body = isDark ? 'text-zinc-400' : 'text-[#4a4745]'

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className={`${card} border rounded-lg p-3 opacity-0 animate-fade-in-up`} style={{ animationDelay: '0.1s' }}>
          <h4 className={`${heading} font-inter font-semibold text-sm mb-2`}>💼 Currently Building</h4>
          <ul className="space-y-1">
            {currentStatus.working.map((item, i) => (
              <li key={i} className={`flex items-start gap-1.5 ${body} font-inter text-sm`}>
                <span className="flex-shrink-0">{item.icon}</span><span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${card} border rounded-lg p-3 opacity-0 animate-fade-in-up`} style={{ animationDelay: '0.3s' }}>
          <h4 className={`${heading} font-inter font-semibold text-sm mb-2`}>📖 Currently Learning</h4>
          <ul className="space-y-1">
            {currentStatus.learning.map((item, i) => (
              <li key={i} className={`flex items-start gap-1.5 ${body} font-inter text-sm`}>
                <span className="flex-shrink-0">{item.icon}</span><span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
