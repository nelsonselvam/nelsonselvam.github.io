import { skills } from '../data/resume'

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>
}

function Row({ title, items }: { title: string, items: string[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(i => <Pill key={i}>{i}</Pill>)}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="card">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Row title="Languages" items={skills.languages} />
        <Row title="Backend" items={skills.backend} />
        <Row title="Frontend" items={skills.frontend} />
        <Row title="Databases" items={skills.databases} />
        <Row title="Cloud" items={skills.cloud} />
        <Row title="DevOps" items={skills.devops} />
        <Row title="Integration" items={skills.integration} />
        <Row title="Testing & Quality" items={skills.testing} />
        <Row title="Business Intelligence" items={skills.bi} />
      </div>
    </section>
  )
}