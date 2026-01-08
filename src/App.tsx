import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import TypingBanner from './components/TypingBanner'
import CareerProgression from './components/CareerProgression'

interface FloatingEmoji {
  emoji: string
  id: number
  top: number
  left: number
  delay: number
}

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [floatingElements, setFloatingElements] = useState<FloatingEmoji[]>([])
  const [activeAboutTab, setActiveAboutTab] = useState(0)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})
  const [profileFlipped, setProfileFlipped] = useState(false)
  const [funFactFlipped, setFunFactFlipped] = useState<Record<string, boolean>>({})

  // Auto-flip profile picture at intervals
  useEffect(() => {
    const flipInterval = setInterval(() => {
      setProfileFlipped(prev => !prev)
    }, 4000) // Flip every 4 seconds

    return () => clearInterval(flipInterval)
  }, [])

  // Section IDs in order
  const sectionIds = ['hero', 'about', 'career', 'skills', 'user-manual', 'excited', 'how-i-work', 'built-with', 'cta']

  // Scroll to next section
  const scrollToNextSection = () => {
    const currentScroll = window.scrollY + window.innerHeight / 2
    const sections = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (element) {
        const rect = element.getBoundingClientRect()
        return {
          id,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY
        }
      }
      return null
    }).filter(Boolean) as Array<{ id: string, top: number, bottom: number }>

    // Find the next section that hasn't been scrolled past
    const nextSection = sections.find(section => section.top > currentScroll)

    if (nextSection) {
      const element = document.getElementById(nextSection.id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // If at the end, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const emojisPool = ['💻', '🎵', '📚', '☕', '⚙️', '🔧', '🚀', '🧠', '📝', '🎯', '💡', '🔬']

  // Randomize emojis with unique positions on mount
  useEffect(() => {
    const elements: FloatingEmoji[] = []
    const selectedEmojis = emojisPool.sort(() => Math.random() - 0.5).slice(0, 8)

    selectedEmojis.forEach((emoji, idx) => {
      elements.push({
        emoji,
        id: idx,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 15
      })
    })

    setFloatingElements(elements)
  }, [])

  const bgClass = isDark
    ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white'
    : 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 text-slate-900'

  const sectionBgClass = isDark ? 'bg-slate-800/50' : 'bg-slate-200/50'
  const cardBgClass = isDark ? 'bg-slate-700/50' : 'bg-slate-300/30'
  const borderClass = isDark ? 'border-slate-600' : 'border-slate-400'
  const textSecondaryClass = isDark ? 'text-slate-300' : 'text-slate-700'
  const textTertiaryClass = isDark ? 'text-slate-400' : 'text-slate-600'

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className={`font-nunito min-h-screen ${bgClass} relative overflow-hidden`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');
        
        .font-nunito {
          font-family: 'Nunito', sans-serif;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-50px);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          15% {
            transform: rotate(14deg);
          }
          30% {
            transform: rotate(-8deg);
          }
          45% {
            transform: rotate(14deg);
          }
          60% {
            transform: rotate(-4deg);
          }
          75% {
            transform: rotate(10deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }

        .animate-wave {
          display: inline-block;
          transform-origin: 70% 70%;
          animation: wave 1s ease-in-out infinite;
        }

        .flashcard {
          perspective: 1000px;
          cursor: pointer;
        }

        .flashcard-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flashcard.flipped .flashcard-inner {
          transform: rotateY(180deg);
        }

        .flashcard-front, .flashcard-back {
          backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .flashcard-back {
          transform: rotateY(180deg);
        }

        .profile-card {
          perspective: 1000px;
          cursor: pointer;
        }

        .profile-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .profile-card.flipped .profile-card-inner {
          transform: rotateY(180deg);
        }

        .profile-front, .profile-back {
          backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .profile-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute text-6xl animate-float"
            style={{
              top: `${element.top}%`,
              left: `${element.left}%`,
              animationDelay: `${element.delay}s`
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>


      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-3 rounded-full transition-all ${isDark
            ? 'bg-slate-700 hover:bg-slate-600 text-yellow-300'
            : 'bg-slate-300 hover:bg-slate-400 text-slate-900'
            }`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      <TypingBanner />
      <main className="overflow-hidden relative z-10">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 -mt-20">
          <div className="text-center space-y-6 max-w-3xl animate-fade-in-scale">
            {/* Profile Image */}
            <div className="flex justify-center mb-8 animate-slide-up">
              <div
                className={`profile-card w-32 h-32 md:w-40 md:h-40 ${profileFlipped ? 'flipped' : ''}`}
              >
                <div className="profile-card-inner">
                  <div className="profile-front relative">
                    <img
                      src="./images/profile.jpg"
                      alt="Nelson Selvam"
                      className="w-full h-full rounded-full object-cover border-4 border-slate-400 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-slate-400 opacity-0 hover:opacity-5 transition-opacity duration-300"></div>
                  </div>
                  <div className="profile-back relative flex items-center justify-center">
                    <div className="w-full h-full rounded-full border-4 border-slate-400 shadow-lg flex items-center justify-center text-4xl md:text-5xl bg-gradient-to-br from-slate-500 to-slate-600">
                      👨‍💻
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 bg-clip-text text-transparent animate-slide-up">
              Hey there! <span className="inline-block animate-wave">👋</span>
            </h1>
            <p className={`text-xl md:text-2xl ${textSecondaryClass} animate-slide-up`} style={{ animationDelay: '0.2s' }}>
              I've been vibe coding lately and thought I'd pass the vibe along. This introduction is fully vibe coded.
            </p>
          </div>
        </section>

        {/* About Me & Career Progression */}
        <section id="about" className={`py-20 px-4 ${sectionBgClass}`}>
          <div className="max-w-6xl mx-auto animate-slide-up space-y-16">
            {/* About Me Section */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>

              {/* Three Items in a Row (3x1 Grid) */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-lg border transition-all duration-300 ${isDark
                  ? 'bg-slate-700/30 border-slate-600/50'
                  : 'bg-slate-200/30 border-slate-400/50'
                  }`}>
                  <div className="flex flex-col items-center text-center gap-4">
                    <span className="text-4xl">🔍</span>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Curious & Thoughtful Developer</h3>
                      <p className={`${textSecondaryClass} leading-relaxed text-sm`}>
                        I'm passionate about understanding how systems work and why decisions are made. I focus on building solutions that are scalable, maintainable, and sustainable, not just quick fixes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-lg border transition-all duration-300 ${isDark
                  ? 'bg-slate-700/30 border-slate-600/50'
                  : 'bg-slate-200/30 border-slate-400/50'
                  }`}>
                  <div className="flex flex-col items-center text-center gap-4">
                    <span className="text-4xl">🤝</span>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Collaborative & Growth-Oriented</h3>
                      <p className={`${textSecondaryClass} leading-relaxed text-sm`}>
                        I thrive in environments where I can learn from others and contribute meaningfully, sharing knowledge and mentoring where I can. Growing together is more rewarding than growing alone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-lg border transition-all duration-300 ${isDark
                  ? 'bg-slate-700/30 border-slate-600/50'
                  : 'bg-slate-200/30 border-slate-400/50'
                  }`}>
                  <div className="flex flex-col items-center text-center gap-4">
                    <span className="text-4xl">∞</span>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Continuous Learner</h3>
                      <p className={`${textSecondaryClass} leading-relaxed text-sm`}>
                        I'm always exploring new technologies, frameworks, and approaches—whether it's AI/ML, cloud-native patterns, or modern microservices design. I see learning as a continuous journey that shapes better solutions and better engineers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Career Progression */}
            <div>
              <CareerProgression isDark={isDark} />
            </div>
          </div>
        </section>





        {/* Things I Can Help With & Reach Me Out For - Side by Side */}
        <section id="skills" className={`py-20 px-4 ${sectionBgClass} animate-slide-up`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Things I Can Help With */}
              <div>
                <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
                  Things I Can Help With
                </h2>
                <p className={`${textSecondaryClass} text-center md:text-left mb-8 text-sm`}>
                  Not an exhaustive list — just areas where I'm usually happy to jump in, pair, or help unblock things.
                </p>

                {[
                  {
                    category: 'Backend',
                    skills: [
                      { label: 'Java', icon: '☕', color: 'text-amber-500' },
                      { label: 'Spring Boot', icon: '🌱', color: 'text-green-500' },
                      { label: 'REST APIs', icon: '🔗', color: 'text-sky-500' },
                      { label: 'Microservices', icon: '🧱', color: 'text-indigo-500' },
                      { label: 'System Design', icon: '🧠', color: 'text-purple-500' },
                      { label: 'API Integrations', icon: '🔌', color: 'text-cyan-500' },
                    ]
                  },
                  {
                    category: 'Data & Databases',
                    skills: [
                      { label: 'Databases (SQL)', icon: '🗄️', color: 'text-emerald-500' },
                      { label: 'NoSQL', icon: '📦', color: 'text-teal-500' },
                      { label: 'Data Modeling', icon: '📐', color: 'text-teal-500' },
                      { label: 'Efficient Queries', icon: '⚡', color: 'text-yellow-500' },
                    ]
                  },
                  {
                    category: 'Cloud & Frontend',
                    skills: [
                      { label: 'Cloud (AWS)', icon: '☁️', color: 'text-blue-500' },
                      { label: 'React (basic)', icon: '⚛️', color: 'text-sky-400' },
                      { label: 'Debugging & Reviews', icon: '🛠️', color: 'text-rose-500' }
                    ]
                  }
                ].map(group => (
                  <div key={group.category} className="mb-6">
                    <h3 className={`font-semibold mb-2 text-center md:text-left ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {group.skills.map(({ label, icon, color }) => (
                        <span
                          key={label}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all
                    ${isDark
                              ? 'border-slate-600 text-slate-300 hover:border-slate-500'
                              : 'border-slate-400 text-slate-700 hover:border-slate-500'
                            }`}
                        >
                          <span className={`${color}`} role="img" aria-label={label}>{icon}</span>
                          <span>{label}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reach Me Out For */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Reach Me Out For</h2>
                <div className="flex flex-wrap gap-3">
                  <span className={`px-6 py-3 ${isDark ? 'bg-blue-500/20 border-blue-400/30' : 'bg-blue-300/30 border-blue-600/30'} border rounded-full`}>🚀 Technical discussions</span>
                  <span className={`px-6 py-3 ${isDark ? 'bg-purple-500/20 border-purple-400/30' : 'bg-purple-300/30 border-purple-600/30'} border rounded-full`}>🤝 Collaboration</span>
                  <span className={`px-6 py-3 ${isDark ? 'bg-pink-500/20 border-pink-400/30' : 'bg-pink-300/30 border-pink-600/30'} border rounded-full`}>📚 Knowledge sharing</span>
                  <span className={`px-6 py-3 ${isDark ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-emerald-300/30 border-emerald-600/30'} border rounded-full`}>☕ Coffee chats</span>
                  <span className={`px-6 py-3 ${isDark ? 'bg-amber-500/20 border-amber-400/30' : 'bg-amber-300/30 border-amber-600/30'} border rounded-full`}>💡 New ideas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Manual & Fun Facts - Side by Side */}
        <section id="user-manual" className={`py-20 px-4 ${sectionBgClass} animate-slide-up`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* User Manual */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-center md:text-left">User Manual — Working With Me</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'} mb-4`}>✅ Do's</h3>
                    <ul className={`space-y-3 ${textSecondaryClass}`}>
                      <li className="flex gap-3">
                        <span className={isDark ? 'text-green-400' : 'text-green-600'}>🗣</span>
                        <span>Ask questions anytime — I'm happy to clarify or brainstorm.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className={isDark ? 'text-green-400' : 'text-green-600'}>✉️</span>
                        <span>Give direct feedback — constructive feedback is always appreciated.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className={isDark ? 'text-green-400' : 'text-green-600'}>💡</span>
                        <span>Jump in with ideas — collaboration and shared input are welcome.</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'} mb-4`}>⚡ Notes</h3>
                    <ul className={`space-y-3 ${textSecondaryClass}`}>
                      <li className="flex gap-3">
                        <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>👂</span>
                        <span>I like to listen first and then contribute once I have clarity.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>⏳</span>
                        <span>Async updates work great for me, but I'm always happy to sync when something's urgent.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fun Facts */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Fun Facts</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      id: 'fact-1',
                      icon: '👤',
                      text: "I was named after <span className='font-semibold text-blue-400'>Nelson Mandela</span>—still working on the legacy part.",
                      color: 'blue'
                    },
                    {
                      id: 'fact-2',
                      icon: '📚',
                      text: "I'm an avid reader and believe good books sharpen both <span className='font-semibold text-purple-400'>empathy</span> and <span className='font-semibold text-purple-400'>engineering judgment</span>.",
                      color: 'purple'
                    },
                    {
                      id: 'fact-3',
                      icon: '🎵',
                      text: "I listen to a lot of music—background scores and playlists are my preferred <span className='font-semibold text-pink-400'>debugging companions</span>.",
                      color: 'pink'
                    },
                    {
                      id: 'fact-4',
                      icon: '☕',
                      text: "Good coffee & slow conversations—I enjoy unstructured chats over coffee, usually where the best <span className='font-semibold text-amber-400'>ideas and stories</span> surface.",
                      color: 'amber'
                    }
                  ].map((fact) => {
                    const colorClasses = {
                      blue: { front: isDark ? 'border-blue-400/20' : 'border-blue-600/20', text: isDark ? 'text-blue-300' : 'text-blue-600', bg: 'bg-blue-400/10' },
                      purple: { front: isDark ? 'border-purple-400/20' : 'border-purple-600/20', text: isDark ? 'text-purple-300' : 'text-purple-600', bg: 'bg-purple-400/10' },
                      pink: { front: isDark ? 'border-pink-400/20' : 'border-pink-600/20', text: isDark ? 'text-pink-300' : 'text-pink-600', bg: 'bg-pink-400/10' },
                      amber: { front: isDark ? 'border-amber-400/20' : 'border-amber-600/20', text: isDark ? 'text-amber-300' : 'text-amber-600', bg: 'bg-amber-400/10' }
                    }
                    const colors = colorClasses[fact.color as keyof typeof colorClasses]

                    return (
                      <div
                        key={fact.id}
                        className={`flashcard h-32 ${funFactFlipped[fact.id] ? 'flipped' : ''}`}
                        onClick={() => setFunFactFlipped(prev => ({ ...prev, [fact.id]: !prev[fact.id] }))}
                      >
                        <div className="flashcard-inner">
                          <div className={`flashcard-front ${cardBgClass} rounded-lg border ${colors.front} shadow-lg flex items-center justify-center cursor-pointer`}>
                            <div className="text-5xl">{fact.icon}</div>
                          </div>
                          <div className={`flashcard-back ${cardBgClass} rounded-lg border ${colors.front} shadow-lg p-4 flex items-center justify-center cursor-pointer ${colors.bg}`}>
                            <p
                              className={`${textSecondaryClass} text-center text-sm md:text-base`}
                              dangerouslySetInnerHTML={{ __html: fact.text }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Excited About & How I Work - Side by Side */}
        <section id="excited" className={`py-20 px-4 ${sectionBgClass}`}>
          <div className="max-w-6xl mx-auto animate-slide-up">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Excited About */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Excited About</h2>
                <div className="space-y-4">
                  <div className={`p-6 ${isDark ? 'bg-slate-700/20 border-slate-600/30' : 'bg-slate-200/30 border-slate-400/30'} rounded-lg border`}>
                    <h3 className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-2`}>• Learning how this team makes decisions</h3>
                    <p className={textTertiaryClass}>Understanding your decision-making processes and contributing to them.</p>
                  </div>
                  <div className={`p-6 ${isDark ? 'bg-slate-700/20 border-slate-600/30' : 'bg-slate-200/30 border-slate-400/30'} rounded-lg border`}>
                    <h3 className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-2`}>• Improving documentation & processes</h3>
                    <p className={textTertiaryClass}>Making things clearer, faster, and more efficient for everyone.</p>
                  </div>
                  <div className={`p-6 ${isDark ? 'bg-slate-700/20 border-slate-600/30' : 'bg-slate-200/30 border-slate-400/30'} rounded-lg border`}>
                    <h3 className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-2`}>• Building things that last</h3>
                    <p className={textTertiaryClass}>Creating solutions that are maintainable, scalable, and impact-driven.</p>
                  </div>
                </div>
              </div>

              {/* How I Work */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-center md:text-left">How I Work</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`flashcard h-40 ${flippedCards['work-1'] ? 'flipped' : ''}`}
                    onClick={() => toggleFlip('work-1')}
                  >
                    <div className="flashcard-inner">
                      <div className={`flashcard-front p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600/30' : 'border-slate-400/30'} flex flex-col items-center justify-center text-center`}>
                        <p className="text-lg mb-2">🧠</p>
                        <h3 className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>I ask why before how</h3>
                      </div>
                      <div className={`flashcard-back p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600/30' : 'border-slate-400/30'} flex flex-col items-center justify-center text-center`}>
                        <p className={`${textTertiaryClass} text-sm`}>Understanding the problem deeply leads to better, longer-lasting solutions.</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flashcard h-40 ${flippedCards['work-2'] ? 'flipped' : ''}`}
                    onClick={() => toggleFlip('work-2')}
                  >
                    <div className="flashcard-inner">
                      <div className={`flashcard-front p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600/30' : 'border-slate-400/30'} flex flex-col items-center justify-center text-center`}>
                        <p className="text-lg mb-2">📝</p>
                        <h3 className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>I value clarity</h3>
                      </div>
                      <div className={`flashcard-back p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600/30' : 'border-slate-400/30'} flex flex-col items-center justify-center text-center`}>
                        <p className={`${textTertiaryClass} text-sm`}>Clear APIs, documentation, and ownership reduce friction and scale better over time.</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flashcard h-40 ${flippedCards['work-3'] ? 'flipped' : ''}`}
                    onClick={() => toggleFlip('work-3')}
                  >
                    <div className="flashcard-inner">
                      <div className={`flashcard-front p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600/30' : 'border-slate-400/30'} flex flex-col items-center justify-center text-center`}>
                        <p className="text-lg mb-2">⚖️</p>
                        <h3 className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>I balance pragmatism with quality</h3>
                      </div>
                      <div className={`flashcard-back p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600/30' : 'border-slate-400/30'} flex flex-col items-center justify-center text-center`}>
                        <p className={`${textTertiaryClass} text-sm`}>I aim for solutions that are robust, maintainable, and delivered at the right time.</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flashcard h-40 ${flippedCards['work-4'] ? 'flipped' : ''}`}
                    onClick={() => toggleFlip('work-4')}
                  >
                    <div className="flashcard-inner">
                      <div className={`flashcard-front p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600/30' : 'border-slate-400/30'} flex flex-col items-center justify-center text-center`}>
                        <p className="text-lg mb-2">📣</p>
                        <h3 className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>I welcome feedback</h3>
                      </div>
                      <div className={`flashcard-back p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600/30' : 'border-slate-400/30'} flex flex-col items-center justify-center text-center`}>
                        <p className={`${textTertiaryClass} text-sm`}>Early conversations and course corrections are always better than late surprises.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Built With */}
        <section id="built-with" className={`py-20 px-4 ${sectionBgClass}`}>
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h2 className="text-3xl font-bold mb-6">Built With ✨</h2>
            <div className="space-y-3">
              <p className={textSecondaryClass}>
                This introduction was <span className="font-bold">vibe coded</span> in <span className="font-bold">VS Code</span> with help from:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className={`px-4 py-2 ${isDark ? 'bg-slate-700/50' : 'bg-slate-300/30'} rounded-lg text-sm`}>
                  GitHub Copilot
                </span>
                <span className={`px-4 py-2 ${isDark ? 'bg-slate-700/50' : 'bg-slate-300/30'} rounded-lg text-sm`}>
                  Claude Haiku 4.5
                </span>
                <span className={`px-4 py-2 ${isDark ? 'bg-slate-700/50' : 'bg-slate-300/30'} rounded-lg text-sm`}>
                  React + Tailwind CSS
                </span>
              </div>
              <p className={textTertiaryClass}>
                Deployed with <span className="text-red-500">❤️</span> on <span className="font-bold">GitHub Pages</span>
              </p>
            </div>
          </div>
        </section>


        {/* Scroll to Next Section Button */}
        <button
          onClick={scrollToNextSection}
          className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center ${isDark
            ? 'bg-slate-700 text-white hover:shadow-slate-700/50'
            : 'bg-slate-600 text-white hover:shadow-slate-600/50'
            }`}
          aria-label="Scroll to next section"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>

        {/* GitHub Link Button */}
        <a
          href="https://github.com/nelsonselvam/nelsonselvam.github.io/tree/main"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 bg-black/80 text-white rounded-lg shadow-lg hover:bg-black transition-all"
          aria-label="View source on GitHub"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.774.418-1.304.76-1.604-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.518 11.518 0 0 1 3-.404c1.02.004 2.046.138 3 .404 2.29-1.552 3.295-1.23 3.295-1.23.654 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.625-5.475 5.922.43.37.815 1.102.815 2.222 0 1.604-.015 2.896-.015 3.286 0 .32.217.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          <span className="text-sm font-semibold">View Source</span>
        </a>

      </main>
    </div>
  )
}