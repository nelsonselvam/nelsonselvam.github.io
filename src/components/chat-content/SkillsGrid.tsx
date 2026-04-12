import { skillGroups } from '../../data/resume'

export default function SkillsGrid({ isDark = true }: { isDark?: boolean }) {
  const cardBg = isDark ? 'bg-zinc-800/40 border-zinc-700/40' : 'bg-gray-50 border-gray-200'
  const catColor = isDark ? 'text-zinc-300' : 'text-gray-800'
  const tagBg = isDark ? 'bg-zinc-900/50 border-zinc-700/50 text-zinc-300' : 'bg-white border-gray-300 text-slate-700'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {skillGroups.map((group, idx) => (
        <div key={group.category} className={`${cardBg} border rounded-lg p-3 opacity-0 animate-fade-in-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-xl flex-shrink-0">{group.icon}</span>
            <span className={`${catColor} font-inter font-semibold text-sm`}>{group.category}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <span key={skill} className={`px-2 py-0.5 ${tagBg} border rounded text-xs font-mono shadow-sm`}>{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
