# Read the file
$lines = Get-Content 'src\App.tsx' -Encoding UTF8

# Find and replace the Currently Reading section (lines 715-737)
$newSection = @'
              {/* Currently Reading */}
              <div
                className={`p-6 rounded-xl border bg-gradient-to-br ${isDark
                  ? 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30'
                  : 'from-indigo-100 to-purple-100 border-indigo-400/40'
                  } transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-start gap-4">
                  <div className={` p-3 rounded-lg text-3xl flex-shrink-0`}>
                    📚
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
                      Currently Reading
                    </h3>
                    <ul className="space-y-3 mt-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5">📖</span>
                        <div>
                          <div className={` text-sm font-medium`}>Ikigai (生き甲斐): The Japanese Secret to a Long and Happy Life</div>
                          <div className={` text-xs italic`}>by Héctor García & Francesc Miralles</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5">📖</span>
                        <div>
                          <div className={` text-sm font-medium`}>The Daily Stoic</div>
                          <div className={` text-xs italic`}>by Ryan Holiday & Stephen Hanselman</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5">📖</span>
                        <div>
                          <div className={` text-sm font-medium`}>Thinking, Fast & Slow</div>
                          <div className={` text-xs italic`}>by Daniel Kahneman</div>
                        </div>
                      </li>
                    </ul>
                    
                    {/* Stoic Quote */}
                    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-indigo-400/20' : 'border-indigo-300/30'}`}>
                      <p className={` text-xs italic text-center`}>
                        "You have power over your mind—not outside events. Realize this, and you will find strength."
                      </p>
                      <p className={` text-xs text-center mt-1`}>
                        — Marcus Aurelius
                      </p>
                    </div>
                  </div>
                </div>
              </div>
'@

# Replace lines 714-736 with new section
$newLines = $lines[0..713] + ($newSection -split "
") + $lines[737..($lines.Length-1)]

# Write back
Set-Content 'src\App.tsx' -Value ($newLines -join "
") -Encoding UTF8 -NoNewline
