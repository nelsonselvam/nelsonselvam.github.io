import { useState } from 'react'
import { careerMilestones } from '../data/resume'

interface CareerProgressionProps {
  isDark: boolean
}

export default function CareerProgression({ isDark }: CareerProgressionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const textSecondaryClass = isDark ? 'text-slate-300' : 'text-slate-700'
  const textTertiaryClass = isDark ? 'text-slate-400' : 'text-slate-600'
  const cardBgClass = isDark ? 'bg-slate-700/50' : 'bg-slate-300/30'
  const borderClass = isDark ? 'border-slate-600' : 'border-slate-400'
  const sectionBgClass = isDark ? 'bg-slate-800/50' : 'bg-slate-200/50'

  // Parse date to get year and month for positioning
  const parseDate = (dateStr: string) => {
    if (dateStr === 'Present') {
      const now = new Date()
      return { month: now.getMonth() + 1, year: now.getFullYear() }
    }
    const match = dateStr.match(/(\w{3})\s(\d{4})/)
    if (match) {
      const month = match[1]
      const year = parseInt(match[2])
      const monthMap: Record<string, number> = {
        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
        'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
      }
      return { month: monthMap[month] || 1, year }
    }
    return { month: 1, year: 2013 }
  }

  // Calculate positions for horizontal timeline (left to right)
  // Timeline will be 85% width, starting at 7.5% from left for better breathing room
  const timelineStartPercent = 7.5 // Start at 7.5% from left
  const timelineWidthPercent = 85 // 85% width

  // Equal spacing for milestones (not based on dates)
  const getPosition = (idx: number) => {
    // Calculate equal spacing: first at start, last at end, others evenly distributed
    if (careerMilestones.length === 1) {
      return timelineStartPercent + (timelineWidthPercent / 2)
    }
    const spacing = timelineWidthPercent / (careerMilestones.length - 1)
    return timelineStartPercent + (idx * spacing)
  }

  const colors = [
    { dot: 'bg-slate-500', line: 'bg-slate-500', text: 'text-slate-600', bg: 'bg-slate-500/5' },
    { dot: 'bg-slate-600', line: 'bg-slate-600', text: 'text-slate-600', bg: 'bg-slate-600/5' },
    { dot: 'bg-blue-600', line: 'bg-blue-600', text: 'text-blue-600', bg: 'bg-blue-600/5' },
    { dot: 'bg-indigo-600', line: 'bg-indigo-600', text: 'text-indigo-600', bg: 'bg-indigo-600/5' },
    { dot: 'bg-slate-700', line: 'bg-slate-700', text: 'text-slate-700', bg: 'bg-slate-700/5' },
  ]

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4 text-center md:text-left">How it started?</h2>
      <p className={`text-center md:text-left mb-2 ${textTertiaryClass} text-sm md:text-base`}>
        Click on any milestone to learn more
      </p>

      {/* Horizontal Timeline Container */}
      <div className="relative w-full">
        {/* Main Horizontal Timeline Line - Centered */}
        <div
          className="absolute top-1/2 h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 transform -translate-y-1/2 opacity-20"
          style={{
            left: `${timelineStartPercent}%`,
            width: `${timelineWidthPercent}%`
          }}
        ></div>

        {/* Milestones */}
        <div className="relative w-full min-h-[500px] md:min-h-[550px]">
          {careerMilestones.map((milestone, idx) => {
            const position = getPosition(idx)
            const color = colors[idx % colors.length]
            const isEven = idx % 2 === 0
            const isPresent = milestone.date === 'Present'

            return (
              <div
                key={idx}
                className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${position}%`,
                  animationDelay: `${idx * 0.1}s`
                }}
              >
                {/* Milestone Dot - Centered on timeline - Clickable */}
                <div className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    className={`w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 ${color.dot} rounded-full flex items-center justify-center shadow-lg border-4 ${isDark ? 'border-slate-800' : 'border-white'} transition-all duration-300 hover:scale-110 cursor-pointer ${expandedIndex === idx ? 'ring-4 ring-offset-2 ' + (isDark ? 'ring-blue-300' : 'ring-blue-500') : ''}`}
                    aria-label={`${milestone.title} - Click to ${expandedIndex === idx ? 'collapse' : 'expand'} details`}
                  >
                    <span className="text-2xl md:text-3xl lg:text-4xl">
                      {milestone.icon}
                    </span>
                  </button>
                  {isPresent && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  )}

                  {/* Minimal Label - Always Visible */}
                  {expandedIndex !== idx && (
                    <div className={`absolute left-1/2 transform -translate-x-1/2 ${isEven ? 'bottom-full mb-3 md:mb-4' : 'top-full mt-3 md:mt-4'} z-10`}>
                      <div className={`${cardBgClass} rounded-md px-2 py-1 md:px-3 md:py-1.5 border ${borderClass} shadow-md transition-all duration-300 max-w-[120px] md:max-w-none`}>
                        <p className={`text-xs md:text-sm font-semibold ${color.text} truncate`}>
                          {milestone.title}
                        </p>
                        <p className={`text-xs ${textTertiaryClass}`}>
                          {milestone.date}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded Content Card - Top or Bottom - Only shown when clicked */}
                {expandedIndex === idx && (
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-64 md:w-72 lg:w-80 ${isEven ? 'bottom-full mb-4 md:mb-6' : 'top-full mt-4 md:mt-6'} z-30 animate-slide-up`}
                  >
                    <div className={`${cardBgClass} rounded-lg p-3 md:p-5 border ${borderClass} shadow-xl transition-all duration-300 ${color.bg}`}>
                      <div className="text-center">
                        <h3 className={`text-base md:text-lg font-bold ${color.text} mb-2`}>
                          {milestone.title}
                        </h3>
                        <p className={`text-sm md:text-base font-semibold ${textSecondaryClass} mb-2`}>
                          {milestone.description}
                        </p>
                        <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
                          <span className={`text-xs md:text-sm font-medium ${textTertiaryClass}`}>
                            {milestone.date}
                          </span>
                          <span className={`text-xs ${textTertiaryClass}`}>•</span>
                          <span className={`text-xs md:text-sm ${textTertiaryClass}`}>
                            {milestone.location}
                          </span>
                        </div>
                        {milestone.details && (
                          <p className={`text-xs md:text-sm ${textTertiaryClass} mt-2`}>
                            {milestone.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
