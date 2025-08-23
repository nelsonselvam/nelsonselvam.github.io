export default function Projects() {
  return (
    <section id="projects" className="section py-12">
      <h2 className="text-2xl font-bold mb-6">Highlighted Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <article className="card">
          <h3 className="font-semibold">Prospect Onboarding Orchestration</h3>
          <p className="text-slate-700 mt-2 text-sm">
            Microservice orchestrating data gathering from multiple internal systems and pushing consolidated data to external systems.
          </p>
          <a className="btn mt-4" href="#contact">Let’s talk details</a>
        </article>
        <article className="card">
          <h3 className="font-semibold">Advisor Onboarding Platform</h3>
          <p className="text-slate-700 mt-2 text-sm">
            APIs interfacing with external applications to onboard client records via CRUD operations on customer and account data.
          </p>
          <a className="btn mt-4" href="#contact">Let’s talk details</a>
        </article>
      </div>
      <p className="text-sm text-slate-500 mt-4">More available upon request (client work).</p>
    </section>
  )
}