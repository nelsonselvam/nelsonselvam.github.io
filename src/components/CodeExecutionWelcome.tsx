import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { profile } from '../data/resume'

interface CodeExecutionWelcomeProps {
    isDark: boolean
}

type Phase = 'hello' | 'compilation' | 'execution' | 'transition' | 'query' | 'results' | 'coffee' | 'json'

const javaCode = `public class Welcome {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`

const sqlQuery = `SELECT 
    name,
    title,
    experience_years,
    location,
    specialization,
    certifications,
    status
FROM developers
WHERE name = 'Nelson Selvam'
  AND status = 'ACTIVE';`

export default function CodeExecutionWelcome({ isDark }: CodeExecutionWelcomeProps) {
    const [phase, setPhase] = useState<Phase>('hello')
    const [showCompiling, setShowCompiling] = useState(false)
    const [showCompilationSuccess, setShowCompilationSuccess] = useState(false)
    const [showExecution, setShowExecution] = useState(false)
    const [showDBConnecting, setShowDBConnecting] = useState(false)
    const [showDBConnected, setShowDBConnected] = useState(false)
    const [showFetchingProfile, setShowFetchingProfile] = useState(false)
    const [showQueryExecution, setShowQueryExecution] = useState(false)
    const [visibleRows, setVisibleRows] = useState(0)
    const [canSkip, setCanSkip] = useState(true)
    const [displayedQuery, setDisplayedQuery] = useState('')
    const [visibleJsonLines, setVisibleJsonLines] = useState(0)

    const { displayedText: javaText, isComplete: javaComplete } = useTypingEffect({
        text: javaCode,
        speed: 30,
        onComplete: () => {
            setTimeout(() => setShowCompiling(true), 1000)
        }
    })

    const { displayedText: queryText, isComplete: queryComplete } = useTypingEffect({
        text: '',
        speed: 20,
        onComplete: () => { }
    })

    // Show compiling message, then compilation success
    useEffect(() => {
        if (showCompiling) {
            const timer = setTimeout(() => {
                setShowCompilationSuccess(true)
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [showCompiling])

    // After compilation success, show execution
    useEffect(() => {
        if (showCompilationSuccess) {
            const timer = setTimeout(() => {
                setShowExecution(true)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [showCompilationSuccess])

    // After execution, transition to query phase and start DB connection
    useEffect(() => {
        if (showExecution) {
            const timer = setTimeout(() => {
                setPhase('query')
                setShowDBConnecting(true)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [showExecution])

    // Show DB connected message
    useEffect(() => {
        if (showDBConnecting) {
            const timer = setTimeout(() => {
                setShowDBConnected(true)
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [showDBConnecting])

    // Show fetching profile message
    useEffect(() => {
        if (showDBConnected) {
            const timer = setTimeout(() => {
                setShowFetchingProfile(true)
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [showDBConnected])

    // Type out SQL query character by character
    useEffect(() => {
        if (showFetchingProfile && displayedQuery.length < sqlQuery.length) {
            const timer = setTimeout(() => {
                setDisplayedQuery(sqlQuery.slice(0, displayedQuery.length + 1))
            }, 20)
            return () => clearTimeout(timer)
        } else if (showFetchingProfile && displayedQuery.length === sqlQuery.length && !showQueryExecution) {
            const timer = setTimeout(() => {
                setShowQueryExecution(true)
            }, 1200)
            return () => clearTimeout(timer)
        }
    }, [showFetchingProfile, displayedQuery, showQueryExecution])

    // After query execution, transition to coffee
    useEffect(() => {
        if (phase === 'query' && showQueryExecution) {
            const timer = setTimeout(() => {
                setPhase('coffee')
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [phase, showQueryExecution])

    // Animate table rows (COMMENTED OUT)
    // useEffect(() => {
    //     if (phase === 'results' && visibleRows < profileData.length) {
    //         const timer = setTimeout(() => {
    //             setVisibleRows(prev => prev + 1)
    //         }, 150)
    //         return () => clearTimeout(timer)
    //     }
    // }, [phase, visibleRows])

    // Transition to coffee after table is complete (COMMENTED OUT)
    // useEffect(() => {
    //     if (phase === 'results' && visibleRows === profileData.length) {
    //         const timer = setTimeout(() => {
    //             setPhase('coffee')
    //         }, 2000)
    //         return () => clearTimeout(timer)
    //     }
    // }, [phase, visibleRows])

    // Transition to JSON after coffee
    useEffect(() => {
        if (phase === 'coffee') {
            const timer = setTimeout(() => {
                setPhase('json')
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [phase])

    // Animate JSON lines appearing one by one
    useEffect(() => {
        if (phase === 'json' && visibleJsonLines < 20) {
            const timer = setTimeout(() => {
                setVisibleJsonLines(prev => prev + 1)
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [phase, visibleJsonLines])

    const profileData = [
        { field: 'name', value: profile.name },
        { field: 'title', value: profile.title },
        { field: 'experience', value: '10+ years' },
        { field: 'location', value: profile.location },
        { field: 'specialization', value: 'Microservices, Spring Boot, Cloud (AWS)' },
        { field: 'certifications', value: 'AWS Certified AI Practitioner, Azure AI Fundamentals' },
        { field: 'status', value: '🟢 Available for opportunities' }
    ]

    const skipToResults = () => {
        setPhase('json')
        setVisibleRows(profileData.length)
        setCanSkip(false)
    }

    const bgClass = isDark ? 'bg-slate-900/95' : 'bg-slate-800/95'
    const borderClass = isDark ? 'border-slate-700' : 'border-slate-600'
    const textClass = isDark ? 'text-slate-100' : 'text-slate-200'

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto w-full">
                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`${bgClass} ${borderClass} border rounded-xl shadow-2xl overflow-hidden backdrop-blur-md`}
                >
                    {/* Terminal Header */}
                    <div className={`flex items-center gap-2 px-4 py-3 ${isDark ? 'bg-slate-800/80' : 'bg-slate-700/80'} border-b ${borderClass}`}>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className={`ml-4 text-sm ${textClass} font-mono`}>
                            {phase === 'hello' || phase === 'compilation' || phase === 'execution' ? 'Welcome.java' : phase === 'query' || phase === 'transition' ? 'database-query.sql' : phase === 'json' ? 'api-response.json' : phase === 'coffee' ? 'brewing-coffee.sh' : 'query-results'}
                        </span>
                        {canSkip && phase !== 'results' && phase !== 'coffee' && phase !== 'json' && (
                            <button
                                onClick={skipToResults}
                                className="ml-auto text-xs px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                            >
                                Skip Animation
                            </button>
                        )}
                    </div>

                    {/* Terminal Content */}
                    <div className="p-6 font-mono text-sm min-h-[400px]">
                        {/* Phases 1-3 Combined: Java Program + Compilation + Execution */}
                        {phase === 'hello' && (
                            <div>
                                {/* Java Program - Always visible */}
                                <pre className={`${textClass} whitespace-pre-wrap`}>
                                    <code>
                                        <span className="text-purple-400">public</span>{' '}
                                        <span className="text-purple-400">class</span>{' '}
                                        <span className="text-blue-400">Welcome</span> {'{\n'}
                                        {'    '}<span className="text-purple-400">public</span>{' '}
                                        <span className="text-purple-400">static</span>{' '}
                                        <span className="text-purple-400">void</span>{' '}
                                        <span className="text-blue-400">main</span>
                                        <span className="text-yellow-400">(</span>
                                        <span className="text-purple-400">String</span>
                                        <span className="text-yellow-400">[]</span> args
                                        <span className="text-yellow-400">)</span> {'{\n'}
                                        {'        System'}<span className="text-yellow-400">.</span>out
                                        <span className="text-yellow-400">.</span>
                                        <span className="text-blue-400">println</span>
                                        <span className="text-yellow-400">(</span>
                                        <span className="text-green-400">"Hello World!"</span>
                                        <span className="text-yellow-400">)</span>;{'\n'}
                                        {'    }\n'}
                                        {'}'}
                                    </code>
                                </pre>

                                {/* Compilation Animation - appears below program */}
                                {showCompiling && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 space-y-2"
                                    >
                                        <div className="text-cyan-400">{'>javac Welcome.java'}</div>
                                        <div className="text-slate-400 mt-1">Compiling...</div>

                                        {/* Compilation Success */}
                                        {showCompilationSuccess && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-green-400"
                                            >
                                                ✓ Compilation successful
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Execution Animation - appears after compilation */}
                                {showExecution && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 space-y-2"
                                    >
                                        <div className="text-cyan-400">{'> java -jar welcome.jar'}</div>
                                        <div className="text-green-400 font-bold mt-1 text-lg">Hello World!</div>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* Phase 2: DB Connection + SQL Query (Combined) */}
                        {phase === 'query' && (
                            <div className="space-y-4">
                                {/* DB Connection Steps */}
                                {showDBConnecting && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-cyan-400"
                                    >
                                        {'> Connecting to database...'}
                                    </motion.div>
                                )}

                                {showDBConnected && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-green-400"
                                    >
                                        {'> Connection established ✓'}
                                    </motion.div>
                                )}

                                {showFetchingProfile && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-yellow-400"
                                    >
                                        {'> Fetching developer profile...'}
                                    </motion.div>
                                )}

                                {/* SQL Query with typing effect */}
                                {showFetchingProfile && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <pre className={`${textClass} whitespace-pre-wrap`}>
                                            <code>{displayedQuery}</code>
                                        </pre>
                                    </motion.div>
                                )}

                                {showQueryExecution && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-green-400"
                                    >
                                        Query executed successfully (1 row affected)
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* Phase 3: Table Displaying Records (COMMENTED OUT) */}
                        {/* {phase === 'results' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="overflow-x-auto"
                            >
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className={`${isDark ? 'bg-slate-800' : 'bg-slate-700'}`}>
                                            <th className="border border-slate-600 px-4 py-2 text-left text-cyan-400">Field</th>
                                            <th className="border border-slate-600 px-4 py-2 text-left text-cyan-400">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence>
                                            {profileData.slice(0, visibleRows).map((row, index) => (
                                                <motion.tr
                                                    key={row.field}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className={`${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-700/50'} transition-colors`}
                                                >
                                                    <td className={`border border-slate-600 px-4 py-2 ${textClass} font-semibold`}>
                                                        {row.field}
                                                    </td>
                                                    <td className={`border border-slate-600 px-4 py-2 text-green-400`}>
                                                        {row.value}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>

                                {visibleRows === profileData.length && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-6 flex flex-wrap justify-center gap-4"
                                    >
                                        <a
                                            href="#about"
                                            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-glow"
                                        >
                                            Learn More About Me
                                        </a>
                                        <a
                                            href={profile.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border-2 border-indigo-500 text-indigo-300 hover:bg-indigo-500/10"
                                        >
                                            Connect on LinkedIn
                                        </a>
                                    </motion.div>
                                )}
                            </motion.div>
                        )} */}

                        {/* Phase 4: Coffee Brewing */}
                        {phase === 'coffee' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center min-h-[300px]"
                            >
                                <motion.div
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                        y: [0, -10, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-9xl mb-4"
                                >
                                    ☕
                                </motion.div>
                                <div className="text-2xl text-cyan-400 font-bold">Java</div>
                                <div className="text-slate-400 mt-2">Brewing your API response...</div>
                            </motion.div>
                        )}

                        {/* Phase 5: JSON Response */}
                        {phase === 'json' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-green-400">HTTP/1.1</span>
                                    <span className="text-green-400 font-bold">200</span>
                                    <span className="text-green-400">Freshly Brewed ☕</span>
                                </div>
                                <pre className={`${textClass} whitespace-pre-wrap`}>
                                    <code>
                                        {visibleJsonLines >= 1 && '{'}
                                        {visibleJsonLines >= 2 && '\n  '}{visibleJsonLines >= 2 && <span className="text-cyan-400">"status"</span>}{visibleJsonLines >= 2 && ': '}{visibleJsonLines >= 2 && <span className="text-yellow-400">200</span>}{visibleJsonLines >= 2 && ','}
                                        {visibleJsonLines >= 3 && '\n  '}{visibleJsonLines >= 3 && <span className="text-cyan-400">"message"</span>}{visibleJsonLines >= 3 && ': '}{visibleJsonLines >= 3 && <span className="text-green-400">"Coffee's ready! Here's your developer profile."</span>}{visibleJsonLines >= 3 && ','}
                                        {visibleJsonLines >= 4 && '\n  '}{visibleJsonLines >= 4 && <span className="text-cyan-400">"developer"</span>}{visibleJsonLines >= 4 && ': {'}
                                        {visibleJsonLines >= 5 && '\n    '}{visibleJsonLines >= 5 && <span className="text-cyan-400">"name"</span>}{visibleJsonLines >= 5 && ': '}{visibleJsonLines >= 5 && <span className="text-green-400">"{profile.name}"</span>}{visibleJsonLines >= 5 && ','}
                                        {visibleJsonLines >= 6 && '\n    '}{visibleJsonLines >= 6 && <span className="text-cyan-400">"title"</span>}{visibleJsonLines >= 6 && ': '}{visibleJsonLines >= 6 && <span className="text-green-400">"{profile.title}"</span>}{visibleJsonLines >= 6 && ','}
                                        {visibleJsonLines >= 7 && '\n    '}{visibleJsonLines >= 7 && <span className="text-cyan-400">"experience"</span>}{visibleJsonLines >= 7 && ': '}{visibleJsonLines >= 7 && <span className="text-green-400">"10+ years"</span>}{visibleJsonLines >= 7 && ','}
                                        {visibleJsonLines >= 8 && '\n    '}{visibleJsonLines >= 8 && <span className="text-cyan-400">"location"</span>}{visibleJsonLines >= 8 && ': '}{visibleJsonLines >= 8 && <span className="text-green-400">"{profile.location}"</span>}{visibleJsonLines >= 8 && ','}
                                        {visibleJsonLines >= 9 && '\n    '}{visibleJsonLines >= 9 && <span className="text-cyan-400">"specialization"</span>}{visibleJsonLines >= 9 && ': '}{visibleJsonLines >= 9 && <span className="text-green-400">"Microservices, Spring Boot, Cloud (AWS)"</span>}{visibleJsonLines >= 9 && ','}
                                        {visibleJsonLines >= 10 && '\n    '}{visibleJsonLines >= 10 && <span className="text-cyan-400">"certifications"</span>}{visibleJsonLines >= 10 && ': ['}
                                        {visibleJsonLines >= 11 && '\n      '}{visibleJsonLines >= 11 && <span className="text-green-400">"AWS Certified AI Practitioner"</span>}{visibleJsonLines >= 11 && ','}
                                        {visibleJsonLines >= 12 && '\n      '}{visibleJsonLines >= 12 && <span className="text-green-400">"Azure AI Fundamentals"</span>}
                                        {visibleJsonLines >= 13 && '\n    '}]{visibleJsonLines >= 13 && ','}
                                        {visibleJsonLines >= 14 && '\n    '}{visibleJsonLines >= 14 && <span className="text-cyan-400">"currently_reading"</span>}{visibleJsonLines >= 14 && ': '}{visibleJsonLines >= 14 && <span className="text-green-400">"The Pragmatic Programmer"</span>}{visibleJsonLines >= 14 && ','}
                                        {visibleJsonLines >= 15 && '\n    '}{visibleJsonLines >= 15 && <span className="text-cyan-400">"current_project"</span>}{visibleJsonLines >= 15 && ': '}{visibleJsonLines >= 15 && <span className="text-green-400">"Building this portfolio with React + AI"</span>}{visibleJsonLines >= 15 && ','}
                                        {visibleJsonLines >= 16 && '\n    '}{visibleJsonLines >= 16 && <span className="text-cyan-400">"fun_fact"</span>}{visibleJsonLines >= 16 && ': '}{visibleJsonLines >= 16 && <span className="text-green-400">"Named after Nelson Mandela 🌟"</span>}{visibleJsonLines >= 16 && ','}
                                        {visibleJsonLines >= 17 && '\n    '}{visibleJsonLines >= 17 && <span className="text-cyan-400">"coffee_consumed_today"</span>}{visibleJsonLines >= 17 && ': '}{visibleJsonLines >= 17 && <span className="text-yellow-400">3</span>}{visibleJsonLines >= 17 && ','}
                                        {visibleJsonLines >= 18 && '\n    '}{visibleJsonLines >= 18 && <span className="text-cyan-400">"bugs_squashed_this_week"</span>}{visibleJsonLines >= 18 && ': '}{visibleJsonLines >= 18 && <span className="text-yellow-400">42</span>}
                                        {visibleJsonLines >= 19 && '\n  }'}{visibleJsonLines >= 19 && ','}
                                        {visibleJsonLines >= 20 && '\n  '}{visibleJsonLines >= 20 && <span className="text-cyan-400">"timestamp"</span>}{visibleJsonLines >= 20 && ': '}{visibleJsonLines >= 20 && <span className="text-green-400">"{new Date().toISOString()}"</span>}
                                        {visibleJsonLines >= 20 && '\n}'}
                                    </code>
                                </pre>

                                {visibleJsonLines >= 20 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-6 flex flex-wrap justify-center gap-4"
                                    >
                                        <a
                                            href="#hero"
                                            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-slate-700 hover:bg-slate-600 text-slate-100 shadow-lg"
                                        >
                                            Skip the Boring Stuff →
                                        </a>
                                        <a
                                            href={profile.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border-2 border-slate-500 text-slate-300 hover:bg-slate-700/30"
                                        >
                                            Connect on LinkedIn
                                        </a>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
