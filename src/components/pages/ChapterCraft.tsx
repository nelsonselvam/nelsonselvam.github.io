import BookPage from '../BookPage'
import { skillGroups } from '../../data/resume'

interface ChapterCraftProps {
  isDark: boolean
}

export default function ChapterCraft({ isDark }: ChapterCraftProps) {
  const textClass = isDark ? 'text-gold-100' : 'text-stone-600'
  const tagBg = isDark ? 'bg-gold-800/20 border-gold-600/25 text-gold-200' : 'bg-stone-100 border-stone-200 text-stone-600'
  const annotationClass = isDark ? 'text-gold-400/50' : 'text-stone-300/70'

  return (
    <BookPage
      isDark={isDark}
      pageNumber={4}
      chapterNumber={2}
      chapterTitle="The Craft"
      chapterSubtitle="Tools of the trade"
    >
      {/* Intro text */}
      <p className={`font-playfair italic text-center text-sm md:text-base mb-8 max-w-lg mx-auto ${
        isDark ? 'text-gold-300/70' : 'text-stone-400'
      }`}>
        "Every craftsperson has their tools. These are the ones I reach for — not everything I know, but what I rely on."
      </p>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
        {skillGroups.map((group) => (
          <div key={group.category} className="relative">
            {/* Category header */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-lg">{group.icon}</span>
              <h3 className={`font-playfair text-base font-bold ${
                isDark ? 'text-gold-100' : 'text-stone-800'
              }`}>
                {group.category}
              </h3>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className={`inline-block px-3 py-1 rounded-md text-xs font-nunito font-medium border transition-all duration-200 hover:scale-105 ${tagBg}`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Handwritten annotation */}
            {group.annotation && (
              <p className={`font-caveat text-sm mt-2 ${annotationClass}`}>
                ← {group.annotation}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Reach out section */}
      <div className={`mt-10 pt-6 border-t ${isDark ? 'border-gold-700/15' : 'border-stone-200/60'}`}>
        <h3 className={`font-playfair text-lg font-bold mb-4 text-center ${
          isDark ? 'text-gold-100' : 'text-stone-800'
        }`}>
          Reach Me Out For
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { emoji: '🚀', label: 'Technical discussions' },
            { emoji: '🤝', label: 'Collaboration' },
            { emoji: '📚', label: 'Knowledge sharing' },
            { emoji: '☕', label: 'Coffee chats' },
            { emoji: '💡', label: 'New ideas' },
          ].map(({ emoji, label }) => (
            <span
              key={label}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-nunito border transition-all duration-200 hover:scale-105 ${
                isDark
                  ? 'border-gold-600/25 text-gold-200 bg-gold-800/15'
                  : 'border-stone-200 text-stone-600 bg-stone-50'
              }`}
            >
              <span>{emoji}</span> {label}
            </span>
          ))}
        </div>
      </div>
    </BookPage>
  )
}
