'use client'

import { motion } from 'framer-motion'
import { experience, education } from '@/data/experience'

const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const typeColors: Record<string, string> = {
  'full-time': 'text-green-400 border-green-400/40',
  contract: 'text-yellow-400 border-yellow-400/40',
  internship: 'text-blue-400 border-blue-400/40',
}

export default function ExperienceView() {
  return (
    <motion.div
      key="experience"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="h-full overflow-y-auto px-6 py-6 scrollbar-thin"
    >
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto space-y-8">

        {/* Experience */}
        <div>
          <motion.h1 variants={item} className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-border)] pb-1 mb-6">
            // work experience
          </motion.h1>

          <div className="relative">
            <div className="absolute left-4 top-2 bottom-0 w-px bg-[var(--color-border)]" />
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <motion.div key={i} variants={item} className="pl-10 relative">
                  <div
                    className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-[var(--color-accent)]"
                    style={{ backgroundColor: 'var(--color-bg)' }}
                  />
                  <div
                    className="p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-colors"
                    style={{ backgroundColor: 'var(--color-bg-terminal)' }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <h2 className="font-mono font-bold text-sm text-[var(--color-text)]">{exp.role}</h2>
                        <p className="font-mono text-xs text-[var(--color-accent)]">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${typeColors[exp.type]}`}>
                          {exp.type}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--color-text-muted)]">{exp.period}</span>
                      </div>
                    </div>
                    <p className="font-mono text-xs text-[var(--color-text-muted)] leading-relaxed mt-2 mb-3">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span key={t} className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-text-muted)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <motion.h2 variants={item} className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-border)] pb-1 mb-6">
            // education
          </motion.h2>

          <div className="relative">
            <div className="absolute left-4 top-2 bottom-0 w-px bg-[var(--color-border)]" />
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div key={i} variants={item} className="pl-10 relative">
                  <div
                    className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-[var(--color-text-muted)]"
                    style={{ backgroundColor: 'var(--color-bg)' }}
                  />
                  <div
                    className="p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-colors"
                    style={{ backgroundColor: 'var(--color-bg-terminal)' }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-mono font-bold text-sm text-[var(--color-text)]">{edu.institution}</h3>
                        <p className="font-mono text-xs text-[var(--color-accent)]">{edu.degree}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-mono text-[10px] text-[var(--color-text-muted)]">{edu.period}</p>
                        <p className="font-mono text-[10px] text-green-400">{edu.grade}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}
