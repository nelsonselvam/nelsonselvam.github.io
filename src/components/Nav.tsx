import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#certs', label: 'Certs' },
  { href: '#contact', label: 'Contact' }
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <nav className="section flex items-center justify-between h-14">
        <a href="#" className="font-semibold">Nelson Selvam</a>
        <button className="sm:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
        <ul className="hidden sm:flex gap-5">
          {links.map(l => (
            <li key={l.href}><a className="hover:text-accent" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </nav>
      {open && (
        <ul className="sm:hidden section py-2 space-y-2">
          {links.map(l => (
            <li key={l.href}><a className="block p-2 rounded hover:bg-slate-100" onClick={() => setOpen(false)} href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      )}
    </header>
  )
}