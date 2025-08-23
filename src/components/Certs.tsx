import { FaAws, FaGraduationCap } from 'react-icons/fa';
import { FcDiploma1, FcGraduationCap } from "react-icons/fc";
import { certs, education } from '../data/resume';
import { MdCloud, MdBadge } from "react-icons/md";

export default function Certs() {
  const iconMap: Record<string, JSX.Element> = {
    "AWS": <FaAws className="text-orange-500" />,
    "Azure": <MdCloud className="text-blue-600" />
  }

  return (
    <section id="certs" className="section py-12">
      <h2 className="text-2xl font-bold mb-6">Certifications & Education</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
            <FcDiploma1 className="text-accent" /> Certifications</h3>
          <ul className="space-y-3 text-slate-700">
            {certs.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                {Object.keys(iconMap).find(k => c.name.includes(k)) ?
                  iconMap[Object.keys(iconMap).find(k => c.name.includes(k))!] :
                  <span className="w-4 h-4 border rounded-full" />}
                {c.name} ({c.year})
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <FcGraduationCap className="text-accent" /> Education
          </h3>
          <p className="text-slate-700">{education.degree}</p>
          <p className="text-slate-700">{education.school}</p>
          <p className="text-slate-500 text-sm">{education.details}</p>
        </div>
      </div>
    </section>
  )
}
