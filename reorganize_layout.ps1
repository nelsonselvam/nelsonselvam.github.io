$content = Get-Content "src\App.tsx" -Raw -Encoding UTF8

# Find the section to replace - from "All Status Cards in Grid" comment to the closing div before "Excited About"
$pattern = '(?s)(\s+){/\* All Status Cards in Grid \*/}.*?(?=\s+</div>\s+</section>\s+\s+{/\* Excited About)'

$replacement = @'
            {/* First Row: Currently Learning & Currently Working On */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Currently Learning */}
              <div
                className={`p-6 rounded-xl border bg-gradient-to-br ${isDark
                  ? 'from-emerald-500/20 to-green-500/20 border-emerald-500/30'
                  : 'from-emerald-100 to-green-100 border-emerald-400/40'
                  } transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${isDark ? 'bg-emerald-500/20' : 'bg-emerald-200/50'} p-3 rounded-lg text-3xl flex-shrink-0`}>
                    📖
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                      Currently Learning
                    </h3>
                    <ul className="space-y-2 mt-1">
                      <li className="flex items-center gap-2"><span>🌊</span> Apache Airflow</li>
                      <li className="flex items-center gap-2"><span>🚀</span> GH Actions & GitOps</li>
                      <li className="flex items-center gap-2"><span>🧠</span> Prompt Engineering, MCP</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Currently Working On */}
              <div
                className={`p-6 rounded-xl border bg-gradient-to-br ${isDark
                  ? 'from-rose-500/20 to-pink-500/20 border-rose-500/30'
                  : 'from-rose-100 to-pink-100 border-rose-400/40'
                  } transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${isDark ? 'bg-rose-500/20' : 'bg-rose-200/50'} p-3 rounded-lg text-3xl flex-shrink-0`}>
                    💼
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
                      Currently Working On
                    </h3>
                    <ul className="space-y-2 mt-1">
                      <li className="flex items-center gap-2"><span>🖥️</span> Developing & setting up backend infrastructure for commission calculator web app</li>
                      <li className="flex items-center gap-2"><span>🧪</span> POCs for Legacy Batch Modernization & a Wiki website</li>
                      <li className="flex items-center gap-2"><span>📝</span> Documenting Playbooks and best practices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row: Currently Listening To & Currently Reading */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Currently Listening To with Spotify Embed */}
              <div
                className={`p-6 rounded-xl border bg-gradient-to-br ${isDark
                  ? 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30'
                  : 'from-cyan-100 to-blue-100 border-cyan-400/40'
                  } transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className={`${isDark ? 'bg-cyan-500/20' : 'bg-cyan-200/50'} p-3 rounded-lg text-3xl flex-shrink-0`}>
                    🎧
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                      Currently Listening To
                    </h3>
                    <p className={`${textSecondaryClass} text-sm leading-relaxed mb-3`}>
                      Check out what I'm vibing to
                    </p>
                  </div>
                </div>

                {/* Spotify Embeds */}
                <div className="space-y-4">
                  {/* Podcast Episode */}
                  <div className="overflow-hidden rounded-lg">
                    <iframe
                      style={{ borderRadius: '8px' }}
                      src="https://open.spotify.com/embed/episode/5ESBS8xJyHY2thOnNm9dKV/video?utm_source=generator"
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="w-full"
                    />
                  </div>

                  {/* Playlist */}
                  <div className="overflow-hidden rounded-lg">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: '12px' }}
                      src="https://open.spotify.com/embed/playlist/0oxT02vckTUa9CvUzy39vn?utm_source=generator"
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Currently Reading */}
              <div
                className={`p-6 rounded-xl border bg-gradient-to-br ${isDark
                  ? 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30'
                  : 'from-indigo-100 to-purple-100 border-indigo-400/40'
                  } transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${isDark ? 'bg-indigo-500/20' : 'bg-indigo-200/50'} p-3 rounded-lg text-3xl flex-shrink-0`}>
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
                          <div className={`${textSecondaryClass} text-sm font-medium`}>Ikigai (生き甲斐): The Japanese Secret to a Long and Happy Life</div>
                          <div className={`${textTertiaryClass} text-xs italic`}>by Héctor García & Francesc Miralles</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5">📖</span>
                        <div>
                          <div className={`${textSecondaryClass} text-sm font-medium`}>The Daily Stoic</div>
                          <div className={`${textTertiaryClass} text-xs italic`}>by Ryan Holiday & Stephen Hanselman</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5">📖</span>
                        <div>
                          <div className={`${textSecondaryClass} text-sm font-medium`}>Thinking, Fast & Slow</div>
                          <div className={`${textTertiaryClass} text-xs italic`}>by Daniel Kahneman</div>
                        </div>
                      </li>
                    </ul>
                    
                    {/* Stoic Quote */}
                    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-indigo-400/20' : 'border-indigo-300/30'}`}>
                      <p className={`${textTertiaryClass} text-xs italic text-center`}>
                        "You have power over your mind—not outside events. Realize this, and you will find strength."
                      </p>
                      <p className={`${textTertiaryClass} text-xs text-center mt-1`}>
                        — Marcus Aurelius
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
'@

$newContent = $content -replace $pattern, $replacement

Set-Content "src\App.tsx" -Value $newContent -Encoding UTF8 -NoNewline
Write-Host "Layout reorganization complete!"
