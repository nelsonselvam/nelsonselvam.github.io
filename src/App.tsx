import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certs from './components/Certs'
import Contact from './components/Contact'
import TypingBanner from './components/TypingBanner'

export default function App() {
  return (
    <div className="font-sans">
      {/* <Nav /> */}
      <TypingBanner />
      <main>
        <Hero />
        <About />

        <div className="section py-6 space-y-12">
          <Skills />
          <Experience />
        </div>

        <Projects />
        <Certs />
        <Contact />
      </main>
    </div>
  )
}