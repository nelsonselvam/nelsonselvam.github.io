import { philosophy } from '../../data/resume'

export default function UserManualCard({ isDark = true }: { isDark?: boolean }) {
  const titleColor = isDark ? 'text-zinc-200' : 'text-gray-800'
  const body = isDark ? 'text-zinc-400' : 'text-gray-600'
  const card = isDark ? 'bg-zinc-800/30 border-zinc-700/30' : 'bg-gray-50 border-gray-200'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className={`${card} border rounded-lg p-4`}>
        <p className="text-emerald-400/80 font-inter text-xs font-semibold mb-2.5">✅ Do's</p>
        <ul className="space-y-2">
          {philosophy.userManual.dos.map((item, i) => (
            <li key={i} className={`flex items-start gap-2 ${body} font-inter text-xs`}>
              <span className="flex-shrink-0 text-sm">{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${card} border rounded-lg p-4`}>
        <p className="text-amber-400/80 font-inter text-xs font-semibold mb-2.5">⚡ Notes</p>
        <ul className="space-y-2">
          {philosophy.userManual.notes.map((item, i) => (
            <li key={i} className={`flex items-start gap-2 ${body} font-inter text-xs`}>
              <span className="flex-shrink-0 text-sm">{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-2">
        <p className={`${isDark ? 'text-zinc-600' : 'text-gray-400'} font-mono text-xs text-center mt-1`}>
          — end of README.md —
        </p>
      </div>
    </div>
  )
}
