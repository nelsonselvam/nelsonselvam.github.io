import BookPage from '../BookPage'
import { careerMilestones } from '../../data/resume'

interface ChapterOriginProps {
  isDark: boolean
}

export default function ChapterOrigin({ isDark }: ChapterOriginProps) {
  const textClass = isDark ? 'text-gold-100' : 'text-stone-700'
  const subtextClass = isDark ? 'text-gold-300/70' : 'text-stone-500'
  const lineColor = isDark ? 'bg-gold-600/20' : 'bg-stone-300/60'

  const colorMap: Record<string, { dot: string; glow: string }> = {
    indigo: {
      dot: isDark ? 'bg-indigo-400' : 'bg-indigo-500',
      glow: isDark ? 'shadow-[0_0_12px_rgba(99,102,241,0.4)]' : '',
    },
    cyan: {
      dot: isDark ? 'bg-cyan-400' : 'bg-cyan-500',
      glow: isDark ? 'shadow-[0_0_12px_rgba(6,182,212,0.4)]' : '',
    },
    purple: {
      dot: isDark ? 'bg-purple-400' : 'bg-purple-500',
      glow: isDark ? 'shadow-[0_0_12px_rgba(168,85,247,0.4)]' : '',
    },
    blue: {
      dot: isDark ? 'bg-blue-400' : 'bg-blue-500',
      glow: isDark ? 'shadow-[0_0_12px_rgba(59,130,246,0.4)]' : '',
    },
    red: {
      dot: isDark ? 'bg-red-400' : 'bg-red-500',
      glow: isDark ? 'shadow-[0_0_12px_rgba(239,68,68,0.4)]' : '',
    },
  }

  return (
    <BookPage
      isDark={isDark}
      pageNumber={3}
      chapterNumber={1}
      chapterTitle="The Origin"
      chapterSubtitle="From circuits to code"
    >
      {/* Vertical Timeline */}
      <div className="relative pl-12 md:pl-16 pb-8">
        {/* Timeline line */}
        <div className={`absolute left-5 md:left-7 top-0 bottom-0 w-0.5 ${lineColor}`} />

        {careerMilestones.map((milestone, idx) => {
          const color = colorMap[milestone.color] || colorMap.indigo
          const isLast = idx === careerMilestones.length - 1

          return (
            <div key={idx} className="relative mb-10 last:mb-0">
              {/* Timeline dot */}
              <div className={`absolute -left-7 md:-left-9 top-1 w-5 h-5 rounded-full ${color.dot} ${color.glow} border-4 ${
                isDark ? 'border-paper-dark' : 'border-paper-light'
              } z-10 flex items-center justify-center`}>
                {isLast && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </div>

              {/* Content */}
              <div className="group">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className={`font-nunito text-xs font-bold tracking-wider uppercase ${subtextClass}`}>
                    {milestone.date}
                  </span>
                  <span className={`font-nunito text-xs ${subtextClass}`}>
                    · {milestone.location}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-1.5">
                  {milestone.logo ? (
                    <div className={`w-8 h-8 rounded-md overflow-hidden flex-shrink-0 ${
                      isDark ? 'bg-white/10' : 'bg-stone-100'
                    } flex items-center justify-center p-0.5`}>
                      <img
                        src={milestone.logo}
                        alt={milestone.title}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          if (target.parentElement) {
                            target.parentElement.innerHTML = `<span class="text-lg">${milestone.icon}</span>`
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <span className="text-xl flex-shrink-0">{milestone.icon}</span>
                  )}
                  <h3 className={`font-playfair text-lg md:text-xl font-bold ${
                    isDark ? 'text-gold-100' : 'text-stone-800'
                  }`}>
                    {milestone.title}
                  </h3>
                </div>

                <p className={`font-nunito text-sm font-medium mt-1 ${textClass}`}>
                  {milestone.description}
                </p>
                <p className={`font-nunito text-sm mt-1 ${subtextClass}`}>
                  {milestone.details}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Margin annotation */}
      <div className={`hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 font-caveat text-sm ${
        isDark ? 'text-gold-500/40' : 'text-stone-300/60'
      }`} style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
        10+ years and counting...
      </div>
    </BookPage>
  )
}
