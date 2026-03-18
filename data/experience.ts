export interface Experience {
  company: string
  role: string
  period: string
  description: string
  tech: string[]
  type: 'full-time' | 'contract' | 'internship'
}

export const experience: Experience[] = [
  {
    company: 'Axiom Systems',
    role: 'Senior Full-Stack Engineer',
    period: 'Jan 2023 — Present',
    description:
      'Led the frontend rewrite of a legacy analytics dashboard serving 200K+ monthly active users. Reduced load time by 60% by migrating to React Server Components and implementing edge caching. Designed and shipped a real-time alerting system processing 5M+ events/day.',
    tech: ['Next.js', 'TypeScript', 'Go', 'Kafka', 'Redis', 'PostgreSQL', 'Kubernetes'],
    type: 'full-time',
  },
  {
    company: 'Freelance',
    role: 'Contract Full-Stack Developer',
    period: 'Jun 2022 — Dec 2022',
    description:
      'Built and delivered 4 production web applications for startups across fintech and edtech verticals. Responsible for full lifecycle: architecture, development, deployment, and handoff documentation.',
    tech: ['React', 'Node.js', 'Stripe', 'Supabase', 'Vercel'],
    type: 'contract',
  },
  {
    company: 'Devstack Labs',
    role: 'Software Engineer',
    period: 'Aug 2020 — May 2022',
    description:
      'Core team member for a developer tooling startup. Built the CLI toolchain and IDE extension (VS Code) downloaded 50K+ times. Implemented the plugin registry system and wrote the documentation site from scratch.',
    tech: ['TypeScript', 'Node.js', 'VS Code API', 'Electron', 'SQLite'],
    type: 'full-time',
  },
  {
    company: 'TechBridge India',
    role: 'Software Intern',
    period: 'May 2019 — Jul 2019',
    description:
      'Worked on internal automation tools. Built a Slack bot that automated sprint reporting, saving 3 hours per week of manual work. Fixed 20+ bugs in a React Native mobile app.',
    tech: ['Python', 'Slack API', 'React Native', 'JavaScript'],
    type: 'internship',
  },
]
