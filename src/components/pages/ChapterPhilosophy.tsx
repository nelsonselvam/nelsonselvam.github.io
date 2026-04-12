import BookPage from '../BookPage'
import { philosophy } from '../../data/resume'

interface ChapterPhilosophyProps {
  isDark: boolean
}

export default function ChapterPhilosophy({ isDark }: ChapterPhilosophyProps) {
  const textClass = isDark ? 'text-gold-100' : 'text-stone-600'
  const headingClass = isDark ? 'text-gold-100' : 'text-stone-800'
  const annotationClass = isDark ? 'text-gold-400/50' : 'text-stone-300/70'

  return (
    <BookPage
      isDark={isDark}
      pageNumber={6}
      chapterNumber={4}
      chapterTitle="The Philosophy"
      chapterSubtitle="How I think about engineering"
    >
      {/* Engineering Principles */}
      <div className="space-y-6 mb-10">
        {philosophy.principles.map((principle, idx) => (
          <div key={idx} className="relative group">
            <div className="flex items-start gap-4">
              <span className="text-2xl flex-shrink-0 mt-0.5">{principle.icon}</span>
              <div className="flex-1">
                <h3 className={`font-playfair text-lg font-bold ${headingClass}`}>
                  {principle.title}
                </h3>
                <p className={`font-nunito text-sm mt-1 leading-relaxed ${textClass}`}>
                  {principle.description}
                </p>
              </div>
            </div>

            {/* Handwritten annotation */}
            {principle.annotation && (
              <p className={`font-caveat text-sm mt-1 ml-12 ${annotationClass}`}>
                {principle.annotation}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className={`chapter-divider ${isDark ? 'chapter-divider-dark' : 'chapter-divider-light'} my-8`}>
        <span className={`text-sm ${isDark ? 'text-gold-400/60' : 'text-stone-300'}`}>✦</span>
      </div>

      {/* User Manual */}
      <div>
        <h3 className={`font-playfair text-xl font-bold text-center mb-6 ${headingClass}`}>
          Working With Me — A User Manual
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Do's */}
          <div>
            <h4 className={`font-playfair text-base font-bold mb-3 ${
              isDark ? 'text-emerald-400/80' : 'text-emerald-700'
            }`}>
              ✅ Do's
            </h4>
            <ul className="space-y-3">
              {philosophy.userManual.dos.map((item, idx) => (
                <li key={idx} className={`flex items-start gap-3 font-nunito text-sm ${textClass}`}>
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          <div>
            <h4 className={`font-playfair text-base font-bold mb-3 ${
              isDark ? 'text-amber-400/80' : 'text-amber-700'
            }`}>
              ⚡ Notes
            </h4>
            <ul className="space-y-3">
              {philosophy.userManual.notes.map((item, idx) => (
                <li key={idx} className={`flex items-start gap-3 font-nunito text-sm ${textClass}`}>
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </BookPage>
  )
}
