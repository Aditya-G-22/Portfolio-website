'use client'

import { motion } from 'framer-motion'
import { about } from '@/data/about'
import { socials } from '@/data/socials'

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function ContactView() {
  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="h-full overflow-y-auto px-6 py-6 scrollbar-thin"
    >
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-lg mx-auto space-y-6">
        <motion.h1 variants={item} className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-border)] pb-1">
          // contact
        </motion.h1>

        {/* Contact card */}
        <motion.div
          variants={item}
          className="p-5 rounded-lg border border-[var(--color-border)]"
          style={{ backgroundColor: 'var(--color-bg-terminal)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">👋</div>
            <div>
              <p className="font-mono font-bold text-sm text-[var(--color-text)]">
                Let&apos;s work together
              </p>
              <p className="font-mono text-xs text-[var(--color-text-muted)]">
                {about.availability}
              </p>
            </div>
          </div>

          <div className="space-y-2 font-mono text-sm">
            <div className="flex gap-2">
              <span className="text-[var(--color-text-muted)]">Email:</span>
              <a href={`mailto:${about.email}`} className="text-[var(--color-accent)] hover:underline">
                {about.email}
              </a>
            </div>
            <div className="flex gap-2">
              <span className="text-[var(--color-text-muted)]">Phone:</span>
              <a href={`tel:${about.phone}`} className="text-[var(--color-accent)] hover:underline">
                {about.phone}
              </a>
            </div>
            <div className="flex gap-2">
              <span className="text-[var(--color-text-muted)]">Location:</span>
              <span className="text-[var(--color-text)]">{about.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} className="space-y-2">
          <h2 className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
            // socials
          </h2>
          <div className="space-y-2">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group"
                style={{ backgroundColor: 'var(--color-bg-terminal)' }}
              >
                <span className="text-[var(--color-accent)] font-mono">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-xs text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    {s.platform}
                  </span>
                  <span className="font-mono text-xs text-[var(--color-text-muted)] ml-2">
                    {s.handle}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--color-text-muted)]">↗</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Message hint */}
        <motion.div
          variants={item}
          className="p-4 rounded-lg border border-[var(--color-accent)]/30"
          style={{ backgroundColor: 'var(--color-bg-terminal)' }}
        >
          <p className="font-mono text-xs text-[var(--color-text-muted)]">
            Send a message via the terminal:
          </p>
          <p className="font-mono text-xs text-[var(--color-accent)] mt-1 break-all">
            {`$ message --name "Name" --email "you@mail.com" --body "Hi!"`}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
