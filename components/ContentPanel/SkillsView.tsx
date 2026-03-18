'use client'

import { motion } from 'framer-motion'
import { skills } from '@/data/skills'

const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-0.5">
      <div className="flex justify-between font-mono text-xs">
        <span className="text-[var(--color-text)]">{name}</span>
        <span className="text-[var(--color-text-muted)]">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[var(--color-accent)]"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  )
}

export default function SkillsView() {
  return (
    <motion.div
      key="skills"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="h-full overflow-y-auto px-6 py-6 scrollbar-thin"
    >
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto space-y-6">
        <motion.h1 variants={item} className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-border)] pb-1">
          // skills & proficiency
        </motion.h1>

        <div className="grid sm:grid-cols-2 gap-6">
          {skills.map((category) => (
            <motion.div key={category.category} variants={item} className="space-y-3">
              <h2 className="font-mono text-sm font-bold text-[var(--color-accent)]">
                <span className="mr-2">{category.icon}</span>
                {category.category}
              </h2>
              <div className="space-y-2.5">
                {category.items.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
