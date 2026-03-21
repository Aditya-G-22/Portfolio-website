'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/data/projects'

type Category = 'cs' | 'design'

const panels = [
  {
    id: 'cs' as Category,
    label: 'cs/dev',
    icon: '</>',
    bg: '/dev-bg.png.png',
    accent: '#a78bfa',
    description: 'code · ml · full-stack',
  },
  {
    id: 'design' as Category,
    label: 'design',
    icon: '✦',
    bg: '/design-bg.png.jpg',
    accent: '#fb923c',
    description: 'ui/ux · graphics · visuals',
  },
]

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const listItem = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1,  y: 0  },
}

export default function ProjectsView() {
  const [selected, setSelected] = useState<Category | null>(null)

  const filtered = selected ? projects.filter((p) => p.category === selected) : []
  const panel    = panels.find((p) => p.id === selected)

  return (
    <motion.div
      key="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="h-full flex flex-col overflow-hidden"
    >
      <AnimatePresence mode="wait">

        {/* ── LANDING: two panels ── */}
        {selected === null && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex overflow-hidden"
          >
            {panels.map((panel) => (
              <motion.button
                key={panel.id}
                onClick={() => setSelected(panel.id)}
                className="relative flex-1 flex items-center justify-center overflow-hidden group border-0 outline-none"
                style={{ cursor: 'pointer' }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background image — blurry + faded by default, sharp on hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
                  style={{
                    backgroundImage: `url(${panel.bg})`,
                    filter: 'blur(6px) brightness(0.25)',
                  }}
                />
                {/* Hover layer — unblur */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                  style={{
                    backgroundImage: `url(${panel.bg})`,
                    filter: 'blur(0px) brightness(0.55)',
                  }}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />

                {/* Divider line between panels */}
                {panel.id === 'cs' && (
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10 z-10" />
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3 select-none">
                  <span
                    className="font-mono text-4xl font-bold opacity-40 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ color: panel.accent }}
                  >
                    {panel.icon}
                  </span>

                  <h2
                    className="font-mono font-bold uppercase tracking-[0.2em] text-white text-xl group-hover:tracking-[0.3em] transition-all duration-500"
                  >
                    {panel.label}
                  </h2>

                  <p
                    className="font-mono text-[11px] tracking-widest opacity-0 group-hover:opacity-70 transition-opacity duration-500 -translate-y-1 group-hover:translate-y-0"
                    style={{ color: panel.accent, transitionProperty: 'opacity, transform' }}
                  >
                    {panel.description}
                  </p>

                  <span
                    className="font-mono text-[10px] text-white/40 group-hover:text-white/80 transition-colors duration-500 mt-2 border border-white/20 group-hover:border-white/50 px-3 py-1 rounded"
                  >
                    click to explore →
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* ── PROJECT LIST ── */}
        {selected !== null && (
          <motion.div
            key={`list-${selected}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0  }}
            exit={{ opacity: 0, x: -20   }}
            transition={{ duration: 0.3  }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="shrink-0 px-6 pt-5 pb-0">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => setSelected(null)}
                  className="font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  ← back
                </button>
                <span className="text-[var(--color-text-muted)] text-xs">/</span>
                <p className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest">
                  {panel?.icon} {panel?.label} ({filtered.length})
                </p>
              </div>
              <div className="border-b border-[var(--color-border)]" />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  variants={listContainer}
                  initial="hidden"
                  animate="show"
                  className="max-w-2xl mx-auto space-y-4"
                >
                  {filtered.length === 0 ? (
                    <motion.div variants={listItem} className="text-center py-20">
                      <p className="font-mono text-4xl mb-4">🚧</p>
                      <p className="font-mono text-sm text-[var(--color-text-muted)]">
                        No {selected === 'design' ? 'design' : 'CS / dev'} projects yet.
                      </p>
                      <p className="font-mono text-xs text-[var(--color-text-muted)] mt-1 opacity-50">
                        Coming soon...
                      </p>
                    </motion.div>
                  ) : (
                    filtered.map((project) => (
                      <motion.div
                        key={project.title}
                        variants={listItem}
                        className="p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors duration-200 group"
                        style={{ backgroundColor: 'var(--color-bg-terminal)' }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
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
                              <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="font-mono text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                                [github]
                              </a>
                            )}
                            {project.live && (
                              <a href={project.live} target="_blank" rel="noopener noreferrer"
                                className="font-mono text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
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
                            <span key={t}
                              className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-text-muted)]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  )
}
