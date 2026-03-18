export interface Skill {
  name: string
  level: number // 0-100
}

export interface SkillCategory {
  category: string
  icon: string
  items: Skill[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: '◈',
    items: [
      { name: 'TypeScript', level: 95 },
      { name: 'React / Next.js', level: 93 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 80 },
      { name: 'WebAssembly', level: 60 },
    ],
  },
  {
    category: 'Backend',
    icon: '◉',
    items: [
      { name: 'Node.js', level: 92 },
      { name: 'Go', level: 78 },
      { name: 'Python / FastAPI', level: 75 },
      { name: 'Rust', level: 55 },
      { name: 'GraphQL', level: 70 },
    ],
  },
  {
    category: 'Database & Storage',
    icon: '◎',
    items: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'Redis', level: 82 },
      { name: 'ClickHouse', level: 65 },
      { name: 'MongoDB', level: 70 },
      { name: 'Prisma / Drizzle', level: 85 },
    ],
  },
  {
    category: 'Infrastructure',
    icon: '◐',
    items: [
      { name: 'Docker / Compose', level: 85 },
      { name: 'Kubernetes', level: 68 },
      { name: 'AWS / GCP', level: 72 },
      { name: 'Vercel / Railway', level: 90 },
      { name: 'CI/CD (GH Actions)', level: 80 },
    ],
  },
]
