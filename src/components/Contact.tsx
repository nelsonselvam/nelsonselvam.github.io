import { profile } from '../data/resume'

export default function Contact() {
  return (
    <section id="contact" className="section py-16">
      <div className="card text-center">
        <h2 className="text-2xl font-bold">Let’s build something great</h2>
        <p className="text-slate-600 mt-2">Reach out for opportunities, collaborations, or a quick chat about microservices.</p>
        <div className="mt-4 space-x-3">
          <a className="btn" href={`mailto:${profile.email}`}>Email Me</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 mt-6">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
    </section>
  )
}