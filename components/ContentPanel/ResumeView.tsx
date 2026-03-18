'use client'

import { motion } from 'framer-motion'
import { about } from '@/data/about'
import { experience } from '@/data/experience'
import { skills } from '@/data/skills'

export default function ResumeView() {
  return (
    <motion.div
      key="resume"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="h-full overflow-y-auto px-6 py-6 scrollbar-thin"
    >
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-border)] pb-1 flex-1">
            // resume
          </h1>
          <a
            href="/resume.pdf"
            download
            className="font-mono text-xs ml-4 px-3 py-1 rounded border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors shrink-0"
          >
            ↓ download PDF
          </a>
        </div>

        {/* Header */}
        <div
          className="p-4 rounded-lg border border-[var(--color-border)]"
          style={{ backgroundColor: 'var(--color-bg-terminal)' }}
        >
          <h2 className="font-mono font-bold text-lg text-[var(--color-text)]">{about.name}</h2>
          <p className="font-mono text-sm text-[var(--color-accent)]">{about.title}</p>
          <p className="font-mono text-xs text-[var(--color-text-muted)] mt-1">
            {about.location} · {about.email}
          </p>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <h3 className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
            summary
          </h3>
          <p className="font-mono text-xs text-[var(--color-text)] leading-relaxed">
            {about.bio[0]}
          </p>
        </div>

        {/* Experience (condensed) */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
            experience
          </h3>
          {experience.map((exp, i) => (
            <div key={i} className="font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--color-text)] font-bold">{exp.role}</span>
                <span className="text-[var(--color-text-muted)]">{exp.period}</span>
              </div>
              <span className="text-[var(--color-accent)]">{exp.company}</span>
            </div>
          ))}
        </div>

        {/* Skills summary */}
        <div className="space-y-2">
          <h3 className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
            skills
          </h3>
          {skills.map((cat) => (
            <div key={cat.category} className="font-mono text-xs">
              <span className="text-[var(--color-accent)]">{cat.category}: </span>
              <span className="text-[var(--color-text-muted)]">
                {cat.items.map((s) => s.name).join(', ')}
              </span>
            </div>
          ))}
        </div>

        <p className="font-mono text-[10px] text-[var(--color-text-muted)] italic">
          Download the PDF for the full formatted resume.
        </p>
      </div>
    </motion.div>
  )
}
