export interface Project {
  title: string
  description: string
  tech: string[]
  github?: string
  live?: string
  image?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'TerminalOS Portfolio',
    description:
      'This very site — a terminal-driven portfolio where visitors interact through a CLI interface. Built with Next.js 14, Zustand, Framer Motion, and Supabase.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Zustand', 'Framer Motion', 'Supabase'],
    github: 'https://github.com/aditya/terminal-portfolio',
    live: 'https://aditya.dev',
    featured: true,
  },
  {
    title: 'QueryForge',
    description:
      'AI-powered SQL query builder with natural language input, schema introspection, and query optimization suggestions. Supports PostgreSQL and MySQL.',
    tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'OpenAI', 'PostgreSQL'],
    github: 'https://github.com/aditya/queryforge',
    featured: true,
  },
  {
    title: 'Syncwave',
    description:
      'Real-time collaborative document editor built with CRDTs (Conflict-free Replicated Data Types) for conflict-free merging without operational transforms.',
    tech: ['React', 'Rust', 'WebAssembly', 'WebSockets', 'Redis'],
    github: 'https://github.com/aditya/syncwave',
    live: 'https://syncwave.app',
    featured: true,
  },
  {
    title: 'Logpulse',
    description:
      'Lightweight structured log aggregator with real-time streaming, regex filtering, and alerting. Deployed as a single binary — no external dependencies.',
    tech: ['Go', 'ClickHouse', 'React', 'WebSockets', 'Docker'],
    github: 'https://github.com/aditya/logpulse',
  },
  {
    title: 'Parcely',
    description:
      'CLI package manager for internal monorepos. Handles dependency hoisting, workspace linking, and incremental builds across hundreds of packages.',
    tech: ['Node.js', 'TypeScript', 'esbuild', 'PNPM Workspaces'],
    github: 'https://github.com/aditya/parcely',
  },
  {
    title: 'Vaultkey',
    description:
      'Zero-knowledge password manager with end-to-end encryption. Passwords never leave the client unencrypted. Browser extension + mobile app.',
    tech: ['React Native', 'TypeScript', 'Web Crypto API', 'Supabase', 'Argon2'],
    github: 'https://github.com/aditya/vaultkey',
    live: 'https://vaultkey.io',
  },
]
