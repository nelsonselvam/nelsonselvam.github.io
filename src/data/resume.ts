export const profile = {
  name: "Nelson Selvam",
  title: "Senior Software Engineer / Java Full Stack Developer",
  location: "Bristol, CT, USA",
  github: "https://github.com/nelsonselvam",
  linkedin: "https://www.linkedin.com/in/nelsonselvam/",
  summary: `Senior Software Engineer with 10+ years of experience designing and delivering scalable, backend-focused full-stack solutions.
Proficient in microservices, Spring Boot, and modernizing legacy systems with cloud-native architectures. Passionate about clean code,
DevOps, and mentoring teams.`
};

export const skills = {
  languages: ["Java", "Python", "JavaScript", "SQL", "PL/SQL"],
  backend: ["Spring Boot", "Spring Batch", "Spring JDBC", "Spring Security", "Flask"],
  frontend: ["React", "HTML5", "CSS3", "NPM"],
  databases: ["Oracle", "PostgreSQL", "Snowflake"],
  cloud: ["AWS", "Microsoft Azure"],
  devops: ["Maven", "Jenkins", "Git", "GitHub", "Docker", "CI/CD"],
  integration: ["REST APIs", "SOAP", "APIGEE", "RabbitMQ", "Microservices Architecture"],
  testing: ["JUnit", "Mockito", "SonarQube", "Postman", "SOAP UI", "Test Automation"],
  bi: ["Tableau", "Power BI"]
};

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Mphasis",
    period: "Mar 2019 — Present · USA",
    bullets: [
      "Led microservices modernization for retirement services platform.",
      "Designed 8+ REST APIs and enhanced 10+ APIs (Java, Spring Boot, Oracle, AWS).",
      "Built shared libraries for JWT, external API communication, and validation.",
      "Led security remediation (OWASP Top 10), Java upgrades (8→11/17), and Spring Boot modernization.",
      "Automated test data creation with Python + GitHub Copilot (reduced setup from hours to minutes).",
      "Delivered 5+ PoCs: OpenShift migration, AI tool integration, Spring LDAP, API caching."
    ],
    projects: [
      "Prospect Onboarding Orchestration — microservice that aggregates data from internal systems and pushes to external systems.",
      "Advisor Onboarding Platform — APIs to onboard client records via CRUD on customer/account data.",
      "Investor Profiles Consolidation — cross-system search to unify client investment profiles.",
      "Defined Benefits Integration — microservice with AWS S3 + RabbitMQ listener pattern to ingest vendor files.",
      "Daily Values QDRO System — create/update/search/download QDRO records with financial calculations."
    ]
  },
  {
    role: "Software Engineer",
    company: "Mphasis",
    period: "Oct 2016 — Feb 2019 · India",
    bullets: [
      "Built BI solutions in Tableau & Power BI for sales/product/customer metrics.",
      "Developed interactive dashboards with drill-down, parameters, groups, and sets.",
      "Administered Tableau Server and automated report scheduling."
    ]
  },
  {
    role: "Associate Software Engineer",
    company: "Mphasis",
    period: "May 2014 — Sep 2016 · India",
    bullets: [
      "Maintained Oracle Forms/Reports apps for insurance processes using SQL/PLSQL.",
      "Performed RCA and resolved critical production issues with EOM reconciliations.",
      "Automated tasks with batch/shell; led RPA PoC using UiPath/Blue Prism."
    ]
  }
]

export const certs = [
  { name: "AWS Certified AI Practitioner", year: "2024" },
  { name: "Microsoft Azure AI Fundamentals", year: "2023" },
  { name: "AWS Certified Developer — Associate", year: "2021" }
]

export const education = {
  degree: "B.E. — Electronics & Communication",
  school: "RVS College of Engineering & Technology (Anna University)",
  details: "2009–2013 · CGPA 8.73 · Summa cum laude"
}

export const careerMilestones = [
  {
    title: "Graduation",
    description: "B.E. — Electronics & Communication",
    date: "May 2013",
    location: "India",
    icon: "🎓",
    type: "education"
  },
  {
    title: "Joined Mphasis",
    description: "DB & Analytics — Associate Software Engineer",
    date: "May 2014",
    location: "India",
    icon: "💼",
    type: "career",
    details: "Oracle Forms/Reports, SQL/PLSQL, Database maintenance"
  },
  {
    title: "Backend Development",
    description: "Software Engineer — BI & Backend",
    date: "Oct 2016",
    location: "India",
    icon: "⚙️",
    type: "transition",
    details: "Tableau, Power BI, Backend development"
  },
  {
    title: "Moved Onsite",
    description: "Senior Software Engineer",
    date: "Mar 2019",
    location: "USA",
    icon: "🌎",
    type: "transition",
    details: "Microservices, Spring Boot, AWS"
  },
  {
    title: "Joined CVS Aetna",
    description: "Senior Software Engineer",
    date: "Present",
    location: "USA",
    icon: "🚀",
    type: "career",
    details: "Continuing to build scalable solutions"
  }
]