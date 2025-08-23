
import { Typewriter } from 'react-simple-typewriter'

export default function TypingBanner() {
  return (
    <section className="section py-20 text-center">
      {/* Set a min-height on mobile to prevent layout shift when text wraps */}
      <h2 className="text-2xl md:text-3xl font-sans text-slate-700 min-h-[4rem] md:min-h-0 flex flex-col items-center gap-2">
        <span>What we code <span className="italic">now()</span> echoes in</span>
        <span className="text-accent">
          <Typewriter
            words={[
              'maintainability &&',
              'every future() release.'
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={30}
            delaySpeed={1500}
          />
        </span>
      </h2>
 {/*      <div className="mt-6 flex justify-center">
        <img src="/banner.png" alt="Core Programming Principle" className="max-h-36" />
      </div> */}
    </section>
  )
}
