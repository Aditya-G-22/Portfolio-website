'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data/projects'

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

export default function ProjectsView() {
  return (
    <motion.div
      key="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="h-full overflow-y-auto px-6 py-6 scrollbar-thin"
    >
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto space-y-4">
        <motion.h1 variants={item} className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-border)] pb-1">
          // projects ({projects.length})
        </motion.h1>

        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={item}
            className="p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors duration-200 group"
            style={{ backgroundColor: 'var(--color-bg-terminal)' }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {project.featured && (
                  <span className="text-[10px] font-mono text-yellow-400 border border-yellow-400/40 px-1 rounded">
                    ★ featured
                  </span>
                )}
                <h2 className="font-mono font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {project.title}
                </h2>
              </div>
              <div className="flex gap-2 shrink-0">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    [github]
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    [live]
                  </a>
                )}
              </div>
            </div>

            <p className="font-mono text-xs text-[var(--color-text-muted)] leading-relaxed mb-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-text-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
