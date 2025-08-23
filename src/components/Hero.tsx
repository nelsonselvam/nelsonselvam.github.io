import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { profile } from '../data/resume'

export default function Hero() {
  return (
    <section className="section pt-16 pb-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {profile.name}
          </h1>
          <p className="text-lg text-slate-600">{profile.title}</p>
          <p className="max-w-prose text-slate-700">{profile.summary}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a className="btn" href={`mailto:${profile.email}`}><Mail size={18} /> Email</a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="card text-slate-700">
            <h2 className="font-semibold mb-2">At a Glance</h2>
            <ul className="space-y-2 text-sm">
              <li>📍 {profile.location}</li>
              <li>📞 {profile.phone}</li>
              <li>✉️ {profile.email}</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}