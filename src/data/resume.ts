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
    details: "RVS College of Engineering & Technology (Anna University)",
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
    details: "Building scalable platforms, leading modernization, driving technical excellence",
    logo: "/images/logo_cvs.png",
    color: "red"
  }
];

export const skillGroups = [
  {
    category: "Backend & Architecture",
    icon: "⚙️",
    skills: ["Java & Spring Boot", "Microservices", "REST / APIGEE", "System Design"],
    annotation: "Where he spends most of his time"
  },
  {
    category: "Cloud & Infrastructure",
    icon: "☁️",
    skills: ["AWS & GCP (Certified)", "GitHub & CI/CD", "Docker", "Observability"],
    annotation: "Multi-cloud capability"
  },
  {
    category: "Data & Business Intelligence",
    icon: "🗄️",
    skills: ["Oracle / PostgreSQL", "Snowflake / SQL", "Tableau", "Power BI"],
    annotation: "From raw data to insights"
  },
  {
    category: "AI & Context Engineering",
    icon: "🤖",
    skills: ["Prompt Engineering", "Context Engineering", "Model Context Protocol (MCP)"],
    annotation: "Where the industry is heading"
  }
];

export const currentStatus = {
  learning: [
    { icon: "🚀", text: "Context Engineering & Model Context Protocol (MCP)" },
    { icon: "🌍", text: "AWS ML Associate" },
    { icon: "🌊", text: "Data Engineering pipelines with Apache Airflow" },
  ],
  working: [
    { icon: "🖥️", text: "Developing & setting up backend infrastructure web apps" },
    { icon: "📝", text: "Documenting playbooks and best practices" },
    { icon: "🧪", text: "POCs experimenting with AI-assisted prototyping & development" },
  ],
  reading: [
    { 
      title: "Ikigai (生き甲斐)", 
      author: "Héctor García & Francesc Miralles",
      quote: "There is a passion inside you, a unique talent that gives meaning to your days."
    },
    { 
      title: "The Daily Stoic", 
      author: "Ryan Holiday & Stephen Hanselman",
      quote: "You have power over your mind — not outside events. Realize this, and you will find strength."
    },
    { 
      title: "Thinking, Fast & Slow", 
      author: "Daniel Kahneman",
      quote: "Nothing in life is as important as you think it is, while you are thinking about it."
    },
  ],
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
      description: "He connects technical decisions to business outcomes. Understanding the problem deeply leads to solutions that outlast the sprint.",
      annotation: "← Saves teams weeks"
    },
    {
      icon: "🏗️",
      title: "Reduce ambiguity & build for the team",
      description: "Through clear APIs, shared libraries, and documentation, he makes complexity manageable. Individual output matters less than organizational velocity.",
      annotation: "← Scale enabler"
    },
    {
      icon: "🤖",
      title: "Automate the repetitive",
      description: "He approaches repetitive tasks with an automation mindset. If a process requires doing the same thing twice, he scripts it.",
      annotation: "← Eliminates toil"
    }
  ],
  userManual: {
    dos: [
      { icon: "🗣", text: "Ask questions anytime — he's happy to clarify or brainstorm." },
      { icon: "✉️", text: "Give direct feedback — constructive input is always appreciated." },
      { icon: "💡", text: "Jump in with ideas — collaboration and shared input are welcome." },
    ],
    notes: [
      { icon: "👂", text: "He likes to listen first and contribute once he has clarity." },
      { icon: "⏳", text: "Async updates work great, but he's always happy to sync when urgent." },
    ],
  },
};

export const funFacts = [
  { icon: "👤", text: "Named after Nelson Mandela — still working on the legacy part." },
  { icon: "📚", text: "Avid reader. Good books sharpen both empathy and engineering judgment." },
  { icon: "🎵", text: "Background scores and playlists are my preferred debugging companions." },
  { icon: "🌍", text: "Married to a fellow Cloud Engineer! When offline, you'll find us traveling, baking, cooking a killer biriyani, or fighting over what series to binge-watch." },
];

export const conversation: Array<{
  user: string;
  assistant: string;
  richContentType: string;
  showAfter?: number;
}> = [
  {
    user: "Who is Nelson Selvam?",
    assistant: "Nelson Selvam is a Senior Software Engineer based in Bristol, CT, with over 10 years of experience designing and delivering scalable, backend-focused full-stack solutions.\n\nHe specializes in microservices architecture, Spring Boot, and modernizing legacy systems with cloud-native approaches. Currently at CVS Aetna, he has recently joined the Broker Commissions Team, where he is primarily focused on working on the core Commissions Calculator project."
  },
  {
    user: "What can Nelson help with?",
    assistant: "Let's be honest, 90% of backend engineering is just fighting with Maven dependencies and googling 'why isn't my Spring Bean autowiring'. {{pause}} But for that other 10%, Nelson actually knows what he's doing! \n\nFrom modernizing legacy monoliths into scalable cloud backends, to engineering AI contexts, here is the actual toolkit he uses to make the magic happen:",
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
    user: "What is he reading or listening to?",
    assistant: "Nelson is a big believer in continuous input. Here are the books currently on his nightstand and the tracks keeping him in the flow state:",
    richContentType: "currentMedia",
  },
  {
    user: "How does he approach engineering?",
    assistant: "Pretty seriously, actually — which is surprising for someone who named his AI model after a Naruto technique. 😏\n\nHis core philosophy is simple: **What we code now, echoes into maintainability and every future release.**\n\nHe operates on three main principles that shape how he builds and leads:\n\n📋 Oh, I also have a user manual for working with him — ask me about it!",
    richContentType: "philosophy",
  },
  {
    user: "Show me the user manual!",
    assistant: "Glad you asked! Think of this as a README.md — but for a human. Here's how to get the best out of working with Nelson:",
    richContentType: "userManual",
  },
  {
    user: "Any fun facts? How do I connect with him?",
    assistant: "Oh, where do I start... {{pause}} Actually, let me keep it to the highlights. Here are some things you might not guess:",
    richContentType: "funFacts",
  },
];