import { useState, useEffect } from 'react'
import { careerMilestones } from '../../data/resume'

export default function CareerTimeline({ isDark = true }: { isDark?: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (visibleCount >= careerMilestones.length) return
    const timer = window.setTimeout(() => setVisibleCount(prev => prev + 1), 600)
    return () => window.clearTimeout(timer)
  }, [visibleCount])

  const titleColor = isDark ? 'text-zinc-100' : 'text-gray-900'
  const dateColor = isDark ? 'text-zinc-500' : 'text-gray-400'
  const locColor = isDark ? 'text-zinc-600' : 'text-gray-400'
  const descColor = isDark ? 'text-zinc-400' : 'text-gray-600'
  const detailColor = isDark ? 'text-zinc-500' : 'text-gray-400'
  const lineColor = isDark ? 'bg-zinc-700/50' : 'bg-gray-200'
  const dotNormal = isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-300'

  return (
    <div className="space-y-0">
      {careerMilestones.map((m, i) => {
        if (i >= visibleCount) return null
        const isLatest = i === careerMilestones.length - 1
        return (
          <div key={i} className="flex items-start gap-3 relative animate-fade-in-up"
            style={{ animationDelay: `${i * 50}ms` }}>
            {/* Connector line */}
            {i < visibleCount - 1 && !isLatest && (
              <div className={`absolute left-[13px] top-7 bottom-0 w-px ${lineColor} transition-all duration-500`} />
            )}
            {i < careerMilestones.length - 1 && i === visibleCount - 1 && (
              <div className={`absolute left-[13px] top-7 bottom-0 w-px ${lineColor} opacity-30`} />
            )}
            {/* Dot */}
            <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-base mt-0.5 z-10 transition-all duration-300 ${
              isLatest
                ? 'bg-green-500/20 border-2 border-green-400/50'
                : `${dotNormal} border`
            }`}>{m.icon}</div>
            {/* Content */}
            <div className="pb-5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {'logo' in m && m.logo && (
                  <img src={m.logo} alt={`${m.title} logo`} className="h-5 w-auto object-contain rounded-xs bg-white/90 px-0.5" />
                )}
                <span className={`${titleColor} font-inter font-semibold text-base`}>{m.title}</span>
                <span className={`${dateColor} font-mono text-sm`}>{m.date}</span>
                <span className={`${locColor} text-sm`}>· {m.location}</span>
              </div>
              <p className={`${descColor} font-inter text-sm mt-0.5`}>{m.description}</p>
              {m.details && <p className={`${detailColor} font-inter text-sm mt-0.5`}>{m.details}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
