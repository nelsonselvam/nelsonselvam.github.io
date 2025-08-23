// It would be best to move these links to your `data/resume.ts` file
const socialLinks = {
  linkedin: "https://www.linkedin.com/in/your-profile",
  github: "https://github.com/your-profile",
  email: "mailto:your.email@example.com"
}

export default function About() {
  return (
    <section id="about" className="section py-6">
      <p className="text-slate-600 mb-6">
        I build resilient, cloud-ready systems with clean APIs and a bias for automation.
        When legacy meets modern, I translate.
      </p>
      {/* <div className="flex flex-wrap gap-4">
        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
          LinkedIn
        </a>
        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="btn">
          GitHub
        </a>
        <a href={socialLinks.email} className="btn">Email Me</a>
      </div> */}
    </section>
  )
}