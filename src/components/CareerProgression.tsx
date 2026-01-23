import { useState } from 'react'
import { careerMilestones } from '../data/resume'

interface CareerProgressionProps {
  isDark: boolean
}

export default function CareerProgression({ isDark }: CareerProgressionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const textSecondaryClass = isDark ? 'text-slate-300' : 'text-slate-700'
  const textTertiaryClass = isDark ? 'text-slate-400' : 'text-slate-600'
  const borderClass = isDark ? 'border-slate-600' : 'border-slate-400'

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
  const timelineStartPercent = 7.5
  const timelineWidthPercent = 85

  // Equal spacing for milestones
  const getPosition = (idx: number) => {
    if (careerMilestones.length === 1) {
      return timelineStartPercent + (timelineWidthPercent / 2)
    }
    const spacing = timelineWidthPercent / (careerMilestones.length - 1)
    return timelineStartPercent + (idx * spacing)
  }

  // Color configurations matching modern tech theme
  const colorConfig: Record<string, any> = {
    indigo: {
      gradient: isDark ? 'from-indigo-500 to-indigo-600' : 'from-indigo-400 to-indigo-500',
      text: isDark ? 'text-indigo-300' : 'text-indigo-700',
      glow: 'shadow-[0_0_20px_rgba(99,102,241,0.5)]',
      ring: isDark ? 'ring-indigo-400' : 'ring-indigo-500',
      bg: isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'
    },
    cyan: {
      gradient: isDark ? 'from-cyan-500 to-cyan-600' : 'from-cyan-400 to-cyan-500',
      text: isDark ? 'text-cyan-300' : 'text-cyan-700',
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.5)]',
      ring: isDark ? 'ring-cyan-400' : 'ring-cyan-500',
      bg: isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
    },
    purple: {
      gradient: isDark ? 'from-purple-500 to-purple-600' : 'from-purple-400 to-purple-500',
      text: isDark ? 'text-purple-300' : 'text-purple-700',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
      ring: isDark ? 'ring-purple-400' : 'ring-purple-500',
      bg: isDark ? 'bg-purple-500/10' : 'bg-purple-500/5'
    },
    blue: {
      gradient: isDark ? 'from-blue-500 to-blue-600' : 'from-blue-400 to-blue-500',
      text: isDark ? 'text-blue-300' : 'text-blue-700',
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
      ring: isDark ? 'ring-blue-400' : 'ring-blue-500',
      bg: isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'
    },
    red: {
      gradient: isDark ? 'from-red-500 to-red-600' : 'from-red-400 to-red-500',
      text: isDark ? 'text-red-300' : 'text-red-700',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]',
      ring: isDark ? 'ring-red-400' : 'ring-red-500',
      bg: isDark ? 'bg-red-500/10' : 'bg-red-500/5'
    }
  }

  return (
    <div>
      <h2 className={`text-4xl font-bold mb-4 text-center md:text-left ${isDark ? 'bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent' : 'text-slate-900'}`}>
        My Journey
      </h2>
      <p className={`text-center md:text-left mb-0 ${textTertiaryClass} text-sm md:text-base`}>
        Click any milestone to explore details
      </p>

      {/* Horizontal Timeline Container */}
      <div className="relative w-full">
        {/* Main Horizontal Timeline Line - Enhanced gradient */}
        <div
          className={`absolute top-1/2 h-1.5 transform -translate-y-1/2 ${isDark ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 opacity-30' : 'bg-gradient-to-r from-indigo-400 via-purple-400 to-red-400 opacity-20'}`}
          style={{
            left: `${timelineStartPercent}%`,
            width: `${timelineWidthPercent}%`
          }}
        ></div>

        {/* Milestones */}
        <div className="relative w-full min-h-[500px] md:min-h-[550px]">
          {careerMilestones.map((milestone, idx) => {
            const position = getPosition(idx)
            const color = colorConfig[(milestone as any).color || 'indigo']
            const isEven = idx % 2 === 0
            const isPresent = milestone.date === 'Present'
            const hasLogo = (milestone as any).logo

            return (
              <div
                key={idx}
                className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${position}%`,
                  animationDelay: `${idx * 0.1}s`
                }}
              >
                {/* Milestone Dot - Enhanced with gradient and glow */}
                <div className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    className={`relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br ${color.gradient} rounded-full flex items-center justify-center border-4 ${isDark ? 'border-slate-800' : 'border-white'} transition-all duration-300 hover:scale-110 cursor-pointer ${color.glow} ${expandedIndex === idx ? `ring-4 ring-offset-2 ${color.ring}` : ''}`}
                    aria-label={`${milestone.title} - Click to ${expandedIndex === idx ? 'collapse' : 'expand'} details`}
                  >
                    {hasLogo ? (
                      <div className="relative w-18 h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white p-1.5 md:p-2 flex items-center justify-center overflow-hidden">
                        <img
                          src={(milestone as any).logo}
                          alt={milestone.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            // Fallback to emoji if logo fails to load
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              parent.innerHTML = `<span class="text-3xl md:text-4xl lg:text-5xl">${milestone.icon}</span>`
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <span className="text-4xl md:text-5xl lg:text-6xl">
                        {milestone.icon}
                      </span>
                    )}
                  </button>
                  {isPresent && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                  )}

                  {/* Minimal Label - Always Visible */}
                  {expandedIndex !== idx && (
                    <div className={`absolute left-1/2 transform -translate-x-1/2 ${isEven ? 'bottom-full mb-4 md:mb-5' : 'top-full mt-4 md:mt-5'} z-10`}>
                      <div className={`${isDark ? 'glass-dark' : 'glass'} rounded-lg px-3 py-2 md:px-4 md:py-2.5 border ${borderClass} shadow-lg transition-all duration-300 max-w-[140px] md:max-w-none backdrop-blur-md`}>
                        <p className={`text-xs md:text-sm font-bold ${color.text} truncate`}>
                          {milestone.title}
                        </p>
                        <p className={`text-xs ${textTertiaryClass}`}>
                          {milestone.date}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded Content Card - Glassmorphic design */}
                {expandedIndex === idx && (
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-72 md:w-80 lg:w-96 ${isEven ? 'bottom-full mb-5 md:mb-7' : 'top-full mt-5 md:mt-7'} z-30 animate-slide-up`}
                  >
                    <div className={`${isDark ? 'glass-dark' : 'glass'} rounded-xl p-4 md:p-6 border ${borderClass} shadow-2xl transition-all duration-300 ${color.bg} backdrop-blur-lg`}>
                      <div className="text-center">
                        <h3 className={`text-lg md:text-xl font-bold ${color.text} mb-2`}>
                          {milestone.title}
                        </h3>
                        <p className={`text-sm md:text-base font-semibold ${textSecondaryClass} mb-3`}>
                          {milestone.description}
                        </p>
                        <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
                          <span className={`text-xs md:text-sm font-medium ${textTertiaryClass}`}>
                            {milestone.date}
                          </span>
                          <span className={`text-xs ${textTertiaryClass}`}>•</span>
                          <span className={`text-xs md:text-sm ${textTertiaryClass}`}>
                            {milestone.location}
                          </span>
                        </div>
                        {milestone.details && (
                          <p className={`text-xs md:text-sm ${textTertiaryClass} mt-3 leading-relaxed`}>
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
