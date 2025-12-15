import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import TypingBanner from './components/TypingBanner'

interface FloatingEmoji {
  emoji: string
  id: number
  top: number
  left: number
  delay: number
}

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [floatingElements, setFloatingElements] = useState<FloatingEmoji[]>([])
  const [activeAboutTab, setActiveAboutTab] = useState(0)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})

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
        <section className="relative min-h-screen flex items-center justify-center px-4 -mt-20">
          <div className="text-center space-y-6 max-w-3xl animate-fade-in-scale">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-slide-up">
              Hey there! <span className="inline-block animate-wave">👋</span>
            </h1>
            <p className={`text-xl md:text-2xl ${textSecondaryClass} animate-slide-up`} style={{ animationDelay: '0.2s' }}>
              Welcome to my digital introduction!
            </p>
          </div>
        </section>

        {/* Profile Image Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto flex justify-center animate-slide-up">
            <div className="relative">
              <img
                src="/src/images/profile.jpg"
                alt="Nelson Selvam"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-blue-400 shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            </div>
          </div>
        </section>



        {/* About Me */}
        <section className={`py-20 px-4 ${sectionBgClass}`}>
          <div className="max-w-3xl mx-auto animate-slide-up">
            <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              {/*
                { id: 0, icon: '🧠', label: 'Curious & Thoughtful' },
                { id: 1, icon: '🤝', label: 'Collaborative' },
                { id: 2, icon: '📚', label: 'Continuous Learner' }
              */}
              {Array.from({ length: 3 }, (_, i) => i).map((id) => (
                <button
                  key={id}
                  onClick={() => setActiveAboutTab(id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${activeAboutTab === id
                      ? isDark
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg'
                      : isDark
                        ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                        : 'bg-slate-300/30 text-slate-700 hover:bg-slate-300/50'
                    }`}
                >
                  <span className="text-xl">{/* tab.icon */}</span>
                  <span className="hidden sm:inline">{/* tab.label */}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className={`p-8 rounded-lg border transition-all duration-300 ${isDark
                ? 'bg-slate-700/30 border-slate-600/50'
                : 'bg-slate-200/30 border-slate-400/50'
              }`}>
              {activeAboutTab === 0 && (
                <div className="animate-slide-up space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">🧠</span>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Curious & Thoughtful Developer</h3>
                      <p className={`${textSecondaryClass} leading-relaxed`}>
                        I'm passionate about understanding how systems work and why decisions are made. I focus on building solutions that are scalable, maintainable, and sustainable, not just quick fixes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeAboutTab === 1 && (
                <div className="animate-slide-up space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">🤝</span>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Collaborative & Growth-Oriented</h3>
                      <p className={`${textSecondaryClass} leading-relaxed`}>
                        I thrive in environments where I can learn from others and contribute meaningfully, sharing knowledge and mentoring where I can. Growing together is more rewarding than growing alone.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeAboutTab === 2 && (
                <div className="animate-slide-up space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">∞</span>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Continuous Learner</h3>
                      <p className={`${textSecondaryClass} leading-relaxed`}>
                        I'm always exploring new technologies, frameworks, and approaches—whether it's AI/ML, cloud-native patterns, or modern microservices design. I see learning as a continuous journey that shapes better solutions and better engineers.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Education & Location */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8 animate-slide-up">
            <div className="flex flex-col items-center text-center">
              <p className="text-3xl mb-3">🎓</p>
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p className={`${textSecondaryClass} italic`}>B.E. in Electronics & Communication (Class of 2009) </p>
              <p className={textTertiaryClass}>RVSCET/Anna Univ, Tamil Nadu, India</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-3xl mb-3">📍</p>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className={textSecondaryClass}>CT, USA</p>
            </div>
          </div>
        </section>

        {/* Paths Travelled */}
        <section className="py-20 px-4 animate-slide-up">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Paths Travelled</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-blue-400 rounded-full mt-2"></div>
                  <div className="w-1 h-32 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Starting Out (2014 - 2017)</h3>
                  <p className={textTertiaryClass}>
                    Started my career with <span className="text-blue-400 font-bold">Mphasis</span> (India), where I built my foundation working close to databases and core insurance systems—developing Oracle-based applications, resolving production issues,
                    and learning how real-world systems behave under pressure. Early exposure to automation and RPA sparked my interest in making processes simpler and more reliable.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-purple-400 rounded-full mt-2"></div>
                  <div className="w-1 h-32 bg-gradient-to-b from-purple-400 to-pink-400"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-purple-400 mb-2">Growing (2018 - 2023)</h3>
                  <p className={textTertiaryClass}>
                    Transitioned into data and platform engineering, building BI solutions and later moving into backend development. Worked across large enterprise systems,
                    collaborating with business and technical teams, and learning that clean code, documentation, and system clarity matter as much as features.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-pink-400 rounded-full mt-2"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pink-400 mb-2">Now (2024 & beyond)</h3>
                  <p className={textTertiaryClass}>
                    Focused on modernizing enterprise platforms using microservices, APIs, and cloud-native patterns. I design scalable solutions, lead technical initiatives, mentor teams, and spend time understanding the why behind architectural decisions.
                    Recently joined <b className="text-purple-500">Aetna</b> <b className="text-red-500">CVS</b> , and I'm excited to keep learning and growing with this team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How I Work */}
        <section className={`py-20 px-4 ${sectionBgClass}`}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">How I Work</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div 
                className={`flashcard h-48 ${flippedCards['work-1'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('work-1')}
              >
                <div className="flashcard-inner">
                  <div className={`flashcard-front p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-blue-400/20' : 'border-blue-600/20'} flex flex-col items-center justify-center text-center`}>
                    <p className="text-lg mb-2">🧠</p>
                    <h3 className={`font-bold ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>I ask why before how</h3>
                  </div>
                  <div className={`flashcard-back p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-blue-400/20' : 'border-blue-600/20'} flex flex-col items-center justify-center text-center`}>
                    <p className={`${textTertiaryClass} text-sm`}>Understanding the problem deeply leads to better, longer-lasting solutions.</p>
                  </div>
                </div>
              </div>

              <div 
                className={`flashcard h-48 ${flippedCards['work-2'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('work-2')}
              >
                <div className="flashcard-inner">
                  <div className={`flashcard-front p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-purple-400/20' : 'border-purple-600/20'} flex flex-col items-center justify-center text-center`}>
                    <p className="text-lg mb-2">📝</p>
                    <h3 className={`font-bold ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>I value clarity</h3>
                  </div>
                  <div className={`flashcard-back p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-purple-400/20' : 'border-purple-600/20'} flex flex-col items-center justify-center text-center`}>
                    <p className={`${textTertiaryClass} text-sm`}>Clear APIs, documentation, and ownership reduce friction and scale better over time.</p>
                  </div>
                </div>
              </div>

              <div 
                className={`flashcard h-48 ${flippedCards['work-3'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('work-3')}
              >
                <div className="flashcard-inner">
                  <div className={`flashcard-front p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-pink-400/20' : 'border-pink-600/20'} flex flex-col items-center justify-center text-center`}>
                    <p className="text-lg mb-2">⚖️</p>
                    <h3 className={`font-bold ${isDark ? 'text-pink-300' : 'text-pink-600'}`}>I balance pragmatism with quality</h3>
                  </div>
                  <div className={`flashcard-back p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-pink-400/20' : 'border-pink-600/20'} flex flex-col items-center justify-center text-center`}>
                    <p className={`${textTertiaryClass} text-sm`}>I aim for solutions that are robust, maintainable, and delivered at the right time.</p>
                  </div>
                </div>
              </div>

              <div 
                className={`flashcard h-48 ${flippedCards['work-4'] ? 'flipped' : ''}`}
                onClick={() => toggleFlip('work-4')}
              >
                <div className="flashcard-inner">
                  <div className={`flashcard-front p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-emerald-400/20' : 'border-emerald-600/20'} flex flex-col items-center justify-center text-center`}>
                    <p className="text-lg mb-2">📣</p>
                    <h3 className={`font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`}>I welcome feedback</h3>
                  </div>
                  <div className={`flashcard-back p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-emerald-400/20' : 'border-emerald-600/20'} flex flex-col items-center justify-center text-center`}>
                    <p className={`${textTertiaryClass} text-sm`}>Early conversations and course corrections are always better than late surprises.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Manual */}
        <section className="py-20 px-4 animate-slide-up">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">User Manual — Working With Me</h2>
            <div className="grid md:grid-cols-2 gap-8">
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
                    <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>🤫</span>
                    <span>Quiet in large meetings at first — if I'm silent, it usually means I'm thinking, not disengaged.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>⏳</span>
                    <span>Prefer async updates when possible — it helps me focus on deep work.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Reach Me Out For */}
        <section className={`py-20 px-4 ${sectionBgClass}`}>
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h2 className="text-4xl font-bold mb-8">Reach Me Out For</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <span className={`px-6 py-3 ${isDark ? 'bg-blue-500/20 border-blue-400/30' : 'bg-blue-300/30 border-blue-600/30'} border rounded-full`}>🚀 Technical discussions</span>
              <span className={`px-6 py-3 ${isDark ? 'bg-purple-500/20 border-purple-400/30' : 'bg-purple-300/30 border-purple-600/30'} border rounded-full`}>🤝 Collaboration</span>
              <span className={`px-6 py-3 ${isDark ? 'bg-pink-500/20 border-pink-400/30' : 'bg-pink-300/30 border-pink-600/30'} border rounded-full`}>📚 Knowledge sharing</span>
              <span className={`px-6 py-3 ${isDark ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-emerald-300/30 border-emerald-600/30'} border rounded-full`}>☕ Coffee chats</span>
              <span className={`px-6 py-3 ${isDark ? 'bg-amber-500/20 border-amber-400/30' : 'bg-amber-300/30 border-amber-600/30'} border rounded-full`}>💡 New ideas</span>
            </div>
          </div>
        </section>

        {/* Things I Enjoy */}
        <section className="py-20 px-4 animate-slide-up">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Things I Enjoy</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600' : 'border-slate-400'}`}>
                <p className="text-2xl mb-3">📚</p>
                <h3 className="font-bold mb-2">Reading about systems and AI/ML</h3>
                <p className={`${textTertiaryClass} text-sm`}>I enjoy learning how complex systems are designed, scaled, and how AI/ML is influencing modern software and decision-making.</p>
              </div>
              <div className={`p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600' : 'border-slate-400'}`}>
                <p className="text-2xl mb-3">🧩</p>
                <h3 className="font-bold mb-2">Solving edge cases</h3>
                <p className={`${textTertiaryClass} text-sm`}>I like working through problems that don't have obvious answers and require careful thinking.</p>
              </div>
              <div className={`p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600' : 'border-slate-400'}`}>
                <p className="text-2xl mb-3">☕</p>
                <h3 className="font-bold mb-2">Coffee over meetings</h3>
                <p className={`${textTertiaryClass} text-sm`}>I prefer informal 1-on-1 conversations where ideas flow more naturally than in structured meetings.</p>
              </div>
              <div className={`p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600' : 'border-slate-400'}`}>
                <p className="text-2xl mb-3">🎵</p>
                <h3 className="font-bold mb-2">Music as meditation</h3>
                <p className={`${textTertiaryClass} text-sm`}>Listening to music helps me focus, reset, and think clearly.</p>
              </div>
              <div className={`p-6 ${cardBgClass} rounded-lg border ${isDark ? 'border-slate-600' : 'border-slate-400'} md:col-span-2 md:w-1/2 md:mx-auto`}>
                <p className="text-2xl mb-3">🚶</p>
                <h3 className="font-bold mb-2">Long walks for thinking</h3>
                <p className={`${textTertiaryClass} text-sm`}>Some of my clearest thinking happens while walking and quietly working through problems.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Excited About */}
        <section className={`py-20 px-4 ${sectionBgClass}`}>
          <div className="max-w-3xl mx-auto animate-slide-up">
            <h2 className="text-4xl font-bold mb-12 text-center">Excited About</h2>
            <div className="space-y-4">
              <div className={`p-6 ${isDark ? 'bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-blue-400/30' : 'bg-gradient-to-r from-blue-300/20 to-blue-200/10 border-blue-600/30'} rounded-lg border`}>
                <h3 className={`font-bold ${isDark ? 'text-blue-300' : 'text-blue-700'} mb-2`}>• Learning how this team makes decisions</h3>
                <p className={textTertiaryClass}>Understanding your decision-making processes and contributing to them.</p>
              </div>
              <div className={`p-6 ${isDark ? 'bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-purple-400/30' : 'bg-gradient-to-r from-purple-300/20 to-purple-200/10 border-purple-600/30'} rounded-lg border`}>
                <h3 className={`font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'} mb-2`}>• Improving documentation & processes</h3>
                <p className={textTertiaryClass}>Making things clearer, faster, and more efficient for everyone.</p>
              </div>
              <div className={`p-6 ${isDark ? 'bg-gradient-to-r from-pink-500/10 to-pink-500/5 border-pink-400/30' : 'bg-gradient-to-r from-pink-300/20 to-pink-200/10 border-pink-600/30'} rounded-lg border`}>
                <h3 className={`font-bold ${isDark ? 'text-pink-300' : 'text-pink-700'} mb-2`}>• Building things that last</h3>
                <p className={textTertiaryClass}>Creating solutions that are maintainable, scalable, and impact-driven.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Built With */}
        <section className={`py-20 px-4 ${sectionBgClass}`}>
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

        {/* CTA Section */}
        <section className="py-20 px-4 text-center animate-slide-up">
          <h2 className="text-3xl font-bold mb-6">Looking forward to working with you! 🚀</h2>
          <p className={`${textTertiaryClass} mb-8 max-w-2xl mx-auto`}>
            Let's connect, collaborate, and build something meaningful together. Feel free to reach out anytime!
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105">
            Get in Touch
          </button>
        </section>
      </main>
    </div>
  )
}