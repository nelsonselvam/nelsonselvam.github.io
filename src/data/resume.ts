export const profile = {
  name: "Nelson Selvam",
  title: "Senior Software Engineer",
  subtitle: "Designing systems that teams rely on",
  location: "Bristol, CT, USA",
  github: "https://github.com/nelsonselvam",
  linkedin: "https://www.linkedin.com/in/nelsonselvam/",
  experience: "10+",
  coverQuote: "The best code is not the code you write — it's the system you design so others can build confidently.",
};

export const chapters = [
  { number: 1, title: "The Origin", subtitle: "From circuits to code", page: 3 },
  { number: 2, title: "The Craft", subtitle: "Tools of the trade", page: 4 },
  { number: 3, title: "The Current Chapter", subtitle: "What I'm building now", page: 5 },
  { number: 4, title: "The Philosophy", subtitle: "How I think about engineering", page: 6 },
];

export const careerMilestones = [
  {
    title: "Graduation",
    description: "B.E. — Electronics & Communication",
    date: "May 2013",
    location: "India",
    icon: "🎓",
    type: "education",
    details: "RVS College of Engineering & Technology (Anna University) · CGPA 8.73",
    color: "indigo"
  },
  {
    title: "Joined Mphasis",
    description: "Associate Software Engineer — DB & Analytics",
    date: "May 2014",
    location: "India",
    icon: "💼",
    type: "career",
    details: "Oracle Forms/Reports, SQL/PLSQL, database maintenance, batch automation",
    logo: "/images/logo_mphasis.jpg",
    color: "cyan"
  },
  {
    title: "Backend & BI",
    description: "Software Engineer — BI & Backend",
    date: "Oct 2016",
    location: "India",
    icon: "⚙️",
    type: "transition",
    details: "Tableau, Power BI, interactive dashboards, report automation",
    color: "purple"
  },
  {
    title: "Moved Onsite",
    description: "Senior Software Engineer",
    date: "Mar 2019",
    location: "USA",
    icon: "🌎",
    type: "transition",
    details: "Microservices architecture, Spring Boot, AWS, REST API design",
    color: "blue"
  },
  {
    title: "CVS Aetna",
    description: "Senior Software Engineer",
    date: "Present",
    location: "USA",
    icon: "🚀",
    type: "career",
    details: "Building scalable platforms, leading modernization, mentoring engineers",
    logo: "/images/logo_cvs.png",
    color: "red"
  }
];

export const skillGroups = [
  {
    category: "Backend Systems",
    icon: "⚙️",
    skills: ["Java", "Spring Boot", "Spring Batch", "REST APIs", "Microservices"],
    annotation: "Where I spend most of my time"
  },
  {
    category: "Architecture & Design",
    icon: "🏗️",
    skills: ["System Design", "API Design", "Event-Driven Patterns", "Domain Modeling"],
    annotation: "What I'm growing into"
  },
  {
    category: "Data & Databases",
    icon: "🗄️",
    skills: ["Oracle", "PostgreSQL", "Snowflake", "SQL/PLSQL"],
    annotation: null
  },
  {
    category: "Cloud & Platform",
    icon: "☁️",
    skills: ["AWS (Certified)", "GCP (Learning)", "Docker", "CI/CD", "Jenkins"],
    annotation: null
  },
  {
    category: "Integration",
    icon: "🔗",
    skills: ["REST", "SOAP", "APIGEE", "RabbitMQ", "S3"],
    annotation: null
  },
  {
    category: "Quality & Observability",
    icon: "🔍",
    skills: ["JUnit", "Mockito", "SonarQube", "Test Automation"],
    annotation: null
  },
  {
    category: "Business Intelligence",
    icon: "📊",
    skills: ["Tableau", "Power BI"],
    annotation: null
  },
];

export const currentStatus = {
  learning: [
    { icon: "🧠", text: "Cloud Engineering with Google Cloud Platform" },
    { icon: "🚀", text: "Context & Prompt Engineering, MCP" },
    { icon: "🌊", text: "Apache Airflow" },
    { icon: "⚡", text: "GitHub Actions & GitOps" },
  ],
  working: [
    { icon: "🖥️", text: "Developing & setting up backend infrastructure web apps" },
    { icon: "📝", text: "Documenting playbooks and best practices" },
    { icon: "🧪", text: "POCs experimenting with AI-assisted prototyping & development" },
  ],
  reading: [
    { title: "Ikigai (生き甲斐)", author: "Héctor García & Francesc Miralles" },
    { title: "The Daily Stoic", author: "Ryan Holiday & Stephen Hanselman" },
    { title: "Thinking, Fast & Slow", author: "Daniel Kahneman" },
  ],
  readingQuote: {
    text: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius"
  },
  spotify: [
    { type: "episode", url: "https://open.spotify.com/embed/episode/5ESBS8xJyHY2thOnNm9dKV/video?utm_source=generator" },
    { type: "episode", url: "https://open.spotify.com/embed/episode/1bx2B9lDhiujXPU2u20AAX/video?utm_source=generator" },
    { type: "playlist", url: "https://open.spotify.com/embed/playlist/0oxT02vckTUa9CvUzy39vn?utm_source=generator" },
  ]
};

export const philosophy = {
  principles: [
    {
      icon: "🧠",
      title: "Ask why before how",
      description: "Connect technical decisions to business outcomes. Understanding the problem deeply leads to solutions that outlast the sprint.",
      annotation: "← This saves teams weeks"
    },
    {
      icon: "📝",
      title: "Reduce ambiguity",
      description: "Through documentation, decision records, and clear ownership — complexity becomes manageable at scale.",
      annotation: "← Scale enabler"
    },
    {
      icon: "🏗️",
      title: "Build for the team, not the ticket",
      description: "Shared libraries, clear APIs, and institutional knowledge compound over time. Individual output matters less than organizational velocity.",
      annotation: "← Multiplier mindset"
    },
    {
      icon: "⚖️",
      title: "Balance pragmatism with quality",
      description: "Ship the right thing at the right time. Perfect is the enemy of delivered — but so is reckless speed.",
      annotation: null
    },
  ],
  userManual: {
    dos: [
      { icon: "🗣", text: "Ask questions anytime — I'm happy to clarify or brainstorm." },
      { icon: "✉️", text: "Give direct feedback — constructive input is always appreciated." },
      { icon: "💡", text: "Jump in with ideas — collaboration and shared input are welcome." },
    ],
    notes: [
      { icon: "👂", text: "I like to listen first and then contribute once I have clarity." },
      { icon: "⏳", text: "Async updates work great, but I'm always happy to sync when urgent." },
    ],
  },
};

export const funFacts = [
  { icon: "👤", text: "Named after Nelson Mandela — still working on the legacy part." },
  { icon: "📚", text: "Avid reader. Good books sharpen both empathy and engineering judgment." },
  { icon: "🎵", text: "Background scores and playlists are my preferred debugging companions." },
  { icon: "☕", text: "Good coffee & slow conversations — where the best ideas surface." },
];

export const conversation: Array<{
  user: string;
  assistant: string;
  richContentType: string;
  showAfter?: number;
}> = [
  {
    user: "Who is Nelson Selvam?",
    assistant: "Nelson Selvam is a Senior Software Engineer based in Bristol, CT, with over 10 years of experience designing and delivering scalable, backend-focused full-stack solutions.\n\nHe specializes in microservices architecture, Spring Boot, and modernizing legacy systems with cloud-native approaches. Currently at CVS Aetna, he focuses on building platforms that teams rely on — not just features that ship once.",
    richContentType: "profile",
  },
  {
    user: "What can Nelson help with?",
    assistant: "Absolutely nothing. {{pause}} Oh wait, I take that back! 😄 He's actually what you'd call an 'average programmer'... who just happens to have 10+ years of building enterprise systems, mass migration experience, and an unhealthy obsession with clean architecture.\n\nHere's what's actually in the toolkit:",
    richContentType: "skills",
  },
  {
    user: "Walk me through his career journey.",
    assistant: "Buckle up — this one covers two countries, three career pivots, and a lot of coffee. ☕\n\nHere's the timeline from circuits to code:",
    richContentType: "timeline",
  },
  {
    user: "What's he working on right now?",
    assistant: "The man never stops tinkering. Here's what Nelson's current chapter looks like — always learning, always building:",
    richContentType: "currentStatus",
  },
  {
    user: "How does he approach engineering?",
    assistant: "Pretty seriously, actually — which is surprising for someone who named his AI model after a Naruto technique. 😏\n\nNelson operates on a few core principles that shape how he builds and leads:\n\n📋 Oh, I also have a user manual for working with him — ask me about it!",
    richContentType: "philosophy",
  },
  {
    user: "Show me the user manual!",
    assistant: "Glad you asked! Think of this as a README.md — but for a human. Here's how to get the best out of working with Nelson:",
    richContentType: "userManual",
    showAfter: 4,
  },
  {
    user: "Any fun facts? How do I connect with him?",
    assistant: "Oh, where do I start... {{pause}} Actually, let me keep it to the highlights. Here are some things you might not guess:",
    richContentType: "funFacts",
  },
];