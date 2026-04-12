import { philosophy } from '../../data/resume'

export default function PhilosophyCard({ isDark = true }: { isDark?: boolean }) {
  const titleColor = isDark ? 'text-zinc-200' : 'text-gray-800'
  const descColor = isDark ? 'text-zinc-400' : 'text-gray-600'
  const annotColor = isDark ? 'text-violet-400/50' : 'text-violet-500/60'

  return (
    <div className="space-y-3">
      {philosophy.principles.map((p, i) => (
        <div key={i} className="flex items-start gap-3">
          <span className="text-lg flex-shrink-0 mt-0.5">{p.icon}</span>
          <div>
            <h4 className={`${titleColor} font-inter font-semibold text-base`}>{p.title}</h4>
            <p className={`${descColor} font-inter text-sm mt-0.5 leading-relaxed`}>{p.description}</p>
            {p.annotation && <span className={`${annotColor} font-mono text-sm mt-1 inline-block`}>{p.annotation}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
