import { skillGroups } from '../../data/resume'

export default function SkillsGrid({ isDark = true }: { isDark?: boolean }) {
  const catColor = isDark ? 'text-zinc-300' : 'text-gray-700'
  const tagBg = isDark ? 'bg-zinc-800/60 border-zinc-700/40 text-zinc-300' : 'bg-gray-100 border-gray-200 text-gray-700'

  return (
    <div className="space-y-3">
      {skillGroups.map((group) => (
        <div key={group.category}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-sm">{group.icon}</span>
            <span className={`${catColor} font-inter font-medium text-xs`}>{group.category}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <span key={skill} className={`px-2.5 py-1 ${tagBg} border rounded-md text-xs font-mono`}>{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
