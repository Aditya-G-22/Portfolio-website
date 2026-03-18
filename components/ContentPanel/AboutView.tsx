'use client'

import { motion } from 'framer-motion'
import { about } from '@/data/about'

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function AboutView() {
  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="h-full overflow-y-auto px-6 py-6 scrollbar-thin"
    >
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-full border-2 border-[var(--color-accent)] flex items-center justify-center shrink-0 text-2xl"
            style={{ backgroundColor: 'var(--color-bg-terminal)' }}
          >
            👨‍💻
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text)] font-mono">{about.name}</h1>
            <p className="text-[var(--color-accent)] font-mono text-sm">{about.title}</p>
            <p className="text-[var(--color-text-muted)] font-mono text-xs mt-0.5">
              📍 {about.location} · {about.availability}
            </p>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div variants={item} className="space-y-2">
          <h2 className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-border)] pb-1">
            // bio
          </h2>
          {about.bio.map((p, i) => (
            <p key={i} className="font-mono text-sm text-[var(--color-text)] leading-relaxed">
              {p}
            </p>
          ))}
        </motion.div>

        {/* Skills summary */}
        <motion.div variants={item} className="space-y-2">
          <h2 className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-border)] pb-1">
            // core stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {about.skills_summary.map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs px-2 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-accent)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Contact hint */}
        <motion.div variants={item}>
          <p className="font-mono text-xs text-[var(--color-text-muted)]">
            Want to get in touch?{' '}
            <span className="text-[var(--color-accent)]">
              Run: message --name &quot;Name&quot; --email &quot;you@mail.com&quot; --body &quot;Hi!&quot;
            </span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
