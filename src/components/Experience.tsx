import { experience } from '../data/resume'

export default function Experience() {
  return (
    <section id="experience" className="card">
      <h2 className="text-2xl font-bold mb-6">Experience</h2>
      <div className="divide-y divide-slate-200">
        {experience.map((job, idx) => (
          <div key={idx} className="pt-6 first:pt-0">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
              <h3 className="font-semibold">{job.role} — <span className="text-accent">{job.company}</span></h3>
              <span className="text-sm text-slate-500">{job.period}</span>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-2 text-slate-700">
              {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            {job.projects && job.projects.length > 0 && (
              <details className="mt-4">
                <summary className="cursor-pointer text-accent">Show notable projects</summary>
                <ul className="mt-2 list-disc list-inside space-y-2 text-slate-700">
                  {job.projects.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </details>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}